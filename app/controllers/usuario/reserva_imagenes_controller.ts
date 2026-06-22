import type { HttpContext } from '@adonisjs/core/http'
import Reserva from '#models/reserva'
import ReservaImagene from '#models/reserva_imagene'
import CloudinaryService from '#services/cloudinary_service'

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

    await ReservaImagene.create({
      idReserva: reserva.idReserva,
      url,
    })

    return response.created({
      success: true,
      mensaje: 'Imagen subida correctamente',
      url,
    })
  }
}
