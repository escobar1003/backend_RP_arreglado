import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { actualizarUsuarioValidator, crearUsuarioValidator } from '#validators/admin/usuario'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class UsuariosController {
  async index({ response }: HttpContext) {
    const usuarios = await Usuario.query().preload('rol').preload('estadoUsuario')
    return response.ok({ usuarios })
  }

  async show({ params, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', params.id)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()
    return response.ok({ usuario })
  }

  async store({ request, response }: HttpContext) {
    const datos = await request.validateUsing(crearUsuarioValidator)

    const correoExiste = await Usuario.findBy('correo', datos.correo)
    if (correoExiste) {
      return response.conflict({ mensaje: 'Ya existe una cuenta con ese correo' })
    }

    const usuario = await Usuario.create({
      idRol: datos.idRol ?? 3,
      idEstadoUsuario: datos.idEstadoUsuario ?? 1,
      nombre: datos.nombre,
      correo: datos.correo,
      password: datos.password,
      telefono: datos.telefono ?? null,
      fechaRegistro: DateTime.now(),
    })

    await usuario.load('rol')

    return response.created({ mensaje: 'Usuario creado correctamente', usuario })
  }

  async update({ params, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    const datos = await request.validateUsing(actualizarUsuarioValidator)
    usuario.merge(datos)
    await usuario.save()
    return response.ok({ mensaje: 'Usuario actualizado correctamente', usuario })
  }

  async destroy({ params, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(params.id)
    await usuario.delete()
    return response.ok({ mensaje: 'Usuario eliminado correctamente' })
  }
}