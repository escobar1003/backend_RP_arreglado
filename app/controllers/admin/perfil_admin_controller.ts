import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class PerfilAdminController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()

    return response.ok({ usuario })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)
    const { nombre, telefono } = request.only(['nombre', 'telefono'])

    usuario.merge({ nombre, telefono })
    await usuario.save()

    return response.ok({ mensaje: 'Perfil actualizado correctamente', usuario })
  }
}