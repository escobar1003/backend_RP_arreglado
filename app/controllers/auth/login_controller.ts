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
      .first()

    if (!usuario) {
      return response.unauthorized({
        mensaje: 'Credenciales inválidas',
      })
    }

    // Verificar password manualmente
    const passwordValido = await hash.verify(usuario.password, password)
    if (!passwordValido) {
      console.log('HASH LOGIN - FAILED email:', correo, 'pass provided:', password, 'hash in DB starts with:', usuario.password?.substring(0, 25))
      return response.unauthorized({
        mensaje: 'Credenciales inválidas',
      })
    }
    console.log ('HASH LOGIN - OK EMAIL:', correo)

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