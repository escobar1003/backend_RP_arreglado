import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import WsService from '#services/ws_service'

app.ready(() => {
  WsService.boot(server.getNodeServer())
  const io = WsService.io!

  io.use((socket, next) => {
    const userId = socket.handshake.auth?.userId

    if (!userId) {
      return next(new Error('userId requerido'))
    }

    socket.data.userId = userId
    socket.data.role = 'encargado'
    next()
  })

  io.on('connection', (socket) => {
    const userId = socket.data.userId
    socket.join(`encargado_${userId}`)
    console.log(`✅ Encargado ${userId} conectado — room: encargado_${userId}`)

    socket.on('disconnect', () => {
      console.log(`❌ Encargado ${userId} desconectado`)
    })
  })
})