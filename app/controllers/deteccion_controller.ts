import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'node:fs'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default class DeteccionController {
  public async procesarCamara({ request, response }: HttpContext) {
    console.log('🔥 procesarCamara llamado')
    
    // 1. Recibir la foto de la app móvil
    const imagenMobile = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!imagenMobile) {
      return response.badRequest({
        status: 'error',
        message: 'No se recibió ninguna imagen de la cámara.',
      })
    }

    // 2. Mover la foto a la carpeta temporal
    await imagenMobile.move(app.tmpPath('uploads'))
    const filePath = `${app.tmpPath('uploads')}/${imagenMobile.fileName}`

    try {
      // 3. Subir a Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: 'reciclaje/escaneos',
        resource_type: 'image',
      })
      const fotoUrl = uploadResult.secure_url
      console.log('✅ Foto subida a Cloudinary:', fotoUrl)

      // 4. Preparar el formulario para la IA
      const formData = new FormData()
      formData.append('image', fs.createReadStream(filePath))

      // 5. Petición al servicio de IA
      const iaUrl = process.env.IA_SERVICE_URL || 'http://localhost:5000'
      const apiResponse = await axios.post(`${iaUrl}/predict`, formData, {
        headers: { ...formData.getHeaders() },
        timeout: 120000,
      })

      // 6. Responder a Flutter con resultado IA + URL foto
      return response.ok({
        ...apiResponse.data,
        fotoUrl,
      })
    } catch (error: any) {
      return response.internalServerError({
        status: 'error',
        message: 'Error de conexión con el motor de IA.',
        error: error.message,
      })
    } finally {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
  }
}