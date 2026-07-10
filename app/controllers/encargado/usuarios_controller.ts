import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import MovimientoPunto from '#models/movimiento_punto'
import { DateTime } from 'luxon'

export default class UsuariosController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!
    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const q = (request.qs().q || '').trim()

    const ahora = DateTime.now()
    let query = Usuario.query().where('id_rol', 3)
    if (q) {
      query = query.whereRaw('(nombre LIKE ? OR correo LIKE ? OR cedula LIKE ?)', [`%${q}%`, `%${q}%`, `%${q}%`])
    }
    const usuarios = await query.limit(20)

    const ids = usuarios.map((u) => u.idUsuario)
    const todosMovimientos = ids.length
      ? await MovimientoPunto.query().whereIn('id_usuario', ids)
      : []

    const ptsPorUsuario = new Map()
    for (const m of todosMovimientos) {
      if (!ptsPorUsuario.has(m.idUsuario)) {
        ptsPorUsuario.set(m.idUsuario, { ganados: 0, descontados: 0, ajuste: 0 })
      }
      const acc = ptsPorUsuario.get(m.idUsuario)
      if (m.tipoMovimiento === 'ganados' && (!m.fechaCaducidad || m.fechaCaducidad > ahora)) {
        acc.ganados += m.puntos
      } else if (m.tipoMovimiento === 'descontados') {
        acc.descontados += m.puntos
      } else if (m.tipoMovimiento === 'ajuste' && (!m.fechaCaducidad || m.fechaCaducidad > ahora)) {
        acc.ajuste += m.puntos
      }
    }

    const result = usuarios.map((u) => {
      const p = ptsPorUsuario.get(u.idUsuario) || { ganados: 0, descontados: 0, ajuste: 0 }
      return {
        idUsuario: u.idUsuario,
        nombre: u.nombre,
        correo: u.correo,
        cedula: u.cedula,
        puntosDisponibles: Math.max(0, p.ganados - p.descontados + p.ajuste),
      }
    })

    return response.ok({ usuarios: result })
  }
}
