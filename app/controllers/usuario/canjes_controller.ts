import type { HttpContext } from '@adonisjs/core/http'
import Canje from '#models/canje'
import Notificacion from '#models/notificacion'
import Recompensa from '#models/recompensa'
import MovimientoPunto from '#models/movimiento_punto'
import MovimientoPuntoModel from '#models/movimiento_punto'
import { DateTime } from 'luxon'

export default class CanjesController {
  async index({ auth, response }: HttpContext) {
    const canjes = await Canje.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('recompensa')
      .preload('estadoCanje')
      .orderBy('fecha_canje', 'desc')

    return response.ok({ canjes })
  }

  async show({ auth, params, response }: HttpContext) {
    const canje = await Canje.query()
      .where('id_canje', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .preload('recompensa', (q) => q.preload('detalle'))
      .preload('estadoCanje')
      .firstOrFail()

    return response.ok({ canje })
  }

  async store({ auth, request, response }: HttpContext) {
    const { idRecompensa } = request.only(['idRecompensa'])

    const recompensa = await Recompensa.findOrFail(idRecompensa)

    // Verificar que la recompensa esté activa
    if (recompensa.idEstadoRecompensa !== 1) {
      return response.badRequest({
        mensaje: 'Esta recompensa no está disponible',
      })
    }

    // Verificar stock
    if (recompensa.stock !== null && recompensa.stock <= 0) {
      return response.badRequest({
        mensaje: 'Esta recompensa está agotada',
      })
    }

    // Calcular saldo actual del usuario
    const movimientos = await MovimientoPunto.query()
      .where('id_usuario', auth.user!.idUsuario)

    const ganados = movimientos
      .filter((m) => m.tipoMovimiento === 'ganados')
      .reduce((sum, m) => sum + m.puntos, 0)

    const descontados = movimientos
      .filter((m) => m.tipoMovimiento === 'descontados')
      .reduce((sum, m) => sum + m.puntos, 0)

    const ajuste = movimientos
      .filter((m) => m.tipoMovimiento === 'ajuste')
      .reduce((sum, m) => sum + m.puntos, 0)

    const saldo = ganados - descontados + ajuste

    if (saldo < recompensa.puntosRequeridos) {
      return response.badRequest({
        mensaje: `Puntos insuficientes. Necesitas ${recompensa.puntosRequeridos} y tienes ${saldo}`,
      })
    }

    // Generar código de canje único
    const codigoCanje = `CJ-${Date.now()}-${auth.user!.idUsuario}`

    // Crear el canje
    const canje = await Canje.create({
      idUsuario: auth.user!.idUsuario,
      idRecompensa,
      idEstadoCanje: 1, // pendiente
      puntosUsados: recompensa.puntosRequeridos,
      codigoCanje,
      fechaCanje: DateTime.now(),
    })

    // Descontar puntos
    await MovimientoPuntoModel.create({
      idUsuario: auth.user!.idUsuario,
      idEntrega: null,
      tipoMovimiento: 'descontados',
      puntos: recompensa.puntosRequeridos,
      descripcion: `Canje de recompensa: ${recompensa.nombre}`,
      fechaMovimiento: DateTime.now(),
    })

    // Reducir stock si aplica
    if (recompensa.stock !== null) {
      recompensa.stock -= 1
      await recompensa.save()
    }

        // SCRUM-583: Generar notificación al aprobar canje
    await Notificacion.create({
      idUsuario: auth.user!.idUsuario,
      titulo: 'Canje realizado',
      mensaje: `Tu canje de "${recompensa.nombre}" fue registrado correctamente. Código: ${codigoCanje}. Puntos usados: ${recompensa.puntosRequeridos}pts.`,
      leida: false,
      tipo: 'canje',
      idReferencia: canje.idCanje,
    })

    return response.created({
      mensaje: 'Canje realizado correctamente',
      canje: {
        idCanje: canje.idCanje,
        codigoCanje,
        recompensa: recompensa.nombre,
        puntosUsados: recompensa.puntosRequeridos,
        saldoRestante: saldo - recompensa.puntosRequeridos,
      },
    })
  }
}