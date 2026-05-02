import Admin from '#models/admin'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminsController {

  // 🔹 GET
  async index({ response }: HttpContext) {
    const admins = await Admin.all()
    return response.ok(admins)
  }

  // 🔹 POST (ARREGLADO 🔥)
  async store({ request, response }: HttpContext) {

    const body = request.all()

    // 👇 acepta email O correo
    const nombre = body.nombre
    const email = body.email || body.correo
    const password = body.password

    if (!nombre || !email || !password) {
      return response.badRequest({
        mensaje: 'Faltan datos obligatorios',
        esperado: {
          nombre: 'string',
          email_o_correo: 'string',
          password: 'string'
        },
        recibido: body
      })
    }

    const admin = await Admin.create({
      nombre,
      email,
      password
    })

    return response.created(admin)
  }

  // 🔹 PUT
  async update({ params, request, response }: HttpContext) {

    const admin = await Admin.findOrFail(params.id)

    const body = request.all()

    const datos: any = {}

    if (body.nombre) datos.nombre = body.nombre
    if (body.email || body.correo) datos.email = body.email || body.correo

    admin.merge(datos)
    await admin.save()

    return response.ok(admin)
  }

  // 🔹 DELETE
  async destroy({ params, response }: HttpContext) {

    const admin = await Admin.findOrFail(params.id)
    await admin.delete()

    return response.ok({
      success: true
    })
  }
}