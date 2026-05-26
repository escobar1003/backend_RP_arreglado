// app/services/sse_manager.ts
import type { HttpContext } from '@adonisjs/core/http'

class SseManager {
  private clients: Map<number, HttpContext['response']> = new Map()

  // Registrar encargado como cliente SSE
  addClient(idEncargado: number, response: HttpContext['response']) {
    this.clients.set(idEncargado, response)
  }

  // Eliminar encargado cuando se desconecte
  removeClient(idEncargado: number) {
    this.clients.delete(idEncargado)
  }

  // Enviar notificación a un encargado específico
  notificarEncargado(idEncargado: number, data: object) {
    const client = this.clients.get(idEncargado)
    if (client) {
      client.response.write(`data: ${JSON.stringify(data)}\n\n`)
    }
  }
}

export default new SseManager()