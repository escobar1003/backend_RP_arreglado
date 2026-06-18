import type { HttpContext } from '@adonisjs/core/http'
import CloudinaryService from '#services/cloudinary_service'

export default class FotoPerfilController {
  async store({ auth, request, response }: HttpContext) {
    const foto = request.file('foto', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png'],
    })

    if (!foto) {
      return response.badRequest({ mensaje: 'No se envió ninguna foto' })
    }

    if (!foto.isValid) {
      return response.badRequest({ mensaje: foto.errors })
    }

    // Actualizar en BD
    const usuario = auth.user!
    const url = await CloudinaryService.uploadImage(foto.tmpPath!, 'recycling/perfil')
    usuario.imagen = url
    await usuario.save()

    return response.ok({
      mensaje: 'Foto actualizada correctamente',
      foto: url,
    })
  }
}