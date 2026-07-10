import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { actualizarUsuarioValidator, crearUsuarioValidator } from '#validators/admin/usuario'
import { DateTime } from 'luxon'

export default class UsuariosController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query().preload('rol').preload('estadoUsuario')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const usuarios = await query
    return response.ok({ usuarios })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Usuario.query()
      .where('id_usuario', params.id)
      .preload('rol')
      .preload('estadoUsuario')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const usuarioEncontrado = await query.firstOrFail()
    return response.ok({ usuario: usuarioEncontrado })
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
      cedula: datos.cedula ?? null,
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
