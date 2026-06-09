import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class ChatbotController {
  async preguntar({ request, response }: HttpContext) {
    const { pregunta } = request.only(['pregunta'])

    if (!pregunta || pregunta.trim() === '') {
      return response.badRequest({
        status: 'error',
        mensaje: 'La pregunta no puede estar vacía'
      })
    }

    try {
      const respuesta = await axios.post('http://localhost:5001/chatbot', {
        pregunta: pregunta.trim()
      })

      return response.ok({
        status: 'success',
        pregunta: pregunta.trim(),
        respuesta: respuesta.data.respuesta,
        fuente: respuesta.data.fuente
      })

    } catch (error: any) {
      return response.internalServerError({
        status: 'error',
        mensaje: 'Error al conectar con el servicio de IA',
        error: error.message
      })
    }
  }
}