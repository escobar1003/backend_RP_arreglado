import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class GestionUsuariosController {

  // ✅ LISTAR USUARIOS
  public async listar({ response }: HttpContext) {
    const usuarios = await Usuario.all()
    return response.ok(usuarios)
  }

  // ✅ CAMBIAR ESTADO (ACTIVAR / DESACTIVAR)list
  public async cambiarEstado({ params, request, response }: HttpContext) {

  const id = params.id

  // 🔴 VALIDACIÓN CLAVE
  if (!id) {
    return response.badRequest({ mensaje: 'ID no enviado' })
  }

  const usuario = await Usuario.findOrFail(id)

  const { esta_activo } = request.only(['esta_activo'])

  usuario.esta_activo = esta_activo
  await usuario.save()

  return response.ok({
    mensaje: 'Estado actualizado',
    usuario
  })
}

  // 🔥 OPCIONAL (sirve para pruebas rápidas)
  public async crear({ request, response }: HttpContext) {
    const datos = request.only(['nombre_completo', 'correo', 'rol'])

    const usuario = await Usuario.create({
      ...datos,
      esta_activo: true
    })

    const existe = await Usuario.findBy('correo', datos.correo)

    if (existe) {
      return response.badRequest({
        mensaje: 'El correo ya existe'
      })
    }

    return response.created(usuario)
  }
}