import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'
import PuntoReciclaje from '#models/punto_reciclaje'

export default class ReservasEncargadoController {
  /**
   * GET /api/encargado/reservas
   * El encargado consulta todas las reservas del punto a su cargo.
   * Soporta filtros opcionales: ?fecha=YYYY-MM-DD  ?estado=pendiente
   */
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    // El encargado está asociado a un punto de reciclaje
    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const { fecha, estado } = request.qs()

    const query = Reserva.query()
      .where('id_punto', punto.idPunto)
      .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo', 'telefono'))
      .orderBy('fecha', 'asc')
      .orderBy('hora', 'asc')

    if (fecha) query.where('fecha', fecha)
    if (estado) query.where('estado', estado)

    const reservas = await query

    return response.ok({
      punto: { idPunto: punto.idPunto, nombre: punto.nombre },
      total: reservas.length,
      reservas,
    })
  }

  /**
   * GET /api/encargado/reservas/:id
   * Detalle de una reserva específica
   */
  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_punto', punto.idPunto)
      .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo', 'telefono'))
      .firstOrFail()

    return response.ok({ reserva })
  }

  /**
   * POST /api/encargado/reservas
   * El encargado crea una reserva manual (por llamada, presencial, etc.)
   * Body: { idUsuario, fecha, hora, notas? }
   */
  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const { idUsuario, fecha, hora, notas } = request.only(['idUsuario', 'fecha', 'hora', 'notas'])

    if (!idUsuario || !fecha || !hora) {
      return response.badRequest({ mensaje: 'idUsuario, fecha y hora son obligatorios' })
    }

    const reserva = await Reserva.create({
      idUsuario,
      idPunto: punto.idPunto,
      fecha,
      hora,
      estado: 'confirmada', // las del encargado quedan confirmadas de una
      notas: notas ?? null,
    })

    await reserva.load('usuario', (q) => q.select('id_usuario', 'nombre', 'correo', 'telefono'))

    return response.created({
      mensaje: 'Reserva creada exitosamente',
      reserva,
    })
  }

  /**
   * PUT /api/encargado/reservas/:id
   * El encargado edita una reserva: puede cambiar fecha, hora, estado o notas
   * Body: { fecha?, hora?, estado?, notas? }
   */
  async update({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_punto', punto.idPunto)
      .firstOrFail()

    const { fecha, hora, estado, notas } = request.only(['fecha', 'hora', 'estado', 'notas'])

    const estadosValidos = ['pendiente', 'confirmada', 'cancelada', 'completada']
    if (estado && !estadosValidos.includes(estado)) {
      return response.badRequest({
        mensaje: `Estado inválido. Valores permitidos: ${estadosValidos.join(', ')}`,
      })
    }

    if (fecha) reserva.fecha = fecha
    if (hora) reserva.hora = hora
    if (estado) reserva.estado = estado
    if (notas !== undefined) reserva.notas = notas

    await reserva.save()
    await reserva.load('usuario', (q) => q.select('id_usuario', 'nombre', 'correo', 'telefono'))

    return response.ok({ mensaje: 'Reserva actualizada', reserva })
  }

  /**
   * DELETE /api/encargado/reservas/:id
   * El encargado elimina una reserva de su agenda
   */
  async destroy({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_punto', punto.idPunto)
      .firstOrFail()

    await reserva.delete()

    return response.ok({ mensaje: 'Reserva eliminada exitosamente' })
  }
}
