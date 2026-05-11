import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'

export default class EntregasController {

  async index({ response }: HttpContext) {
    const entregas = await Entrega.query()
      .preload('usuario')
      .preload('puntoReciclaje')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .orderBy('fecha_entrega', 'desc')
    return response.ok({ entregas })
  }

  async show({ params, response }: HttpContext) {
    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .preload('usuario')
      .preload('puntoReciclaje')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()
    return response.ok({ entrega })
  }

  async actualizarEstado({ params, request, response }: HttpContext) {
    const entrega = await Entrega.findOrFail(params.id)
    const { idEstadoEntrega } = request.only(['idEstadoEntrega'])
    entrega.idEstadoEntrega = idEstadoEntrega
    await entrega.save()
    return response.ok({ mensaje: 'Estado actualizado correctamente', entrega })
  }
}