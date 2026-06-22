import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import PuntoReciclaje from '#models/punto_reciclaje'

export default class EncargadosController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query()
      .where('id_rol', 4)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
      .preload('puntoACargo')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const encargados = await query
    return response.ok({ encargados })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .preload('rol')
      .preload('estadoUsuario')
      .preload('aliado')
      .preload('puntoACargo')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const encargado = await query.firstOrFail()
    return response.ok({ encargado })
  }

  async store({ auth, request, response }: HttpContext) {
    const datos = request.only(['nombre', 'correo', 'telefono', 'zona', 'idAliado', 'idPunto'])
    const usuario = auth.user!
    await usuario.load('rol')

    const passwordTemporal = Math.random().toString(36).slice(-8) + 'A1*'
    const hashedPassword = await hash.make(passwordTemporal)

    let encargado = await Usuario.findBy('correo', datos.correo)

    if (encargado) {
      if (encargado.idRol === 4) {
        return response.conflict({ mensaje: 'Este usuario ya es encargado' })
      }
      const idAliado = datos.idAliado ?? (usuario.rol.nombre === 'admin' ? usuario.idAliado : null)
      await db.from('usuarios').where('id_usuario', encargado.idUsuario).update({
        id_rol: 4,
        id_aliado: idAliado,
        password: hashedPassword,
        nombre: datos.nombre || encargado.nombre,
        telefono: datos.telefono || encargado.telefono,
        updated_at: new Date(),
      })
      encargado.idRol = 4
      encargado.idAliado = idAliado
      encargado.password = hashedPassword
    } else {
      const idAliado = datos.idAliado ?? (usuario.rol.nombre === 'admin' ? usuario.idAliado : null)
      const [id] = await db.table('usuarios').insert({
        id_rol: 4,
        id_estado_usuario: 1,
        nombre: datos.nombre,
        correo: datos.correo,
        password: hashedPassword,
        telefono: datos.telefono ?? null,
        id_aliado: idAliado,
        fecha_registro: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      })
      encargado = await Usuario.find(id)!
      encargado!.idAliado = idAliado
    }

    mail.send((message) => {
      message
        .to(datos.correo)
        .from(process.env.SMTP_USERNAME!)
        .subject('Recycling Points - Credenciales de encargado')
        .html(`
          <h2>Hola ${encargado.nombre},</h2>
          <p>Has sido registrado como <strong>encargado</strong> en Recycling Points.</p>
          <p><strong>Correo:</strong> ${datos.correo}</p>
          <p><strong>Contraseña temporal:</strong> ${passwordTemporal}</p>
          <p>Por seguridad, te recomendamos cambiar tu contraseña al iniciar sesión.</p>
          <br/>
          <p>Equipo Recycling Points</p>
        `)
    }).catch(err => console.error('Error al enviar email a encargado:', err))

    // Asignar punto al encargado
    if (datos.idPunto) {
      const punto = await PuntoReciclaje.query()
        .where('id_punto', datos.idPunto)
        .first()
      if (!punto) {
        return response.notFound({ mensaje: 'El punto seleccionado no existe' })
      }
      if (punto.idEncargado && punto.idEncargado !== encargado!.idUsuario) {
        return response.conflict({ mensaje: 'Este punto ya tiene otro encargado asignado' })
      }
      // Desasignar punto anterior del encargado (por si estaba en otro punto)
      await PuntoReciclaje.query()
        .where('id_encargado', encargado!.idUsuario)
        .whereNot('id_punto', punto.idPunto)
        .update({ idEncargado: null })
      punto.idEncargado = encargado!.idUsuario
      await punto.save()
    } else {
      // Auto-asignar el primer punto del aliado sin encargado
      const idAliadoAsignado = datos.idAliado ?? (usuario.rol.nombre === 'admin' ? usuario.idAliado : null)
      if (idAliadoAsignado) {
        await encargado.load('puntoACargo')
        if (!encargado.puntoACargo) {
          const punto = await PuntoReciclaje.query()
            .where('id_aliado', idAliadoAsignado)
            .whereNull('id_encargado')
            .first()
          if (punto) {
            punto.idEncargado = encargado!.idUsuario
            await punto.save()
          }
        }
      }
    }

    return response.ok({ mensaje: 'Encargado creado correctamente. Se enviaron las credenciales al correo.', encargado })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query().where('id_usuario', params.id).where('id_rol', 4)

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const encargado = await query.firstOrFail()
    const datos = request.only(['nombre', 'telefono', 'idEstadoUsuario', 'idAliado', 'correo'])
    encargado.merge(datos)
    if (request.input('password')) {
      encargado.password = await hash.make(request.input('password'))
    }
    await encargado.save()
    return response.ok({ mensaje: 'Encargado actualizado correctamente', encargado })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query().where('id_usuario', params.id).where('id_rol', 4)

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const encargado = await query.firstOrFail()
    await encargado.delete()
    return response.ok({ mensaje: 'Encargado eliminado correctamente' })
  }

  async asignarPunto({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const encargado = await query.firstOrFail()
    await encargado.load('aliado')

    const { idPunto } = request.only(['idPunto'])

    let punto: PuntoReciclaje | null

    if (idPunto) {
      const puntoQuery = PuntoReciclaje.query().where('id_punto', idPunto)

      if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
        puntoQuery.where('id_aliado', usuario.idAliado)
      }

      punto = await puntoQuery.firstOrFail()

      if (punto.idEncargado && punto.idEncargado !== encargado.idUsuario) {
        return response.conflict({ mensaje: 'Este punto ya tiene un encargado asignado' })
      }
    } else {
      const idAliadoAsignar = encargado.idAliado ?? (usuario.rol.nombre === 'admin' ? usuario.idAliado : null)
      if (!idAliadoAsignar) {
        return response.badRequest({ mensaje: 'El encargado no tiene un aliado asignado para auto-asignar punto' })
      }

      punto = await PuntoReciclaje.query()
        .where('id_aliado', idAliadoAsignar)
        .whereNull('id_encargado')
        .first()

      if (!punto) {
        return response.notFound({ mensaje: 'No hay puntos disponibles sin encargado en este aliado' })
      }
    }

    // Si el encargado ya tenía otro punto, desasignarlo
    await PuntoReciclaje.query()
      .where('id_encargado', encargado.idUsuario)
      .whereNot('id_punto', punto.idPunto)
      .update({ idEncargado: null })

    punto.idEncargado = encargado.idUsuario
    await punto.save()
    return response.ok({ mensaje: 'Punto de reciclaje asignado correctamente', punto })
  }
}