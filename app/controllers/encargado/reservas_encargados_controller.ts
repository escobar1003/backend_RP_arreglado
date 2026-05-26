import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'
import Notificacion from '#models/notificacion'

export default class ReservasEncargadoController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const reservas = await Reserva.query()
      .whereHas('punto', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .preload('punto')
      .preload('usuario')
      .orderBy('fecha', 'desc')

    return response.ok({ total: reservas.length, reservas })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .whereHas('punto', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .preload('punto')
      .preload('usuario')
      .firstOrFail()

    return response.ok({ reserva })
  }

  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const { idUsuario, idPunto, fecha, hora, notas } = request.only([
      'idUsuario', 'idPunto', 'fecha', 'hora', 'notas',
    ])

    const reserva = await Reserva.create({
      idUsuario,
      idPunto,
      fecha,
      hora,
      estado: 'pendiente',
      notas: notas ?? null,
    })

    return response.created({
      mensaje: 'Reserva creada correctamente',
      reserva,
    })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .whereHas('punto', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .firstOrFail()

    const { estado, notas } = request.only(['estado', 'notas'])
    reserva.merge({ estado, notas })
    await reserva.save()

    // Notificar al usuario sobre el cambio de estado
    await Notificacion.create({
      usuarioId: reserva.idUsuario,
      titulo: 'Estado de reserva actualizado',
      mensaje: `Tu reserva del ${reserva.fecha} a las ${reserva.hora} ha cambiado a estado: ${estado}.`,
      leida: false,
      tipo: 'reserva',
      idReferencia: reserva.idReserva,
    })

    return response.ok({
      mensaje: 'Reserva actualizada correctamente',
      reserva,
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .whereHas('punto', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
      .firstOrFail()

    await reserva.delete()
    return response.ok({ mensaje: 'Reserva eliminada correctamente' })
  }
}