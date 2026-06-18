import type { HttpContext } from '@adonisjs/core/http'
import Recompensa from '#models/recompensa'

export default class RecompensasController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    const recompensas = await Recompensa.query()
      .where((q) => {
        q.whereNull('id_aliado')
        if (usuario.idAliado) {
          q.orWhere('id_aliado', usuario.idAliado!)
        }
      })
      .preload('aliado')
      .preload('estadoRecompensa')

    const result = recompensas.map((r) => ({
      idRecompensa: r.idRecompensa,
      nombre: r.nombre,
      descripcion: r.descripcion,
      puntosRequeridos: r.puntosRequeridos,
      stock: r.stock,
      aliado: r.aliado?.nombre ?? null,
      idEstadoRecompensa: r.idEstadoRecompensa,
      fechaInicio: r.fechaInicio,
      fechaFin: r.fechaFin,
    }))

    return response.ok({ recompensas: result })
  }

  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const { nombre, descripcion, puntosRequeridos, stock } = request.only([
      'nombre',
      'descripcion',
      'puntosRequeridos',
      'stock',
    ])

    const recompensa = await Recompensa.create({
      idTipoRecompensa: 1,
      idAliado: usuario.idAliado!,
      idEstadoRecompensa: 1,
      nombre,
      descripcion: descripcion ?? null,
      puntosRequeridos,
      stock: stock ?? null,
    })

    return response.created({
      mensaje: 'Recompensa creada correctamente',
      recompensa: {
        idRecompensa: recompensa.idRecompensa,
        nombre: recompensa.nombre,
        puntosRequeridos: recompensa.puntosRequeridos,
      },
    })
  }
}
