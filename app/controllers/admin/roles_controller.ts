import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'

export default class RolesController {
  async index({ response }: HttpContext) {
    const roles = await Role.all()
    return response.ok({ roles })
  }

  async show({ params, response }: HttpContext) {
    const rol = await Role.findOrFail(params.id)
    return response.ok({ rol })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'descripcion'])

    const nombreExiste = await Role.findBy('nombre', datos.nombre)
    if (nombreExiste) {
      return response.conflict({ mensaje: 'Ya existe un rol con ese nombre' })
    }

    const rol = await Role.create({
      nombre: datos.nombre,
      descripcion: datos.descripcion ?? null,
    })

    return response.created({ mensaje: 'Rol creado correctamente', rol })
  }

  async update({ params, request, response }: HttpContext) {
    const rol = await Role.findOrFail(params.id)

    const datos = request.only(['nombre', 'descripcion'])
    rol.merge(datos)
    await rol.save()

    return response.ok({ mensaje: 'Rol actualizado correctamente', rol })
  }

  async destroy({ params, response }: HttpContext) {
    const rol = await Role.findOrFail(params.id)
    await rol.delete()
    return response.ok({ mensaje: 'Rol eliminado correctamente' })
  }
}
