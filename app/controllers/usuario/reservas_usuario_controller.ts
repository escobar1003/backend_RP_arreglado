import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'

export default class ReservasUsuarioController {
  /**
   * GET /api/usuario/reservas
   * El usuario consulta sus propias reservas
   */
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    const reservas = await Reserva.query()
      .where('id_usuario', usuario.idUsuario)
      .preload('punto', (q) => q.select('id_punto', 'nombre', 'direccion', 'horario'))
      .orderBy('fecha', 'asc')
      .orderBy('hora', 'asc')

    return response.ok({ reserva: reservas.map(r => ({
    idReserva: r.idReserva,
    estado: r.estado,
    fecha: r.fecha,
    hora: r.hora,
    notas: r.notas,
    puntoReciclaje: {
      nombre: r.punto.nombre,
      direccion: r.punto.direccion,
    }
  }))
})
  }

  /**
   * GET /api/usuario/reservas/:id
   * El usuario consulta el detalle de una reserva
   */
  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', usuario.idUsuario)
      .preload('punto', (q) => q.select('id_punto', 'nombre', 'direccion', 'horario',  'latitud', 'longitud'))
      .firstOrFail()

    return response.ok({ idReserva: reserva.idReserva,
  estado: reserva.estado,
  fecha: reserva.fecha,
  hora: reserva.hora,
  notas: reserva.notas,
  puntoReciclaje: {
    nombre: reserva.punto.nombre,
    direccion: reserva.punto.direccion,
    latitud: reserva.punto.latitud,
    longitud: reserva.punto.longitud, 
  }
    })
  }

  /**
   * POST /api/usuario/reservas
   * El usuario crea una nueva reserva desde la app móvil
   * Body: { idPunto, fecha, hora, notas? }
   */
  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const { idPunto, fecha, hora, notas } = request.only(['idPunto', 'fecha', 'hora', 'notas'])

    if (!idPunto || !fecha || !hora) {
      return response.badRequest({ mensaje: 'idPunto, fecha y hora son obligatorios' })
    }

    // Validar que la fecha no sea pasada
    const fechaReserva = new Date(`${fecha}T${hora}`)
    if (fechaReserva < new Date()) {
      return response.badRequest({ mensaje: 'No puedes reservar en una fecha u hora pasada' })
    }

    const reserva = await Reserva.create({
      idUsuario: usuario.idUsuario,
      idPunto,
      fecha,
      hora,
      estado: 'pendiente',
      notas: notas ?? null,
    })

    await reserva.load('punto', (q) => q.select('id_punto', 'nombre', 'direccion'))

    return response.created({
      mensaje: 'Reserva creada exitosamente',
      reserva,
    })
  }

  /**
   * DELETE /api/usuario/reservas/:id
   * El usuario cancela su propia reserva (solo si está pendiente)
   */
  async destroy({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', usuario.idUsuario)
      .firstOrFail()

    if (reserva.estado !== 'pendiente') {
      return response.badRequest({
        mensaje: `No puedes cancelar una reserva con estado "${reserva.estado}"`,
      })
    }

    reserva.estado = 'cancelada'
    await reserva.save()

    return response.ok({ mensaje: 'Reserva cancelada exitosamente' })
  }
}
