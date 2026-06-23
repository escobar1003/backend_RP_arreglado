import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export default class DeteccionController {

  public async procesarCamara({ request, response }: HttpContext) {
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
      // 3. Preparar el formulario
      const formData = new FormData()
      formData.append('image', fs.createReadStream(filePath))

      // 4. Petición al servicio de IA
      const iaUrl = process.env.IA_SERVICE_URL || 'http://localhost:5000'
      
      const apiResponse = await axios.post(`${iaUrl}/predict`, formData, {
        headers: { ...formData.getHeaders() },
        timeout: 120000,
      })

      // 5. Responder a Flutter
      return response.ok(apiResponse.data)

    } catch (error: any) {
      return response.internalServerError({ 
        status: 'error', 
        message: 'Error de conexión con el motor de IA.',
        error: error.message 
      })
    } finally {
      // 6. Limpieza segura del archivo temporal
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
  }
}