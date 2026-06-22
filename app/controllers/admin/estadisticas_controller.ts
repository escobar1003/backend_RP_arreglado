import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class EstadisticasController {
  async index({ response }: HttpContext) {
    // Total usuarios (solo rol usuario = id_rol 3)
    const [{ total: totalUsuarios }] = await db.from('usuarios').where('id_rol', 3).count('* as total')

    // Total entregas y kg
    const entregas = await db.from('entregas')
      .join('detalle_entregas', 'entregas.id_entrega', 'detalle_entregas.id_entrega')
      .sum('detalle_entregas.peso as totalKg')
      .count('entregas.id_entrega as totalEntregas')
      .first()

    // Total puntos activos
    const [{ total: totalPuntos }] = await db.from('movimientos_puntos')
      .where('tipo', 'suma')
      .sum('cantidad as total')

    // Entregas últimos 7 días agrupadas por día
    const hace7dias = DateTime.now().minus({ days: 7 }).toISODate()
    const porDia = await db.from('entregas')
      .join('detalle_entregas', 'entregas.id_entrega', 'detalle_entregas.id_entrega')
      .where('entregas.fecha_entrega', '>=', hace7dias)
      .groupByRaw('DATE(entregas.fecha_entrega)')
      .selectRaw('DATE(entregas.fecha_entrega) as fecha, SUM(detalle_entregas.peso) as kg')
      .orderBy('fecha', 'asc')

    // Usuarios nuevos vs recurrentes (nuevos = registrados este mes)
    const inicioMes = DateTime.now().startOf('month').toISODate()
    const [{ total: nuevos }] = await db.from('usuarios')
      .where('id_rol', 3)
      .where('fecha_registro', '>=', inicioMes)
      .count('* as total')

    return response.ok({
      totalUsuarios: Number(totalUsuarios),
      totalKg: Number(entregas?.totalKg ?? 0),
      totalEntregas: Number(entregas?.totalEntregas ?? 0),
      totalPuntos: Number(totalPuntos ?? 0),
      porDia,
      usuariosNuevos: Number(nuevos),
    })
  }
}