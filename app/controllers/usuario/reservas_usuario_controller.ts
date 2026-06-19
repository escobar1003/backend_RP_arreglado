import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'
import PuntoReciclaje from '#models/punto_reciclaje'
import Notificacion from '#models/notificacion'
import WsService from '#services/ws_service'
import Usuario from '#models/usuario'

export default class ReservasUsuarioController {
  async index({ auth, response }: HttpContext) {
    const reservas = await Reserva.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('punto', (q) => q.select('id_punto', 'nombre', 'direccion', 'horario'))
      .orderBy('fecha', 'desc')

    return response.ok({
      reservas: reservas.map((r) => ({
        idReserva: r.idReserva,
        estado: r.estado,
        fecha: r.fecha,
        hora: r.hora,
        notas: r.notas,
        puntoReciclaje: {
          nombre: r.punto.nombre,
          direccion: r.punto.direccion,
        },
      })),
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .preload('punto', (q) =>
        q.select('id_punto', 'nombre', 'direccion', 'horario', 'latitud', 'longitud')
      )
      .firstOrFail()

    return response.ok({
      idReserva: reserva.idReserva,
      estado: reserva.estado,
      fecha: reserva.fecha,
      hora: reserva.hora,
      notas: reserva.notas,
      puntoReciclaje: {
        nombre: reserva.punto.nombre,
        direccion: reserva.punto.direccion,
        latitud: reserva.punto.latitud,
        longitud: reserva.punto.longitud,
      },
    })
  }

  async store({ auth, request, response }: HttpContext) {
    console.log('🚀 Entró al store de reservas')

    const { idPunto, fecha, hora, notas } = request.only(['idPunto', 'fecha', 'hora', 'notas'])

    const punto = await PuntoReciclaje.query()
      .where('id_punto', idPunto)
      .preload('aliado')
      .firstOrFail()

    const reserva = await Reserva.create({
      idUsuario: auth.user!.idUsuario,
      idPunto,
      fecha,
      hora,
      estado: 'pendiente',
      notas: notas ?? null,
    })

    const encargado = await Usuario.query()
      .where('id_aliado', punto.idAliado)
      .where('id_rol', 4)
      .first()

    console.log('👤 Encargado encontrado:', encargado)

    if (encargado) {
      console.log('📤 Voy a emitir socket al encargado', encargado.idUsuario)
      await Notificacion.create({
        idUsuario: encargado.idUsuario,
        tipo: 'nueva_reserva',
        titulo: 'Nueva reserva',
        mensaje: `El usuario ${auth.user!.nombre} ha reservado en ${punto.nombre} para el ${fecha} a las ${hora}.`,
        leida: false,
      })
      // idReferencia: reserva.idReserva,

      WsService.emitToEncargado(encargado.idUsuario, 'notificacion', {
        tipo: 'nueva_reserva',
        reserva: {
          idReserva: reserva.idReserva,
          nombreUsuario: auth.user!.nombre,
          nombrePunto: punto.nombre,
          fecha,
          hora,
          estado: 'pendiente',
        },
      })
    } // ← esta llave faltaba

    return response.created({
      mensaje: 'Reserva registrada correctamente',
      reserva: {
        idReserva: reserva.idReserva,
        estado: reserva.estado,
        fecha: reserva.fecha,
        hora: reserva.hora,
        nombrePunto: punto.nombre,
      },
    })
  }

  async cancelar({ auth, params, response }: HttpContext) {
    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .firstOrFail()

    if (reserva.estado !== 'pendiente') {
      return response.badRequest({
        mensaje: `No puedes cancelar una reserva con estado "${reserva.estado}"`,
      })
    }

    reserva.estado = 'cancelada'
    await reserva.save()

    const punto = await PuntoReciclaje.query().where('id_punto', reserva.idPunto).firstOrFail()

    const encargado = await Usuario.query()
      .where('id_aliado', punto.idAliado)
      .where('id_rol', 4)
      .first()

    if (encargado) {
      WsService.emitToEncargado(encargado.idUsuario, 'notificacion', {
        tipo: 'reserva_cancelada',
        idReserva: reserva.idReserva,
        mensaje: `El usuario canceló la reserva #${reserva.idReserva}`,
      })
    }

    return response.ok({
      mensaje: 'Reserva cancelada',
      idReserva: reserva.idReserva,
      estado: reserva.estado,
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .firstOrFail()

    reserva.estado = 'cancelada'
    await reserva.save()

    return response.ok({ mensaje: 'Reserva cancelada correctamente' })
  }
}
