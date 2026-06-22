import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'

export default class EntregasAdminController {
  async index({ response }: HttpContext) {
    const entregas = await Entrega.query()
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', q => q.preload('material'))
      .preload('puntoReciclaje')
      .orderBy('fecha_entrega', 'desc')

    return response.ok({ total: entregas.length, entregas })
  }

  async show({ params, response }: HttpContext) {
    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', q => q.preload('material'))
      .preload('puntoReciclaje')
      .firstOrFail()

    return response.ok({ entrega })
  }

  async actualizarEstado({ params, request, response }: HttpContext) {
    const entrega = await Entrega.findOrFail(params.id)
    const { idEstadoEntrega } = request.only(['idEstadoEntrega'])
    entrega.idEstadoEntrega = idEstadoEntrega
    await entrega.save()
    return response.ok({ mensaje: 'Estado actualizado', entrega })
  }
}