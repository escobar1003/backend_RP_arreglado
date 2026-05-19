import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'
import Aliado from '#models/aliado'

export default class EntregasAliadoController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    const aliado = usuario.idRol === 1
      ? null
      : await Aliado.query().where('correo', usuario.correo).firstOrFail()

    // Traer todas las entregas de los puntos de este aliado
    const entregas = await Entrega.query()
      .if(aliado, (query) => {
        query.whereHas('puntoReciclaje', (q) => {
          q.where('id_aliado', aliado!.idAliado)
        })
      })
      .preload('usuario')
      .preload('puntoReciclaje')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .orderBy('fecha_entrega', 'desc')

    return response.ok({ entregas })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const aliado = usuario.idRol === 1
    ? null
    : await Aliado.query().where('correo', usuario.correo).firstOrFail()

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .if(aliado, (query) => {
        query.whereHas('puntoReciclaje', (q) => {
          q.where('id_aliado', aliado!.idAliado)
        })
      })
      .preload('usuario')
      .preload('puntoReciclaje')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()

    return response.ok({ entrega })
  }

  async actualizarEstado({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const aliado = usuario.idRol === 1
    ? null
    : await Aliado.query().where('correo', usuario.correo).firstOrFail()

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .if(aliado, (query) => {
        query.whereHas('puntoReciclaje', (q) => {
          q.where('id_aliado', aliado!.idAliado)
        })
      })
      .firstOrFail()

    const { idEstadoEntrega } = request.only(['idEstadoEntrega'])
    entrega.idEstadoEntrega = idEstadoEntrega
    await entrega.save()

    return response.ok({
      mensaje: 'Estado de entrega actualizado correctamente',
      entrega,
    })
  }
}