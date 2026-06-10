import { Server } from 'socket.io'

class WsService {
  public io: Server | null = null

  public boot(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    })
  }  // ← esta llave cerraba el boot y faltaba

  public emitToEncargado(idEncargado: number, event: string, data: any) {
    this.io?.to(`encargado_${idEncargado}`).emit(event, data)
  }

  public emitToUsuario(idUsuario: number, event: string, data: any) {
    this.io?.to(`usuario_${idUsuario}`).emit(event, data)
  }
}

export default new WsService()