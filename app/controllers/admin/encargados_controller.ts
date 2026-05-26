import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'

export default class EncargadosController {
  async index({ response }: HttpContext) {
    const encargados = await Usuario.query()
      .where('id_rol', 2)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
    return response.ok({ encargados })
  }

  async show({ params, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 2)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
      .firstOrFail()
    return response.ok({ encargado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['correo', 'idAliado'])

    const usuario = await Usuario.findBy('correo', datos.correo)
    if (!usuario) {
      return response.notFound({ mensaje: 'No existe un usuario registrado con ese correo' })
    }

    if (usuario.idRol === 2) {
      return response.conflict({ mensaje: 'Este usuario ya es encargado' })
    }

    const passwordTemporal = Math.random().toString(36).slice(-8) + 'A1*'

    usuario.idRol = 2
    usuario.idAliado = datos.idAliado ?? null
    usuario.password = await hash.make(passwordTemporal)
    await usuario.save()

    await mail.send((message) => {
      message
        .to(datos.correo)
        .from(process.env.SMTP_USERNAME!)
        .subject('Recycling Points - Ahora eres encargado')
        .html(`
          <h2>Hola ${usuario.nombre},</h2>
          <p>Tu cuenta ha sido actualizada al rol de <strong>encargado</strong>.</p>
          <p><strong>Correo:</strong> ${datos.correo}</p>
          <p><strong>Contraseña temporal:</strong> ${passwordTemporal}</p>
          <p>Por seguridad, te recomendamos cambiar tu contraseña al iniciar sesión.</p>
          <br/>
          <p>Equipo Recycling Points</p>
        `)
    })

    return response.ok({ mensaje: 'Usuario actualizado a encargado. Se envió la contraseña al correo.', encargado: usuario })
  }

  async update({ params, request, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 2)
      .firstOrFail()

    const datos = request.only(['nombre', 'telefono', 'idEstadoUsuario', 'idAliado'])
    encargado.merge(datos)
    await encargado.save()
    return response.ok({ mensaje: 'Encargado actualizado correctamente', encargado })
  }

  async destroy({ params, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 2)
      .firstOrFail()

    await encargado.delete()
    return response.ok({ mensaje: 'Encargado eliminado correctamente' })
  }
}