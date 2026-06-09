import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'
import Notificacion from '#models/notificacion'

export default class EntregasController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    // Verificar que el encargado tenga aliado asignado
    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const query = Entrega.query()
      .whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .preload('puntoReciclaje', (q) => q.preload('aliado'))
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .orderBy('fecha_entrega', 'desc')

    // Filtros por URL
    const { supermercado_id, usuario_id, encargado_id } = request.qs()

    if (supermercado_id) {
      query.whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', supermercado_id)
      })
    }

    if (usuario_id) {
      query.where('id_usuario', usuario_id)
    }

    if (encargado_id) {
      // Filtrar por entregas del punto del encargado
      query.whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
    }

    const entregas = await query

    return response.ok({
      total: entregas.length,
      entregas,
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .preload('puntoReciclaje', (q) => q.preload('aliado'))
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()

    return response.ok({ entrega })
  }

  async actualizarEstado({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .firstOrFail()

    const { idEstadoEntrega } = request.only(['idEstadoEntrega'])
    entrega.idEstadoEntrega = idEstadoEntrega
    await entrega.save()

    // Generar notificación al usuario
    await Notificacion.create({
      usuarioId: entrega.idUsuario,
      titulo: 'Estado de entrega actualizado',
      mensaje: `Tu entrega #${entrega.idEntrega} ha cambiado de estado.`,
      leida: false,
      tipo: 'entrega',
      idReferencia: entrega.idEntrega,
    })

    return response.ok({
      mensaje: 'Estado de entrega actualizado correctamente',
      entrega,
    })
  }
}

//entregas_controller.ts