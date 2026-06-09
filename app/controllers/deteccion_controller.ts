import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export default class DeteccionController {
  
  public async procesarCamara({ request, response }: HttpContext) {
    // 1. Recibir la foto que envía la app móvil de Flutter
    const imagenMobile = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!imagenMobile) {
      return response.badRequest({ 
        status: 'error', 
        message: 'No se recibió ninguna imagen de la cámara.' 
      })
    }

    // 2. Mover la foto temporalmente a la carpeta del servidor de Adonis
    await imagenMobile.move(app.tmpPath('uploads'))
    const filePath = `${app.tmpPath('uploads')}/${imagenMobile.fileName}`

    try {
  // 3. Preparar el formulario para reenviar la foto al script de Python (YOLOv11)
  const formData = new FormData()
  formData.append('image', fs.createReadStream(filePath))

  // 4. Hacer la petición HTTP POST al puerto 5000 (donde corre app.py)
  const apiResponse = await axios.post('http://localhost:5000/predict', formData, {
    headers: formData.getHeaders(),
  })

  // 5. Borrar la foto temporal del servidor de Adonis para no acumular basura
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  // 6. Responderle los resultados de la IA de vuelta a Flutter
  return response.ok(apiResponse.data)

} catch (error: any) {

  // Si algo falla, borrar la foto temporal para evitar bloqueos
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

    return response.internalServerError({
    status: 'error',
    message: 'Error de conexión con el motor de Inteligencia Artificial.',
    error: error.message
  })
}
  }
}