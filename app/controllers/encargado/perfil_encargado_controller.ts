import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import PuntoReciclaje from '#models/punto_reciclaje'

export default class PerfilEncargadoController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
      .preload('puntoACargo')
      .firstOrFail()

    if (!usuario.puntoACargo && usuario.idAliado) {
      const punto = await PuntoReciclaje.query()
        .where('id_aliado', usuario.idAliado)
        .whereNull('id_encargado')
        .first()
      if (punto) {
        punto.idEncargado = usuario.idUsuario
        await punto.save()
        await usuario.load('puntoACargo')
      }
    }

    return response.ok({
      usuario:{
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
        fechaRegistro: usuario.fechaRegistro,
        rol: usuario.rol.nombre,
        estado: usuario.estadoUsuario.nombre,
        idAliado: usuario.idAliado,
        aliado: usuario.aliado?.nombre ?? null,
        puntoACargo: usuario.puntoACargo ? {
          idPunto: usuario.puntoACargo.idPunto,
          nombre: usuario.puntoACargo.nombre,
        } : null,
      } 
    })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)
    const datos = request.only(['nombre', 'apellido', 'telefono', 'imagen'])
    usuario.merge(datos)
    await usuario.save()

    return response.ok({
      mensaje: 'Perfil actualizado correctamente',
       usuario:{
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
       } })
  }
}
