import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'
import Notificacion from '#models/notificacion'
import DetalleEntrega from '#models/detalle_entrega'
import MovimientoPunto from '#models/movimiento_punto'
import Material from '#models/material'
import Usuario from '#models/usuario'
import EstadoEntrega from '#models/estado_entrega'
import { DateTime } from 'luxon'
import { asegurarPuntoEncargado } from '#services/encargado_punto'
import WsService from '#services/ws_service'

export default class EntregasController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const query = Entrega.query()
      .where('id_punto', punto.idPunto)
      .preload('puntoReciclaje', (q) => q.preload('aliado'))
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .orderBy('fecha_entrega', 'desc')

    const { supermercadoId, usuario_id, encargadoId } = request.qs()

    if (supermercadoId) {
      query.whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', supermercadoId)
      })
    }

    if (usuario_id) {
      query.where('id_usuario', usuario_id)
    }

    if (encargadoId) {
      query.whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', usuario.idAliado!)
      })
    }

    const entregas = await query.preload('movimientos')

    const result = entregas.map((e) => {
      const data = e.toJSON()
      const mov = data.movimientos?.find((m: any) => m.fechaCaducidad)
      delete data.movimientos
      data.fechaVencimientoPuntos = mov?.fechaCaducidad ?? null
      return data
    })

    return response.ok({
      total: entregas.length,
      entregas: result,
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_punto', punto.idPunto)
      .preload('puntoReciclaje', (q) => q.preload('aliado'))
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .preload('movimientos')
      .firstOrFail()

    const data = entrega.toJSON()
    const mov = data.movimientos?.find((m: any) => m.fechaCaducidad)
    delete data.movimientos
    data.fechaVencimientoPuntos = mov?.fechaCaducidad ?? null

    return response.ok({ entrega: data })
  }

  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const { idUsuario, materiales, observacion, fechaVencimientoPuntos } = request.only([
      'idUsuario',
      'materiales',
      'observacion',
      'fechaVencimientoPuntos',
    ])

    if (!materiales || !Array.isArray(materiales) || materiales.length === 0) {
      return response.badRequest({ mensaje: 'Debes incluir al menos un material' })
    }

    let pesoTotal = 0
    let puntosTotales = 0
    const detallesCalculados: { idMaterial: number; peso: number; puntosGenerados: number }[] = []

    for (const detalle of materiales) {
      const material = await Material.findOrFail(detalle.idMaterial)
      const puntosGenerados = Math.floor(detalle.peso * material.puntosPorKg)
      pesoTotal += detalle.peso
      puntosTotales += puntosGenerados
      detallesCalculados.push({
        idMaterial: detalle.idMaterial,
        peso: detalle.peso,
        puntosGenerados,
      })
    }

    const entrega = await Entrega.create({
      idUsuario,
      idPunto: punto.idPunto,
      idEstadoEntrega: 1,
      fechaEntrega: DateTime.now(),
      pesoTotal,
      puntosTotales,
      observacion: observacion ?? null,
    })

    for (const detalle of detallesCalculados) {
      await DetalleEntrega.create({ idEntrega: entrega.idEntrega, ...detalle })
    }

    await MovimientoPunto.create({
      idUsuario,
      idEntrega: entrega.idEntrega,
      tipoMovimiento: 'ganados',
      puntos: puntosTotales,
      descripcion: `Puntos ganados por entrega #${entrega.idEntrega}`,
      fechaMovimiento: DateTime.now(),
      fechaCaducidad: fechaVencimientoPuntos ? DateTime.fromISO(fechaVencimientoPuntos) : null,
    })

    const usuarioObj = await Usuario.findOrFail(idUsuario)
    usuarioObj.puntosTotales = (usuarioObj.puntosTotales ?? 0) + puntosTotales
    await usuarioObj.save()

    await Notificacion.create({
      idUsuario: idUsuario,
      titulo: 'Entrega registrada',
      mensaje: `Tu entrega #${entrega.idEntrega} fue registrada. Peso: ${pesoTotal}kg, Puntos: ${puntosTotales}pts.`,
      leida: false,
      tipo: 'entrega',
    })

    WsService.emitToUsuario(idUsuario, 'nueva_entrega', {
      idEntrega: entrega.idEntrega,
      pesoTotal,
      puntosTotales,
    })

    WsService.emitToUsuario(idUsuario, 'puntos_actualizados', {
      puntosTotales: usuarioObj.puntosTotales,
    })

    return response.created({
      mensaje: 'Entrega registrada correctamente',
      idEntrega: entrega.idEntrega,
    })
  }

  async actualizarEstado({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_punto', punto.idPunto)
      .firstOrFail()

    const { idEstadoEntrega } = request.only(['idEstadoEntrega'])
    entrega.idEstadoEntrega = idEstadoEntrega
    await entrega.save()

    const estadoEntrega = await EstadoEntrega.find(idEstadoEntrega)
    const nombreEstado = estadoEntrega?.nombre ?? 'actualizado'

    await Notificacion.create({
      idUsuario: entrega.idUsuario,
      titulo: 'Estado de entrega actualizado',
      mensaje: `Tu entrega #${entrega.idEntrega} ha cambiado a "${nombreEstado}".`,
      leida: false,
      tipo: 'entrega',
      idReferencia: entrega.idEntrega,
    })

    WsService.emitToUsuario(entrega.idUsuario, 'nueva_entrega', {
      idEntrega: entrega.idEntrega,
      estado: nombreEstado,
      idEstadoEntrega,
      pesoTotal: entrega.pesoTotal,
      puntosTotales: entrega.puntosTotales,
    })

    return response.ok({
      mensaje: 'Estado de entrega actualizado correctamente',
      entrega,
    })
  }

  async comprobante({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) {
      return response.notFound({ mensaje })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_punto', punto.idPunto)
      .preload('usuario')
      .preload('puntoReciclaje')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()

    return response.ok({
      comprobante: {
        idEntrega: entrega.idEntrega,
        fechaEntrega: entrega.fechaEntrega,
        usuario: {
          idUsuario: entrega.usuario.idUsuario,
          nombre: entrega.usuario.nombre,
          correo: entrega.usuario.correo,
        },
        puntoReciclaje: {
          nombre: entrega.puntoReciclaje.nombre,
          direccion: entrega.puntoReciclaje.direccion,
        },
        materiales: entrega.detalles.map((d) => ({
          nombre: d.material.nombre,
          peso: d.peso,
          puntosGenerados: d.puntosGenerados,
        })),
        pesoTotal: entrega.pesoTotal,
        puntosTotales: entrega.puntosTotales,
        observacion: entrega.observacion,
      },
    })
  }
}
