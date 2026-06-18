import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'
import Notificacion from '#models/notificacion'
import DetalleEntrega from '#models/detalle_entrega'
import MovimientoPunto from '#models/movimiento_punto'
import Material from '#models/material'
import { DateTime } from 'luxon'

export default class EntregasController {
  async index({ auth, response }: HttpContext) {
    const entregas = await Entrega.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('estadoEntrega')
      .preload('puntoReciclaje')
      .preload('detalles', (q) => q.preload('material'))
      .preload('movimientos')
      .orderBy('fecha_entrega', 'desc')

    const result = entregas.map((e) => {
      const data = e.toJSON()
      const mov = data.movimientos?.find((m: any) => m.fechaCaducidad)
      delete data.movimientos
      data.fechaVencimientoPuntos = mov?.fechaCaducidad ?? null
      return data
    })

    return response.ok({ entregas: result })
  }

  async show({ auth, params, response }: HttpContext) {
    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_usuario', auth.user!.idUsuario)
      .preload('estadoEntrega')
      .preload('puntoReciclaje')
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
    const { idPunto, detalles, observacion, fechaVencimientoPuntos } = request.only([
      'idPunto',
      'detalles',
      'observacion',
      'fechaVencimientoPuntos',
    ])

    // Calcular peso total y puntos totales
    let pesoTotal = 0
    let puntosTotales = 0
    const detallesCalculados: { idMaterial: number; peso: number; puntosGenerados: number }[] = []

    for (const detalle of detalles) {
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

    // Crear entrega
    const entrega = await Entrega.create({
      idUsuario: auth.user!.idUsuario,
      idPunto,
      idEstadoEntrega: 1, // pendiente
      fechaEntrega: DateTime.now(),
      pesoTotal,
      puntosTotales,
      observacion: observacion ?? null,
    })

    // Crear detalles
    for (const detalle of detallesCalculados) {
      await DetalleEntrega.create({ idEntrega: entrega.idEntrega, ...detalle })
    }

    // Registrar movimiento de puntos
    await MovimientoPunto.create({
      idUsuario: auth.user!.idUsuario,
      idEntrega: entrega.idEntrega,
      tipoMovimiento: 'ganados',
      puntos: puntosTotales,
      descripcion: `Puntos ganados por entrega #${entrega.idEntrega}`,
      fechaMovimiento: DateTime.now(),
      fechaCaducidad: fechaVencimientoPuntos ? DateTime.fromISO(fechaVencimientoPuntos) : null,
    })

        // SCRUM-582: Generar notificación al registrar entrega
    await Notificacion.create({
      idUsuario: auth.user!.idUsuario,
      titulo: 'Entrega registrada',
      mensaje: `Tu entrega #${entrega.idEntrega} fue registrada correctamente. Peso total: ${pesoTotal}kg, Puntos ganados: ${puntosTotales}pts.`,
      leida: false,
      tipo: 'entrega',
    })

    return response.created({
      mensaje: 'Entrega registrada correctamente',
      entrega: {
        idEntrega: entrega.idEntrega,
        pesoTotal,
        puntosTotales,
        detalles: detallesCalculados,
      },
    })
  }
}