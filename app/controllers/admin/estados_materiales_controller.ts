import type { HttpContext } from '@adonisjs/core/http'
import EstadoMaterial from '#models/estado_material'

export default class EstadosMaterialesController {
  async index({ response }: HttpContext) {
    const estados = await EstadoMaterial.all()
    return response.ok({ estados })
  }

  async show({ params, response }: HttpContext) {
    const estado = await EstadoMaterial.findOrFail(params.id)
    return response.ok({ estado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'descripcion'])

    const nombreExiste = await EstadoMaterial.findBy('nombre', datos.nombre)
    if (nombreExiste) {
      return response.conflict({ mensaje: 'Ya existe un estado con ese nombre' })
    }

    const estado = await EstadoMaterial.create({
      nombre: datos.nombre,
      descripcion: datos.descripcion ?? null,
    })
    return response.created({ mensaje: 'Estado creado correctamente', estado })
  }

  async update({ params, request, response }: HttpContext) {
    const estado = await EstadoMaterial.findOrFail(params.id)
    const datos = request.only(['nombre', 'descripcion'])
    estado.merge(datos)
    await estado.save()
    return response.ok({ mensaje: 'Estado actualizado correctamente', estado })
  }

  async destroy({ params, response }: HttpContext) {
    const estado = await EstadoMaterial.findOrFail(params.id)
    await estado.delete()
    return response.ok({ mensaje: 'Estado eliminado correctamente' })
  }
}
