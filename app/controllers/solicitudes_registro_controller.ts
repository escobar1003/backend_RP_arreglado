import type { HttpContext } from '@adonisjs/core/http'
import SolicitudRegistro from '#models/solicitud_registro'
import Usuario from '#models/usuario'
import Aliado from '#models/aliado'
import hash from '@adonisjs/core/services/hash'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

export default class SolicitudesRegistroController {
  async solicitar({ request, response }: HttpContext) {
    const datos = request.only([
      'nombre',
      'correo',
      'telefono',
      'password',
      'idAliado',
      'rolSolicitado',
      'mensaje',
    ])

    if (!['admin', 'encargado'].includes(datos.rolSolicitado)) {
      return response.badRequest({ mensaje: 'Rol solicitado no válido' })
    }

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      return response.conflict({ mensaje: 'Ya existe un usuario con ese correo' })
    }

    const pendiente = await SolicitudRegistro.query()
      .where('correo', datos.correo)
      .where('estado', 'pendiente')
      .first()
    if (pendiente) {
      return response.conflict({ mensaje: 'Ya tienes una solicitud pendiente con este correo' })
    }

    const passwordHash = await hash.make(datos.password)

    const solicitud = await SolicitudRegistro.create({
      nombre: datos.nombre,
      correo: datos.correo,
      passwordHash,
      telefono: datos.telefono ?? null,
      idAliado: datos.idAliado || null,
      rolSolicitado: datos.rolSolicitado,
      mensaje: datos.mensaje ?? null,
      estado: 'pendiente',
    })

    if (datos.idAliado) {
      await solicitud.load('aliado')
    }

    const aliadoNombre = solicitud.aliado?.nombre ?? 'No especificado'

    await mail.send((message) => {
      message
        .to('recyclingpointss@gmail.com')
        .from(process.env.SMTP_USERNAME!)
        .subject(`Nueva solicitud de registro: ${datos.rolSolicitado} - ${datos.nombre}`)
        .html(`
          <h2>Nueva solicitud de registro</h2>
          <p><strong>Nombre:</strong> ${datos.nombre}</p>
          <p><strong>Correo:</strong> ${datos.correo}</p>
          <p><strong>Teléfono:</strong> ${datos.telefono || 'No especificado'}</p>
          <p><strong>Rol solicitado:</strong> ${datos.rolSolicitado}</p>
          <p><strong>Supermercado:</strong> ${aliadoNombre}</p>
          <p><strong>Mensaje:</strong> ${datos.mensaje || 'Ninguno'}</p>
          <br/>
          <p>Ingresa al panel de superadmin para revisar y aprobar/rechazar esta solicitud.</p>
          <br/>
          <p>Saludos,<br>Sistema Recycling Points</p>
        `)
    }).catch(err => console.error('Error al enviar correo de solicitud:', err))

    return response.created({
      mensaje: 'Solicitud enviada correctamente. Recibirás una respuesta al correo una vez sea revisada.',
    })
  }

  async listar({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    if (usuario.rol.nombre !== 'superadmin') {
      return response.forbidden({ mensaje: 'Solo el superadmin puede ver las solicitudes' })
    }

    const solicitudes = await SolicitudRegistro.query()
      .preload('aliado')
      .orderBy('createdAt', 'desc')

    return response.ok({ solicitudes })
  }

  async aprobar({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    if (usuario.rol.nombre !== 'superadmin') {
      return response.forbidden({ mensaje: 'Solo el superadmin puede aprobar solicitudes' })
    }

    const solicitud = await SolicitudRegistro.findOrFail(params.id)

    if (solicitud.estado !== 'pendiente') {
      return response.conflict({ mensaje: `Esta solicitud ya fue ${solicitud.estado}` })
    }

    const correoExiste = await Usuario.findBy('correo', solicitud.correo)
    if (correoExiste) {
      return response.conflict({ mensaje: 'Ya existe un usuario con ese correo' })
    }

    const idRol = solicitud.rolSolicitado === 'admin' ? 1 : 4

    const aliado = solicitud.idAliado ? await Aliado.find(solicitud.idAliado) : null

    const nuevoUsuario = await Usuario.create({
      idRol,
      idEstadoUsuario: 1,
      nombre: solicitud.nombre,
      correo: solicitud.correo,
      password: solicitud.passwordHash,
      telefono: solicitud.telefono ?? null,
      idAliado: solicitud.idAliado || null,
      zona: aliado?.zona || null,
      fechaRegistro: DateTime.now(),
    })

    solicitud.estado = 'aprobado'
    await solicitud.save()

    const rolLabel = solicitud.rolSolicitado === 'admin' ? 'administrador' : 'encargado'

    await mail.send((message) => {
      message
        .to(solicitud.correo)
        .from(process.env.SMTP_USERNAME!)
        .subject(`Recycling Points - Solicitud de ${rolLabel} aprobada`)
        .html(`
          <h2>¡Solicitud aprobada!</h2>
          <p>Hola ${solicitud.nombre},</p>
          <p>Tu solicitud para ser <strong>${rolLabel}</strong> ha sido <strong style="color:green">aprobada</strong>.</p>
          <p>Ya puedes iniciar sesión con tu correo y la contraseña que registraste.</p>
          <p><strong>Correo:</strong> ${solicitud.correo}</p>
          <br/>
          <p>Saludos,<br>Equipo Recycling Points</p>
        `)
    }).catch(err => console.error('Error al enviar correo de aprobación:', err))

    return response.ok({
      mensaje: `Solicitud aprobada. ${rolLabel} creado correctamente.`,
      usuario: nuevoUsuario,
    })
  }

  async rechazar({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    if (usuario.rol.nombre !== 'superadmin') {
      return response.forbidden({ mensaje: 'Solo el superadmin puede rechazar solicitudes' })
    }

    const solicitud = await SolicitudRegistro.findOrFail(params.id)

    if (solicitud.estado !== 'pendiente') {
      return response.conflict({ mensaje: `Esta solicitud ya fue ${solicitud.estado}` })
    }

    const { motivo } = request.only(['motivo'])

    solicitud.estado = 'rechazado'
    await solicitud.save()

    await mail.send((message) => {
      message
        .to(solicitud.correo)
        .from(process.env.SMTP_USERNAME!)
        .subject('Recycling Points - Solicitud de registro rechazada')
        .html(`
          <h2>Solicitud rechazada</h2>
          <p>Hola ${solicitud.nombre},</p>
          <p>Lamentamos informarte que tu solicitud para ser <strong>${solicitud.rolSolicitado}</strong> ha sido <strong style="color:red">rechazada</strong>.</p>
          ${motivo ? `<p><strong>Motivo:</strong> ${motivo}</p>` : ''}
          <br/>
          <p>Saludos,<br>Equipo Recycling Points</p>
        `)
    }).catch(err => console.error('Error al enviar correo de rechazo:', err))

    return response.ok({ mensaje: 'Solicitud rechazada correctamente' })
  }
}
