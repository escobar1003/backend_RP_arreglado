import type { HttpContext } from '@adonisjs/core/http'
import EstadoEncargado from '#models/estado_encargado'

export default class EstadosEncargadosController {
  async index({ response }: HttpContext) {
    const estados = await EstadoEncargado.all()
    return response.ok({ estados })
  }

  async show({ params, response }: HttpContext) {
    const estado = await EstadoEncargado.findOrFail(params.id)
    return response.ok({ estado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre'])
    const nombreExiste = await EstadoEncargado.findBy('nombre', datos.nombre)
    if (nombreExiste) {
      return response.conflict({ mensaje: 'Ya existe un estado con ese nombre' })
    }
    const estado = await EstadoEncargado.create({ nombre: datos.nombre })
    return response.created({ mensaje: 'Estado creado correctamente', estado })
  }

  async update({ params, request, response }: HttpContext) {
    const estado = await EstadoEncargado.findOrFail(params.id)
    const datos = request.only(['nombre'])
    estado.merge(datos)
    await estado.save()
    return response.ok({ mensaje: 'Estado actualizado correctamente', estado })
  }

  async destroy({ params, response }: HttpContext) {
    const estado = await EstadoEncargado.findOrFail(params.id)
    await estado.delete()
    return response.ok({ mensaje: 'Estado eliminado correctamente' })
  }
}
