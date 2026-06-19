import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'
import { asegurarPuntoEncargado } from '#services/encargado_punto'
import Notificacion from '#models/notificacion'

export default class ReservasEncargadoController {
  async index({ auth, request, response }: HttpContext) {
    console.log('✅ Llegó al controlador de reservas encargado')
    const usuario = auth.user!
    console.log('👤 Usuario:', usuario.idUsuario)

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
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

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_punto', punto.idPunto)
      .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo', 'telefono'))
      .firstOrFail()

    return response.ok({ reserva })
  }

  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
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
      estado: 'confirmada',
      notas: notas ?? null,
    })

    await reserva.load('usuario', (q) => q.select('id_usuario', 'nombre', 'correo', 'telefono'))

    return response.created({
      mensaje: 'Reserva creada exitosamente',
      reserva,
    })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
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

    if (estado) {
      await Notificacion.create({
        idUsuario: reserva.idUsuario,
        titulo: 'Estado de reserva actualizado',
        mensaje: `Tu reserva en ${punto.nombre} cambió a estado: ${estado}.`,
        leida: false,
        tipo: 'reserva',
      })
    }

    return response.ok({ mensaje: 'Reserva actualizada', reserva })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_punto', punto.idPunto)
      .firstOrFail()

    await reserva.delete()

    return response.ok({ mensaje: 'Reserva eliminada exitosamente' })
  }
}
