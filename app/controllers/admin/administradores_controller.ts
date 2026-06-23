import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

export default class AdministradoresController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query().where('id_rol', 1).preload('rol').preload('estadoUsuario')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const admins = await query
    return response.ok({ admins })
  }

  async store({ auth, request, response }: HttpContext) {
    const datos = request.only(['nombre', 'correo', 'telefono', 'zona', 'idAliado'])
    const usuario = auth.user!
    await usuario.load('rol')

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      return response.conflict({ mensaje: 'Ya existe una cuenta con ese correo' })
    }

    const passwordTemporal = Math.random().toString(36).slice(-8) + 'A1*'

    const admin = await Usuario.create({
      idRol: 1,
      idEstadoUsuario: 1,
      nombre: datos.nombre,
      correo: datos.correo,
      password: passwordTemporal,
      telefono: datos.telefono ?? null,
      zona: datos.zona || null,
      idAliado: datos.idAliado ?? (usuario.rol.nombre === 'admin' ? usuario.idAliado : null),
      fechaRegistro: DateTime.now(),
    })

    await mail.send((message) => {
      message
        .to(datos.correo)
        .from(process.env.SMTP_USERNAME!)
        .subject('Recycling Points - Credenciales de administrador')
        .html(`
          <h2>Hola ${datos.nombre},</h2>
          <p>Has sido registrado como <strong>administrador</strong> en Recycling Points.</p>
          <p><strong>Correo:</strong> ${datos.correo}</p>
          <p><strong>Contraseña temporal:</strong> ${passwordTemporal}</p>
          <p>Te recomendamos cambiar tu contraseña después de iniciar sesión.</p>
          <br>
          <p>Saludos,<br>Equipo Recycling Points</p>
        `)
    })

    return response.created({ mensaje: 'Administrador creado correctamente. Se enviaron las credenciales al correo.', admin })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query().where('id_usuario', params.id).where('id_rol', 1)

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const admin = await query.firstOrFail()
    const datos = request.only(['nombre', 'telefono', 'imagen', 'idEstadoUsuario', 'correo', 'idAliado', 'zona'])
    admin.merge(datos)
    await admin.save()
    return response.ok({ mensaje: 'Administrador actualizado correctamente', admin })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query().where('id_usuario', params.id).where('id_rol', 1)

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const admin = await query.firstOrFail()
    await admin.delete()
    return response.ok({ mensaje: 'Administrador eliminado correctamente' })
  }
}