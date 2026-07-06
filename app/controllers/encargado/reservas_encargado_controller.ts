import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'
import { asegurarPuntoEncargado } from '#services/encargado_punto'
import Notificacion from '#models/notificacion'
import { serializarImagenConAnalisis } from '#controllers/usuario/reserva_imagenes_controller'
import Ws from '#services/ws_service'
import SseManager from '#services/sse_manager'

export default class ReservasEncargadoController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

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
      .preload('imagenes', (q) => q.orderBy('created_at', 'asc'))
      .firstOrFail()

    return response.ok({ reserva, imagenes: reserva.imagenes.map(serializarImagenConAnalisis) })
  }

  async imagenes({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) return response.notFound({ mensaje })

    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_punto', punto.idPunto)
      .preload('imagenes', (q) => q.orderBy('created_at', 'asc'))
      .firstOrFail()

    return response.ok({
      success: true,
      idReserva: reserva.idReserva,
      imagenes: reserva.imagenes.map(serializarImagenConAnalisis),
    })
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
    await reserva.load('imagenes', (q) => q.orderBy('created_at', 'asc'))

    if (estado) {
      const estadoLabel: Record<string, string> = {
        pendiente: 'puesta en pendiente',
        confirmada: 'aceptada',
        cancelada: 'rechazada',
        completada: 'completada',
      }

      const eventoPorEstado: Record<string, string> = {
        pendiente: 'reserva_pendiente',
        confirmada: 'reserva_aceptada',
        cancelada: 'reserva_rechazada',
        completada: 'reserva_completada',
      }

      const etiqueta = estadoLabel[estado] ?? estado
      const evento = eventoPorEstado[estado] ?? 'reserva_actualizada'

      await Notificacion.create({
        idUsuario: reserva.idUsuario,
        titulo: `Reserva ${etiqueta}`,
        mensaje: `Tu reserva en ${punto.nombre} para el ${reserva.fecha} a las ${reserva.hora} fue ${etiqueta}.`,
        leida: false,
        tipo: 'reserva',
        idReferencia: reserva.idReserva,
      })

      const materialLabel = reserva.iaMaterial
        ? `Material detectado: ${reserva.iaMaterial}${reserva.iaConfianza ? ` (${reserva.iaConfianza}% confianza)` : ''}`
        : null

      Ws.emitToUsuario(reserva.idUsuario, evento, {
        idReserva: reserva.idReserva,
        estado,
        titulo: `Reserva ${etiqueta}`,
        mensaje: `Tu reserva en ${punto.nombre} para el ${reserva.fecha} a las ${reserva.hora} fue ${etiqueta}.`,
        urlFoto: reserva.urlFoto,
        iaMaterial: reserva.iaMaterial,
        iaConfianza: reserva.iaConfianza,
        materialLabel,
        imagenes: reserva.imagenes.map(serializarImagenConAnalisis),
      })

      SseManager.notificarEncargado(usuario.idUsuario, {
        tipo: 'reserva_actualizada',
        idReserva: reserva.idReserva,
        estado,
        mensaje: `Reserva #${reserva.idReserva} ${etiqueta}`,
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

    // Guardamos los datos antes de borrar, porque después de reserva.delete()
    // ya no tiene sentido confiar en la instancia para armar la notificación.
    const idReservaEliminada = reserva.idReserva
    const idUsuarioReserva = reserva.idUsuario
    const fechaReserva = reserva.fecha
    const horaReserva = reserva.hora

    await reserva.delete()

    const mensajeAviso = `Tu reserva en ${punto.nombre} para el ${fechaReserva} a las ${horaReserva} fue eliminada por el punto de reciclaje.`

    await Notificacion.create({
      idUsuario: idUsuarioReserva,
      titulo: 'Reserva eliminada',
      mensaje: mensajeAviso,
      leida: false,
      tipo: 'reserva',
      idReferencia: idReservaEliminada,
    })

    Ws.emitToUsuario(idUsuarioReserva, 'reserva_eliminada', {
      idReserva: idReservaEliminada,
      mensaje: mensajeAviso,
    })

    return response.ok({ mensaje: 'Reserva eliminada exitosamente' })
  }
}
