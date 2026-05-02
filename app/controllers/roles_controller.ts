import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'

export default class RolesController {

  async index() {
    return {
      success: true,
      data: await Role.all()
    }
  }

  async store({ request }: HttpContext) {
    const role = await Role.create(request.only(['nombre']))
    return { success: true, data: role }
  }

  async update({ params, request }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    role.merge(request.only(['nombre', 'activo']))
    await role.save()

    return { success: true }
  }

  async destroy({ params }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return { success: true }
  }
}