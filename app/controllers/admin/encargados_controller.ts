import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import PuntoReciclaje from '#models/punto_reciclaje'
import { DateTime } from 'luxon'

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
      correoExiste.idRol = 4
      correoExiste.password = await hash.make(datos.password || '123456')
      await correoExiste.save()
      return response.ok({ mensaje: 'Usuario actualizado a encargado', encargado: correoExiste })
    }

    const encargado = await Usuario.create({
      idRol: 4,
      idEstadoUsuario: 1,
      nombre: datos.nombre,
      correo: datos.correo,
      password: await hash.make(datos.password || '123456'),
      telefono: datos.telefono ?? null,
      fechaRegistro: DateTime.now(),
    })

    return response.created({ mensaje: 'Encargado creado correctamente', encargado })
  }

  async update({ params, request, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()

    const datos = request.only(['nombre', 'telefono', 'idEstadoUsuario'])
    encargado.merge(datos)
    if (request.input('password')) {
      encargado.password = await hash.make(request.input('password'))
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

  async asignarPunto({ params, request, response }: HttpContext) {
    const encargado = await Usuario.query()
      .where('id_usuario', params.id)
      .where('id_rol', 4)
      .firstOrFail()

    const { idPunto } = request.only(['idPunto'])
    const punto = await PuntoReciclaje.query()
      .where('id_punto', idPunto)
      .firstOrFail()

    if (punto.idEncargado && punto.idEncargado !== encargado.idUsuario) {
      return response.conflict({ mensaje: 'Este punto ya tiene un encargado asignado' })
    }

    punto.idEncargado = encargado.idUsuario
    await punto.save()
    return response.ok({ mensaje: 'Punto de reciclaje asignado correctamente', punto })
  }
}