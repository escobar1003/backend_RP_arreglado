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

    let query = Usuario.query().where('id_rol', 3)
    if (q) {
      query = query.where((sub) => {
        sub
          .where('nombre', 'LIKE', `%${q}%`)
          .orWhere('correo', 'LIKE', `%${q}%`)
          .orWhere('cedula', 'LIKE', `%${q}%`)
      })
    }
    const usuarios = await query.limit(50)

    const ahora = DateTime.now()
    const result = await Promise.all(
      usuarios.map(async (u) => {
        const movimientos = await MovimientoPunto.query().where('id_usuario', u.idUsuario)
        const ganados = movimientos
          .filter(m => m.tipoMovimiento === 'ganados' && (!m.fechaCaducidad || m.fechaCaducidad > ahora))
          .reduce((s, m) => s + m.puntos, 0)
        const descontados = movimientos
          .filter(m => m.tipoMovimiento === 'descontados')
          .reduce((s, m) => s + m.puntos, 0)
        const ajuste = movimientos
          .filter(m => m.tipoMovimiento === 'ajuste' && (!m.fechaCaducidad || m.fechaCaducidad > ahora))
          .reduce((s, m) => s + m.puntos, 0)
        return {
          idUsuario: u.idUsuario,
          nombre: u.nombre,
          correo: u.correo,
          cedula: u.cedula,
          puntosDisponibles: ganados - descontados + ajuste,
        }
      })
    )

    return response.ok({ usuarios: result })
  }
}
