import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import Usuario from '#models/usuario'
import {
  solicitarCodigoValidator,
  verificarCodigoValidator,
  restablecerPasswordValidator,
} from '#validators/auth/recuperar_password'

export default class RecuperarPasswordsController {
  async solicitarCodigo({ request, response }: HttpContext) {
    const { correo } = await request.validateUsing(solicitarCodigoValidator)

    const usuario = await Usuario.findBy('correo', correo)

    // Siempre respondemos igual para no revelar si el correo existe en el sistema
    if (!usuario) {
      return response.ok({
        mensaje: 'Si el correo existe, recibirás un código de recuperación',
      })
    }

    // Generar código aleatorio de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString()

    // Guardar en BD con expiración de 15 minutos
    usuario.codigoRecuperacion = codigo
    usuario.codigoExpiracion = DateTime.now().plus({ minutes: 15 })
    await usuario.save()

    // En producción: aquí se enviaría el código por correo (SMTP / Mailgun / etc.)
    // Por ahora se retorna en la respuesta para facilitar el desarrollo y las pruebas

    return response.ok({
      mensaje: 'Código de recuperación generado correctamente',
      codigo, // ⚠️ QUITAR EN PRODUCCIÓN — solo para desarrollo/pruebas
      expiracion: usuario.codigoExpiracion,
    })
  }

  async verificarCodigo({ request, response }: HttpContext) {
    const { correo, codigo } = await request.validateUsing(verificarCodigoValidator)

    const usuario = await Usuario.findBy('correo', correo)

    if (!usuario || !usuario.codigoRecuperacion || !usuario.codigoExpiracion) {
      return response.badRequest({
        mensaje: 'Código inválido o no solicitado',
      })
    }

    // Verificar expiración
    if (DateTime.now() > usuario.codigoExpiracion) {
      // Limpiar código expirado
      usuario.codigoRecuperacion = null
      usuario.codigoExpiracion = null
      await usuario.save()

      return response.badRequest({
        mensaje: 'El código ha expirado. Solicita uno nuevo.',
      })
    }

    // Verificar que el código coincida
    if (usuario.codigoRecuperacion !== codigo) {
      return response.badRequest({
        mensaje: 'Código incorrecto',
      })
    }

    return response.ok({
      mensaje: 'Código verificado correctamente. Puedes establecer tu nueva contraseña.',
    })
  }

  async restablecerPassword({ request, response }: HttpContext) {
    const { correo, codigo, nuevaPassword } = await request.validateUsing(
      restablecerPasswordValidator
    )

    const usuario = await Usuario.findBy('correo', correo)

    if (!usuario || !usuario.codigoRecuperacion || !usuario.codigoExpiracion) {
      return response.badRequest({
        mensaje: 'Solicitud inválida. Solicita un nuevo código de recuperación.',
      })
    }

    // Verificar expiración
    if (DateTime.now() > usuario.codigoExpiracion) {
      usuario.codigoRecuperacion = null
      usuario.codigoExpiracion = null
      await usuario.save()

      return response.badRequest({
        mensaje: 'El código ha expirado. Solicita uno nuevo.',
      })
    }

    // Verificar que el código coincida
    if (usuario.codigoRecuperacion !== codigo) {
      return response.badRequest({
        mensaje: 'Código incorrecto',
      })
    }

    // Todo correcto — hashear y guardar la nueva contraseña, limpiar el código
    usuario.password = await hash.make(nuevaPassword)
    usuario.codigoRecuperacion = null
    usuario.codigoExpiracion = null
    await usuario.save()

    return response.ok({
      mensaje: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.',
    })
  }
}