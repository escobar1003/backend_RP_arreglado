import type { HttpContext } from '@adonisjs/core/http'
import TipoRecompensa from '#models/tipo_recompensa'

export default class TiposRecompensaController {
  async index({ response }: HttpContext) {
    const tipos = await TipoRecompensa.all()
    return response.ok({ tipos })
  }

  async show({ params, response }: HttpContext) {
    const tipo = await TipoRecompensa.findOrFail(params.id)
    return response.ok({ tipo })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'descripcion'])
    const nombreExiste = await TipoRecompensa.findBy('nombre', datos.nombre)
    if (nombreExiste) {
      return response.conflict({ mensaje: 'Ya existe un tipo con ese nombre' })
    }
    const tipo = await TipoRecompensa.create({
      nombre: datos.nombre,
      descripcion: datos.descripcion ?? null,
    })
    return response.created({ mensaje: 'Tipo creado correctamente', tipo })
  }

  async update({ params, request, response }: HttpContext) {
    const tipo = await TipoRecompensa.findOrFail(params.id)
    const datos = request.only(['nombre', 'descripcion'])
    tipo.merge(datos)
    await tipo.save()
    return response.ok({ mensaje: 'Tipo actualizado correctamente', tipo })
  }

  async destroy({ params, response }: HttpContext) {
    const tipo = await TipoRecompensa.findOrFail(params.id)
    await tipo.delete()
    return response.ok({ mensaje: 'Tipo eliminado correctamente' })
  }
}
