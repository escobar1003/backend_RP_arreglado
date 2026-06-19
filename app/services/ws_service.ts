// app/services/ws_service.ts angie
import { Server } from 'socket.io' //Importa la clase Server de la librería Socket.IO.

class WsService { //Esta clase concentra toda la lógica relacionada con los WebSockets.
  public io: Server | null = null //Es una propiedad que almacenará la instancia del servidor Socket.IO.

  public boot(httpServer: any) { //Este método inicializa el servidor de WebSockets.
    this.io = new Server(httpServer, { //Se conecta al servidor HTTP principal de AdonisJS.
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    })
  }

  public emitToEncargado(idEncargado: number, event: string, data: any) { //Envía un evento únicamente al encargado indicado.
    console.log(`📤 Emitiendo ${event} a encargado_${idEncargado}`) //imprime un mensaje en la consola para verificar que el evento fue enviado.
    this.io?.to(`encargado_${idEncargado}`).emit(event, data) //solo recibe el mensaje un encargado
  }

  public emitToUsuario(idUsuario: number, event: string, data: any) { //Envía un evento únicamente al usuario indicado.
    this.io?.to(`usuario_${idUsuario}`).emit(event, data)
  }
}

export default new WsService()
