import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import WsService from '#services/ws_service'

app.ready(() => {
  WsService.boot(server.getNodeServer())
  const io = WsService.io!

  io.use((socket, next) => {
    const userId = socket.handshake.auth?.userId
    const role = socket.handshake.auth?.role

    if (!userId || !role) {
      return next(new Error('userId y role requeridos'))
    }

    socket.data.userId = userId
    socket.data.role = role
    next()
  })

  io.on('connection', (socket) => {
    const userId = socket.data.userId
    const role = socket.data.role

    if (role === 'encargado') {
      socket.join(`encargado_${userId}`)
      console.log(`✅ Encargado ${userId} conectado — room: encargado_${userId}`)
    } else if (role === 'usuario') {
      socket.join(`usuario_${userId}`)
      console.log(`✅ Usuario ${userId} conectado — room: usuario_${userId}`)
    }

    socket.on('disconnect', () => {
      console.log(`❌ ${role} ${userId} desconectado`)
    })
  })
})
