import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { DateTime } from 'luxon'

export default class RegistrosController {
  async registrarse({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'correo', 'password', 'telefono'])

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      return response.conflict({
        mensaje: 'Ya existe una cuenta con ese correo',
      })
    }

    const usuario = await Usuario.create({
      idRol: 3, // rol: usuario
      idEstadoUsuario: 1, // estado: activo
      nombre: datos.nombre,
      correo: datos.correo,
      password: datos.password,
      telefono: datos.telefono ?? null,
      fechaRegistro: DateTime.now(),
    })

    await usuario.load('rol')

    const token = await Usuario.accessTokens.create(usuario)

    return response.created({
      mensaje: 'Cuenta creada correctamente',
      token: token.value!.release(),
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        rol: usuario.rol.nombre,
      },
    })
  }
}
