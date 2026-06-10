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
  }

  public emitToEncargado(idEncargado: number, event: string, data: any) {
    console.log(`📤 Emitiendo ${event} a encargado_${idEncargado}`)
    this.io?.to(`encargado_${idEncargado}`).emit(event, data)
  }

  public emitToUsuario(idUsuario: number, event: string, data: any) {
    this.io?.to(`usuario_${idUsuario}`).emit(event, data)
  }
}

export default new WsService()