import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export default class DeteccionController {

  public async procesarCamara({ request, response }: HttpContext) {

    // 1. Recibir la imagen desde Flutter
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

    // 2. Guardar temporalmente en el servidor
    await imagenMobile.move(app.tmpPath('uploads'))
    const filePath = `${app.tmpPath('uploads')}/${imagenMobile.fileName}`

    const cleanup = () => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    try {
      // 3. Armar el FormData para reenviar al servicio YOLO
      const formData = new FormData()
      formData.append('image', fs.createReadStream(filePath), {
        filename: imagenMobile.fileName,
        contentType: imagenMobile.headers['content-type'] ?? 'image/jpeg',
      })

      // 4. URL del servicio YOLO desde variable de entorno
      //    En Render: IA_SERVICE_URL=https://recycling-ia-service.onrender.com
      const iaUrl = process.env.IA_SERVICE_URL ?? 'http://localhost:5000'

      console.log(`[IA] Enviando imagen a: ${iaUrl}/predict`)

      const apiResponse = await axios.post(`${iaUrl}/predict`, formData, {
        headers: formData.getHeaders(),
        timeout: 60000, // 60s para tolerar el cold start de Render Free
      })

      cleanup()

      console.log('[IA] Respuesta recibida:', apiResponse.data)

      // 5. Devolver resultado a Flutter
      return response.ok(apiResponse.data)

    } catch (error: any) {
      cleanup()

      // Log detallado para ver en Render → Logs
      console.error('[IA] Error:', {
        message: error.message,
        code: error.code,
        iaStatus: error.response?.status,
        iaData: error.response?.data,
      })

      return response.internalServerError({
        status: 'error',
        message: 'Error de conexión con el motor de Inteligencia Artificial.',
        error: error.message || error.code || 'Sin detalles',
      })
    }
  }
}