import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class PerfilAdminController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()

    return response.ok({
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
        fechaRegistro: usuario.fechaRegistro,
        rol: usuario.rol.nombre,
        estado: usuario.estadoUsuario.nombre,
      },
    })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)
    const datos = request.only(['nombre', 'apellido', 'telefono', 'imagen'])
    usuario.merge(datos)
    await usuario.save()

    return response.ok({
      mensaje: 'Perfil actualizado correctamente',
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
      },
    })
  }
}
