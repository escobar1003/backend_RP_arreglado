import type { HttpContext } from '@adonisjs/core/http'
import Notificacion from '#models/notificacion'

export default class NotificacionesUsuarioController {
  // GET /api/usuario/notificaciones
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    const notificaciones = await Notificacion.query()
      .where('id_usuario', usuario.idUsuario)
      .orderBy('created_at', 'desc')

    const noLeidas = notificaciones.filter((n) => !n.leida).length

    return response.ok({
      total: notificaciones.length,
      noLeidas,
      notificaciones,
    })
  }

  // PUT /api/usuario/notificaciones/:id/leer
  async marcarLeida({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const notificacion = await Notificacion.query()
      .where('id_notificacion', params.id)
      .where('id_usuario', usuario.idUsuario)
      .firstOrFail()

    notificacion.leida = true
    await notificacion.save()

    return response.ok({ mensaje: 'Notificación marcada como leída', notificacion })
  }

  // PUT /api/usuario/notificaciones/leer-todas
  async marcarTodasLeidas({ auth, response }: HttpContext) {
    const usuario = auth.user!

    await Notificacion.query()
      .where('id_usuario', usuario.idUsuario)
      .where('leida', false)
      .update({ leida: true })

    return response.ok({ mensaje: 'Todas las notificaciones marcadas como leídas' })
  }
}
//para consultar notiicaciones desde la app
