import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Secret } from '@adonisjs/core/helpers'
import WsService from '#services/ws_service'
import Usuario from '#models/usuario'

app.ready(() => {
  WsService.boot(server.getNodeServer())
  const io = WsService.io!

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token

      if (!token) {
        return next(new Error('Token requerido'))
      }

      const accessToken = await Usuario.accessTokens.verify(new Secret(token))
      if (!accessToken || accessToken.isExpired()) {
        return next(new Error('Token inválido o expirado'))
      }

      const usuario = await Usuario.query()
        .where('id_usuario', Number(accessToken.tokenableId))
        .preload('rol')
        .first()

      if (!usuario) {
        return next(new Error('Usuario no encontrado'))
      }

      socket.data.userId = usuario.idUsuario
      socket.data.role = usuario.rol.nombre
      next()
    } catch (error) {
      next(new Error('No autorizado'))
    }
  })

  io.on('connection', (socket) => {
    const userId = socket.data.userId
    const role = socket.data.role

    if (role === 'encargado') {
      socket.join(`encargado_${userId}`)
      console.log(`Encargado ${userId} conectado — room: encargado_${userId}`)
    } else if (role === 'usuario') {
      socket.join(`usuario_${userId}`)
      console.log(`Usuario ${userId} conectado — room: usuario_${userId}`)
    }

    socket.on('disconnect', () => {
      console.log(`${role} ${userId} desconectado`)
    })
  })
})
