import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

function generarPassword(): string {
  const random = Math.random().toString(36).slice(-6)
  return 'Enc' + random + '1!'
}

export default class EncargadosController {
  async index({ response }: HttpContext) {
    const encargados = await Usuario.query()
      .where('id_rol', 4)
      .preload('rol')
      .preload('estadoUsuario')
    return response.ok({ encargados })
  }

  async show({ params, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()
    return response.ok({ encargado })
  }

  async store({ request, response }: HttpContext) {
    const datos = request.only(['nombre', 'correo', 'password', 'telefono'])

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      if (correoExiste.idRol === 4) {
        return response.conflict({ mensaje: 'Este usuario ya es encargado' })
      }
      const password = datos.password || generarPassword()
      correoExiste.idRol = 4
      correoExiste.password = password
      await correoExiste.save()

      await Mail.send((message) => {
        message
          .to(correoExiste.correo)
          .subject('Tus credenciales de acceso - Recycling Points')
          .html(`
            <h2>Hola ${correoExiste.nombre},</h2>
            <p>Has sido registrado como <strong>encargado</strong> en Recycling Points.</p>
            <p><strong>Correo:</strong> ${correoExiste.correo}</p>
            <p><strong>Contraseña:</strong> ${password}</p>
            <p>Inicia sesión para gestionar las entregas.</p>
          `)
      })

      return response.ok({ mensaje: 'Usuario actualizado a encargado. Se enviaron las credenciales a su correo.', encargado: correoExiste })
    }

    // Crear usuario nuevo
    const password = datos.password || generarPassword()
    const encargado = await Usuario.create({
      idRol: 4,
      idEstadoUsuario: 1,
      nombre: datos.nombre,
      correo: datos.correo,
      password: password,
      telefono: datos.telefono ?? null,
      fechaRegistro: DateTime.now(),
    })

    await Mail.send((message) => {
      message
        .to(encargado.correo)
        .subject('Tus credenciales de acceso - Recycling Points')
        .html(`
          <h2>Hola ${encargado.nombre},</h2>
          <p>Has sido registrado como <strong>encargado</strong> en Recycling Points.</p>
          <p><strong>Correo:</strong> ${encargado.correo}</p>
          <p><strong>Contraseña:</strong> ${password}</p>
          <p>Inicia sesión para gestionar las entregas.</p>
        `)
    })

    return response.created({ mensaje: 'Encargado creado correctamente. Se enviaron las credenciales a su correo.', encargado })
  }

  async update({ params, request, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()

    const datos = request.only(['nombre', 'telefono', 'idEstadoUsuario'])
    encargado.merge(datos)
    if (request.input('password')) {
      encargado.password = request.input('password')
    }
    await encargado.save()
    return response.ok({ mensaje: 'Encargado actualizado correctamente', encargado })
  }

  async destroy({ params, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()

    await encargado.delete()
    return response.ok({ mensaje: 'Encargado eliminado correctamente' })
  }
}