import type { HttpContext } from '@adonisjs/core/http'
import Canje from '#models/canje'
import Recompensa from '#models/recompensa'
import MovimientoPunto from '#models/movimiento_punto'
import { asegurarPuntoEncargado } from '#services/encargado_punto'
import Notificacion from '#models/notificacion'
import Usuario from '#models/usuario'
import { DateTime } from 'luxon'

export default class CanjesEncargadoController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!
    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) return response.notFound({ mensaje })

    const { estado, usuario_id } = request.qs()

    const query = Canje.query()
      .whereIn('id_usuario', (subquery) => {
        subquery.from('entregas').select('id_usuario').where('id_punto', punto.idPunto)
      })
      .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo'))
      .preload('recompensa')
      .preload('estadoCanje')
      .orderBy('fecha_canje', 'desc')

    if (estado) query.where('id_estado_canje', estado)
    if (usuario_id) query.where('id_usuario', usuario_id)

    const ahora = DateTime.now()
    const canjes = await query

    const result = await Promise.all(canjes.map(async (c) => {
      let estadoCanje: any = c.estadoCanje
      if (c.fechaVencimiento && c.fechaVencimiento < ahora && estadoCanje?.idEstadoCanje !== 3) {
        c.idEstadoCanje = 3
        await c.save()
        estadoCanje = { idEstadoCanje: 3, nombre: 'vencido' } as any
      }
      return {
        idCanje: c.idCanje,
        usuario: c.usuario?.nombre ?? 'Desconocido',
        recompensa: c.recompensa?.nombre ?? 'Desconocida',
        puntosUsados: c.puntosUsados,
        codigoCanje: c.codigoCanje,
        fechaCanje: c.fechaCanje,
        diasRestantes: c.fechaVencimiento
          ? Math.ceil(c.fechaVencimiento.diff(ahora, 'days').days)
          : null,
        estadoCanje: {
          idEstadoCanje: estadoCanje?.idEstadoCanje,
          nombre: estadoCanje?.nombre ?? 'Pendiente',
        },
      }
    }))

    return response.ok({ total: result.length, canjes: result })
  }

  async show({ params, response }: HttpContext) {
    const canje = await Canje.query()
      .where('id_canje', params.id)
      .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo'))
      .preload('recompensa')
      .preload('estadoCanje')
      .firstOrFail()

    return response.ok({ canje })
  }

  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!
    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) return response.notFound({ mensaje })

    const { idUsuario, idRecompensa, fechaVencimiento } = request.only([
      'idUsuario', 'idRecompensa', 'fechaVencimiento',
    ])

    const recompensa = await Recompensa.findOrFail(idRecompensa)

    if (recompensa.idEstadoRecompensa !== 1)
      return response.badRequest({ mensaje: 'Esta recompensa no está disponible' })

    if (recompensa.stock !== null && recompensa.stock <= 0)
      return response.badRequest({ mensaje: 'Esta recompensa está agotada' })

    if (recompensa.fechaFin && DateTime.now() > DateTime.fromISO(recompensa.fechaFin))
      return response.badRequest({ mensaje: 'Esta recompensa ha expirado' })

    const ahora = DateTime.now()
    const movimientos = await MovimientoPunto.query().where('id_usuario', idUsuario)
    const ganados = movimientos
      .filter(m => m.tipoMovimiento === 'ganados' && (!m.fechaCaducidad || m.fechaCaducidad > ahora))
      .reduce((s, m) => s + m.puntos, 0)
    const descontados = movimientos
      .filter(m => m.tipoMovimiento === 'descontados')
      .reduce((s, m) => s + m.puntos, 0)
    const ajuste = movimientos
      .filter(m => m.tipoMovimiento === 'ajuste' && (!m.fechaCaducidad || m.fechaCaducidad > ahora))
      .reduce((s, m) => s + m.puntos, 0)
    const saldo = ganados - descontados + ajuste

    if (saldo < recompensa.puntosRequeridos)
      return response.badRequest({
        mensaje: `Puntos insuficientes. Necesitas ${recompensa.puntosRequeridos} y tienes ${saldo}`,
      })

    const codigoCanje = `CJ-${Date.now()}-${idUsuario}`

    const canje = await Canje.create({
      idUsuario,
      idRecompensa,
      idEstadoCanje: 1,
      puntosUsados: recompensa.puntosRequeridos,
      codigoCanje,
      fechaCanje: DateTime.now(),
      fechaVencimiento: fechaVencimiento ? DateTime.fromISO(fechaVencimiento) : null,
    })

    await MovimientoPunto.create({
      idUsuario,
      idEntrega: null,
      tipoMovimiento: 'descontados',
      puntos: recompensa.puntosRequeridos,
      descripcion: `Canje de recompensa: ${recompensa.nombre}`,
      fechaMovimiento: DateTime.now(),
    })

    const usuarioObj = await Usuario.findOrFail(idUsuario)
    usuarioObj.puntosTotales = (usuarioObj.puntosTotales ?? 0) - recompensa.puntosRequeridos
    await usuarioObj.save()

    if (recompensa.stock !== null) {
      recompensa.stock -= 1
      await recompensa.save()
    }

    await Notificacion.create({
      idUsuario,
      titulo: 'Canje realizado',
      mensaje: `Tu canje de "${recompensa.nombre}" fue registrado. Código: ${codigoCanje}.`,
      leida: false,
      tipo: 'canje',
    })

    return response.ok({ mensaje: 'Canje registrado correctamente', canje })
  }

  async validar({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!
    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) return response.notFound({ mensaje })

    const canje = await Canje.query()
      .where('id_canje', params.id)
      .preload('recompensa')
      .firstOrFail()

    const { idEstadoCanje, codigoCanje } = request.only(['idEstadoCanje', 'codigoCanje'])

    if (codigoCanje && canje.codigoCanje !== codigoCanje)
      return response.badRequest({ mensaje: 'El código de canje no coincide' })

    const estadosValidos = [2, 3]
    if (!estadosValidos.includes(idEstadoCanje))
      return response.badRequest({ mensaje: 'Estado inválido. Use 2 (canjeado) o 3 (vencido)' })

    canje.idEstadoCanje = idEstadoCanje
    await canje.save()

    await Notificacion.create({
      idUsuario: canje.idUsuario,
      titulo: 'Tu canje fue procesado',
      mensaje: `Tu canje de "${canje.recompensa.nombre}" fue ${idEstadoCanje === 2 ? 'canjeado exitosamente' : 'marcado como vencido'}.`,
      leida: false,
      tipo: 'canje',
    })

    return response.ok({ mensaje: 'Canje actualizado correctamente', canje })
  }

  async actualizarEstado({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!
    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) return response.notFound({ mensaje })

    const canje = await Canje.findOrFail(params.id)
    const { idEstadoCanje } = request.only(['idEstadoCanje'])

    if (!idEstadoCanje)
      return response.badRequest({ mensaje: 'Debes enviar idEstadoCanje' })

    canje.idEstadoCanje = idEstadoCanje
    await canje.save()

    return response.ok({ mensaje: 'Estado actualizado correctamente', canje })
  }
}