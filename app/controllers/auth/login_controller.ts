import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import { loginValidator } from '#validators/auth/login'

export default class LoginController {
  async iniciarSesion({ request, response }: HttpContext) {
    const { correo, password } = await request.validateUsing(loginValidator)

    // Buscar usuario manualmente
    const usuario = await Usuario.query()
      .where('correo', correo)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
      .first()

    if (!usuario) {
      return response.unauthorized({
        mensaje: 'Credenciales inválidas',
      })
    }

    // Verificar password manualmente
    const passwordValido = await hash.verify(usuario.password, password)
    if (!passwordValido) {
      return response.unauthorized({
        mensaje: 'Credenciales inválidas',
      })
    }

    if (usuario.idEstadoUsuario !== 1) {
      return response.forbidden({
        mensaje: 'Tu cuenta está inactiva o suspendida',
      })
    }

    const token = await Usuario.accessTokens.create(usuario)

    return response.ok({
      mensaje: 'Sesión iniciada correctamente',
      token: token.value!.release(),
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
        rol: usuario.rol.nombre,
        idAliado: usuario.idAliado,
        aliadoNombre: usuario.aliado?.nombre ?? null,
      },
    })
  }

  async cerrarSesion({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await Usuario.accessTokens.delete(usuario, usuario.currentAccessToken.identifier)

    return response.ok({
      mensaje: 'Sesión cerrada correctamente',
    })
  }
}
