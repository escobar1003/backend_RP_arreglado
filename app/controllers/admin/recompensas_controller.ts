import type { HttpContext } from '@adonisjs/core/http'
import Recompensa from '#models/recompensa'
import {
  crearRecompensaValidator,
  actualizarRecompensaValidator,
} from '#validators/admin/recompensa'

export default class RecompensasController {
  async index({ response }: HttpContext) {
    const recompensas = await Recompensa.query()
      .preload('tipoRecompensa')
      .preload('estadoRecompensa')
      .preload('aliado')
      .preload('detalle')
    return response.ok({ recompensas })
  }

  async show({ params, response }: HttpContext) {
    const recompensa = await Recompensa.query()
      .where('id_recompensa', params.id)
      .preload('tipoRecompensa')
      .preload('estadoRecompensa')
      .preload('aliado')
      .preload('detalle')
      .preload('materiales')
      .firstOrFail()
    return response.ok({ recompensa })
  }

  async store({ request, response }: HttpContext) {
    const datos = await request.validateUsing(crearRecompensaValidator)
    const recompensa = await Recompensa.create({ ...datos, idEstadoRecompensa: 1 })
    return response.created({ mensaje: 'Recompensa creada correctamente', recompensa })
  }

  async update({ params, request, response }: HttpContext) {
    const recompensa = await Recompensa.findOrFail(params.id)
    const datos = await request.validateUsing(actualizarRecompensaValidator)
    recompensa.merge(datos)
    await recompensa.save()
    return response.ok({ mensaje: 'Recompensa actualizada correctamente', recompensa })
  }

  async destroy({ params, response }: HttpContext) {
    const recompensa = await Recompensa.findOrFail(params.id)
    await recompensa.delete()
    return response.ok({ mensaje: 'Recompensa eliminada correctamente' })
  }
}
