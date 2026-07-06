import type { HttpContext } from '@adonisjs/core/http'
import EstadoCanje from '#models/estado_canje'

export default class EstadosCanjesController {
  async index({ response }: HttpContext) {
    const estados = await EstadoCanje.all()
    return response.ok({ estados })
  }

  async show({ params, response }: HttpContext) {
    const estado = await EstadoCanje.findOrFail(params.id)
    return response.ok({ estado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre'])
    const nombreExiste = await EstadoCanje.findBy('nombre', datos.nombre)
    if (nombreExiste) {
      return response.conflict({ mensaje: 'Ya existe un estado con ese nombre' })
    }
    const estado = await EstadoCanje.create({ nombre: datos.nombre })
    return response.created({ mensaje: 'Estado creado correctamente', estado })
  }

  async update({ params, request, response }: HttpContext) {
    const estado = await EstadoCanje.findOrFail(params.id)
    const datos = request.only(['nombre'])
    estado.merge(datos)
    await estado.save()
    return response.ok({ mensaje: 'Estado actualizado correctamente', estado })
  }

  async destroy({ params, response }: HttpContext) {
    const estado = await EstadoCanje.findOrFail(params.id)
    await estado.delete()
    return response.ok({ mensaje: 'Estado eliminado correctamente' })
  }
}
