import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Reserva from '#models/reserva'
import ReservaImagene from '#models/reserva_imagene'
import PuntoReciclaje from '#models/punto_reciclaje'
import Usuario from '#models/usuario'
import Notificacion from '#models/notificacion'
import CloudinaryService from '#services/cloudinary_service'
import IaAnalisisService, { type ResultadoAnalisisIA } from '#services/ia_analisis_service'
import WsService from '#services/ws_service'

export default class ReservaImagenesController {
  async store({ auth, params, request, response }: HttpContext) {
    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .firstOrFail()

    const imagen = request.file('imagen', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    if (!imagen) {
      return response.badRequest({ success: false, mensaje: 'No se envió ninguna imagen' })
    }

    if (!imagen.isValid) {
      return response.badRequest({ success: false, mensaje: imagen.errors })
    }

    const url = await CloudinaryService.uploadImage(imagen.tmpPath!, 'recycling/reservas')

    const analisis = await IaAnalisisService.analizarImagen(imagen.tmpPath!)

    const reservaImagen = await ReservaImagene.create({
      idReserva: reserva.idReserva,
      url,
      estadoAnalisis: analisis.estado,
      detectado: analisis.detectado,
      materialDetectado: analisis.material,
      confianza: analisis.confianza,
      analisisRaw: analisis.raw,
      analizadoEn: DateTime.now(),
    })

    await this.notificarAnalisis(reserva, reservaImagen, analisis)

    return response.created({
      success: true,
      mensaje: 'Imagen subida correctamente',
      url,
      analisis: {
        estado: reservaImagen.estadoAnalisis,
        detectado: reservaImagen.detectado,
        material: reservaImagen.materialDetectado,
        confianza: reservaImagen.confianza,
      },
    })
  }
  async index({ auth, params, response }: HttpContext) {
    const reserva = await Reserva.query()
      .where('id_reserva', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .firstOrFail()

    const imagenes = await ReservaImagene.query()
      .where('id_reserva', reserva.idReserva)
      .orderBy('created_at', 'asc')

    return response.ok({
      success: true,
      idReserva: reserva.idReserva,
      imagenes: imagenes.map(serializarImagenConAnalisis),
    })
  }

  private async notificarAnalisis(
    reserva: Reserva,
    reservaImagen: ReservaImagene,
    analisis: ResultadoAnalisisIA
  ) {
    const punto = await PuntoReciclaje.query().where('id_punto', reserva.idPunto).first()
    const encargado = punto
      ? await Usuario.query().where('id_aliado', punto.idAliado).where('id_rol', 4).first()
      : null
    const mensaje = construirMensajeAnalisis(analisis)

    const payload = {
      tipo: 'analisis_imagen_reserva',
      idReserva: reserva.idReserva,
      idImagen: reservaImagen.id,
      url: reservaImagen.url,
      estado: analisis.estado,
      detectado: analisis.detectado,
      material: analisis.material,
      confianza: analisis.confianza,
      mensaje,
    }

    await Notificacion.create({
      idUsuario: reserva.idUsuario,
      titulo: 'Análisis de imagen completado',
      mensaje,
      leida: false,
      tipo: 'analisis_imagen_reserva',
      idReferencia: reserva.idReserva,
    })
    WsService.emitToUsuario(reserva.idUsuario, 'analisis_imagen_reserva', payload)

    if (encargado) {
      await Notificacion.create({
        idUsuario: encargado.idUsuario,
        titulo: 'Imagen analizada en una reserva',
        mensaje: `Reserva #${reserva.idReserva}: ${mensaje}`,
        leida: false,
        tipo: 'analisis_imagen_reserva',
        idReferencia: reserva.idReserva,
      })
      WsService.emitToEncargado(encargado.idUsuario, 'analisis_imagen_reserva', payload)
    }
  }
}

function construirMensajeAnalisis(analisis: ResultadoAnalisisIA): string {
  if (analisis.estado === 'completado' && analisis.detectado) {
    const porcentaje =
      typeof analisis.confianza === 'number' ? Math.round(analisis.confianza * 100) : null
    return porcentaje !== null
      ? `Se detectó "${analisis.material}" con ${porcentaje}% de confianza en la imagen enviada.`
      : `Se detectó "${analisis.material}" en la imagen enviada.`
  }
  if (analisis.estado === 'error')
    return 'No fue posible analizar la imagen con IA en este momento.'
  return 'No se identificó un material reciclable claro en la imagen.'
}

function serializarImagenConAnalisis(img: ReservaImagene) {
  return {
    id: img.id,
    idReserva: img.idReserva,
    url: img.url,
    analisis: {
      estado: img.estadoAnalisis,
      detectado: img.detectado,
      material: img.materialDetectado,
      confianza: img.confianza,
    },
    creadoEn: img.createdAt,
  }
}

export { serializarImagenConAnalisis }
