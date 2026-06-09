import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Usuario from '#models/usuario'
import mail from '@adonisjs/mail/services/main'

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

    await mail.send((message) => {
      message
        .to(correo)
        .from(process.env.SMTP_USERNAME!)
        .subject('Recycling Points - Código de recuperación')
        .html(`
          <h2>Hola ${usuario.nombre},</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Tu código de recuperación es:</p>
          <h1 style="letter-spacing: 8px; color: #2e7d32;">${codigo}</h1>
          <p>Este código expira en <strong>15 minutos</strong>.</p>
          <p>Si no solicitaste esto, ignora este correo.</p>
          <br/>
          <p>Equipo Recycling Points</p>
        `)
    })

    return response.ok({
      mensaje: 'Si el correo existe, recibirás un código de recuperación',
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
    usuario.password = nuevaPassword
    usuario.codigoRecuperacion = null
    usuario.codigoExpiracion = null
    await usuario.save()

    return response.ok({
      mensaje: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.',
    })
  }
}