import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class VerificarRolMiddleware {
  async handle(ctx: HttpContext, next: NextFn, roles: string[]) {
    const usuario = ctx.auth.user

    console.log('🔐 verificar_rol — roles requeridos:', roles)
    console.log('🔐 usuario autenticado:', usuario?.idUsuario)

    if (!usuario) {
      return ctx.response.unauthorized({ mensaje: 'No autenticado' })
    }

    await usuario.load('rol')
    console.log('🔐 rol del usuario:', usuario.rol?.nombre)

    if (usuario.rol.nombre === 'admin') {
      return await next()
    }

    if (!roles.includes(usuario.rol.nombre)) {
      console.log('❌ rol no permitido')
      return ctx.response.forbidden({ mensaje: 'No tienes permiso para acceder a este recurso' })
    }

    await next()
  }
}