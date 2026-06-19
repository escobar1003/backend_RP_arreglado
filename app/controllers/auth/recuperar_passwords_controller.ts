import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Usuario from '#models/usuario'

import {
  solicitarCodigoValidator,
  verificarCodigoValidator,
  restablecerPasswordValidator,
} from '#validators/auth/recuperar_password'

const RESEND_API_KEY = 're_15gys8WR_Kfgtg4yY5UeVmnXFmQWkdwYh'

export default class RecuperarPasswordsController {
  async solicitarCodigo({ request, response }: HttpContext) {
    const { correo } = await request.validateUsing(solicitarCodigoValidator)

    const usuario = await Usuario.findBy('correo', correo)

    if (!usuario) {
      return response.ok({
        mensaje: 'Si el correo existe, recibirás un código de recuperación',
      })
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString()

    usuario.codigoRecuperacion = codigo
    usuario.codigoExpiracion = DateTime.now().plus({ minutes: 15 })
    await usuario.save()

    let emailResult = null
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: correo,
          subject: 'Recycling Points - Código de recuperación',
          html: `
            <h2>Hola ${usuario.nombre},</h2>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Tu código de recuperación es:</p>
            <h1 style="letter-spacing: 8px; color: #2e7d32;">${codigo}</h1>
            <p>Este código expira en <strong>15 minutos</strong>.</p>
            <p>Si no solicitaste esto, ignora este correo.</p>
            <br/>
            <p>Equipo Recycling Points</p>`,
        }),
      })
      emailResult = await res.json()
    } catch (error: any) {
      emailResult = { error: error.message }
    }

    return response.ok({
      mensaje: 'Si el correo existe, recibirás un código de recuperación',
      codigo,
      emailResult,
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
