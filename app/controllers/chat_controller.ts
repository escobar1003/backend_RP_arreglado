import type { HttpContext } from '@adonisjs/core/http'
import { GoogleGenAI } from '@google/genai'
import env from '#start/env'

export default class ChatController {
  public async preguntar({ request, response }: HttpContext) {
    try {
      // 1. Obtener la pregunta que viene desde el celular Vivo
      const { mensaje } = request.only(['mensaje'])

      if (!mensaje) {
        return response.badRequest({ error: 'El mensaje es obligatorio' })
      }

      // 2. Inicializar el SDK de Gemini usando la API Key del .env
      const apiKey = env.get('GEMINI_API_KEY')
      const ai = new GoogleGenAI({ apiKey: apiKey })

      // 3. Configurar el rol educativo y las reglas de reciclaje para la IA
      const systemInstruction = `
        Eres el asistente virtual experto en reciclaje y educación ambiental de la aplicación 'Reciclin-Point'.
        Tu objetivo es educar, guiar y responder dudas de los usuarios sobre qué materiales se pueden reciclar y cuáles no, por qué razones, y cómo deben disponerse correctamente.
        Reglas de respuesta:
        - Sé amable, motivador y conciso (no des respuestas exageradamente largas).
        - Si el usuario te pregunta por algo que NO se puede reciclar, explica brevemente el motivo (ej. contaminación, tipo de plástico).
        - Si te preguntan algo totalmente fuera del tema ambiental o de reciclaje, responde cortésmente que solo estás capacitado para resolver dudas sobre reciclaje, ecología y cuidado del planeta.
      `

      // 4. Llamar al modelo de Gemini (usamos gemini-2.5-flash por ser el más rápido y óptimo para chat)
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: mensaje,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      })

      // 5. Devolver la respuesta en texto limpio directo a Flutter
      return response.ok({
        respuesta: aiResponse.text
      })

    } catch (error) {
      console.error('Error en el módulo de Chat IA:', error)
      return response.internalServerError({
        error: 'Hubo un problema al procesar tu consulta con la IA. Inténtalo de nuevo.'
      })
    }
  }
}