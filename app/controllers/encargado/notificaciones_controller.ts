import type { HttpContext } from '@adonisjs/core/http'
import Notificacion from '#models/notificacion'

export default class NotificacionesController {
  // SCRUM-580: GET /notificaciones
async index({ auth, response }: HttpContext) {
  const usuario = auth.user!
  const notificaciones = await Notificacion.query()
    .where('id_usuario', usuario.idUsuario)
    .orderBy('created_at', 'desc')

  const noLeidas = notificaciones.filter(n => !n.leida).length

  return response.ok({ 
    total: notificaciones.length,
    noLeidas,
    notificaciones 
  })
}

  // SCRUM-581: PUT /notificaciones/:id/leer
  async marcarLeida({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    const notificacion = await Notificacion.query()
      .where('id', params.id)
      .where('id_usuario', usuario.idUsuario)
      .firstOrFail()

    notificacion.leida = true
    await notificacion.save()

    return response.ok({ mensaje: 'Notificación marcada como leída', notificacion })
  }

  // Marcar todas como leídas
  async marcarTodasLeidas({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await Notificacion.query()
      .where('id_usuario', usuario.idUsuario)
      .where('leida', false)
      .update({ leida: true })

    return response.ok({ mensaje: 'Todas las notificaciones marcadas como leídas' })
  }
}