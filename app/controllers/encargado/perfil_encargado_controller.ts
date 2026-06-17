import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class PerfilEncargadoController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
      .firstOrFail()

    return response.ok({
      usuario:{
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
        fechaRegistro: usuario.fechaRegistro,
        rol: usuario.rol.nombre,
        estado: usuario.estadoUsuario.nombre,
        aliado: usuario.aliado?.nombre ?? null,
      } 
    })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)
    const { nombre, telefono } = request.only(['nombre', 'telefono'])

    usuario.merge({ nombre, telefono })
    await usuario.save()

    return response.ok({
      mensaje: 'Perfil actualizado correctamente',
       usuario:{
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
       } })
  }
}