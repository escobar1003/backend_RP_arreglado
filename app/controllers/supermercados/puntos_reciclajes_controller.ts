import type { HttpContext } from '@adonisjs/core/http'
import Punto from '#models/punto'

export default class PuntosReciclajesController {

  // 🔹 GET /api/puntos
  public async index({ response }: HttpContext) {
    const puntos = await Punto.all()
    return response.ok(puntos)
  }

  // 🔹 POST /api/puntos
  public async store({ request, response }: HttpContext) {

    const datos = request.only(['nombre', 'direccion'])

    if (!datos.nombre || !datos.direccion) {
      return response.badRequest({
        mensaje: 'Faltan datos obligatorios'
      })
    }

    const punto = await Punto.create({
      ...datos,
      activo: true
    })

    return response.created(punto)
  }

  // 🔹 PUT /api/puntos/:id
  public async update({ params, request, response }: HttpContext) {

    const punto = await Punto.findOrFail(params.id)

    const datos = request.only(['nombre', 'direccion'])

    punto.merge(datos)
    await punto.save()

    return response.ok(punto)
  }

  // 🔹 PATCH /api/puntos/:id/estado
  public async cambiarEstado({ params, request, response }: HttpContext) {

    const punto = await Punto.findOrFail(params.id)

    const { activo } = request.only(['activo'])

    if (activo === undefined) {
      return response.badRequest({
        mensaje: 'Debes enviar el campo activo'
      })
    }

    punto.activo = activo
    await punto.save()

    return response.ok({
      mensaje: 'Estado actualizado',
      punto
    })
  }

  // 🔹 DELETE /api/puntos/:id
  public async destroy({ params, response }: HttpContext) {

    const punto = await Punto.findOrFail(params.id)
    await punto.delete()

    return response.ok({
      success: true
    })
  }
}