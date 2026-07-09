import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import MovimientoPunto from '#models/movimiento_punto'

export default class ReportesController {
  async index({ request, response }: HttpContext) {
    const periodo = request.qs().periodo ?? 'Este mes'

    let desde: DateTime
    const hasta = DateTime.now()

    if (periodo === 'Esta semana') {
      desde = hasta.startOf('week')
    } else if (periodo === 'Este año') {
      desde = hasta.startOf('year')
    } else {
      desde = hasta.startOf('month')
    }

    const desdeStr = desde.toISODate()!
    const hastaStr = hasta.toISODate()!

    // KPIs principales (global, sin filtro por punto)
    const kgResult = await db.from('entregas')
      .join('detalle_entregas', 'entregas.id_entrega', 'detalle_entregas.id_entrega')
      .whereBetween('entregas.fecha_entrega', [desdeStr, hastaStr])
      .sum('detalle_entregas.peso as totalKg')
      .first()

    const ptsResult = await MovimientoPunto.query()
      .where('tipo_movimiento', 'ganados')
      .whereBetween('fecha_movimiento', [desdeStr, hastaStr + 'T23:59:59'])
      .sum('puntos as total')
      .first()

    const canjesCount = await db.from('canjes')
      .whereBetween('created_at', [desdeStr, hastaStr])
      .count('* as total')
      .first()

    const usuariosActivos = await db.from('entregas')
      .whereBetween('fecha_entrega', [desdeStr, hastaStr])
      .countDistinct('id_usuario as total')
      .first()

    // Materiales por mes (últimos 5 meses, global)
    const materialesMes = await db.from('entregas')
      .join('detalle_entregas', 'entregas.id_entrega', 'detalle_entregas.id_entrega')
      .where('entregas.fecha_entrega', '>=', DateTime.now().minus({ months: 5 }).toISODate())
      .groupByRaw('DATE_FORMAT(entregas.fecha_entrega, "%Y-%m")')
      .select(db.raw('DATE_FORMAT(entregas.fecha_entrega, "%b") as mes, SUM(detalle_entregas.peso) as kg'))
      .orderByRaw('MIN(entregas.fecha_entrega) asc')

    // Canjes por recompensa (global)
    const canjesRecompensa = await db.from('canjes')
      .join('recompensas', 'canjes.id_recompensa', 'recompensas.id_recompensa')
      .whereBetween('canjes.created_at', [desdeStr, hastaStr])
      .groupBy('recompensas.id_recompensa', 'recompensas.nombre')
      .select('recompensas.nombre as recompensa')
      .count('* as cantidad')
      .orderBy('cantidad', 'desc')
      .limit(5)

    // Ranking usuarios (top 10 por entregas en el periodo, con puntos reales)
    const rankingTop = await db.from('entregas')
      .join('usuarios', 'entregas.id_usuario', 'usuarios.id_usuario')
      .whereBetween('entregas.fecha_entrega', [desdeStr, hastaStr])
      .groupBy('usuarios.id_usuario', 'usuarios.nombre')
      .select('usuarios.id_usuario', 'usuarios.nombre')
      .count('entregas.id_entrega as entregas')
      .orderBy('entregas', 'desc')
      .limit(10)

    const idsRanking = rankingTop.map((u: any) => u.id_usuario)
    const ahora = DateTime.now()

    const todosMovimientos = idsRanking.length
      ? await MovimientoPunto.query().whereIn('id_usuario', idsRanking)
      : []

    const ptsPorUsuario = new Map<number, { ganados: number; descontados: number; ajuste: number }>()
    const canjesPorUsuario = new Map<number, number>()

    for (const m of todosMovimientos) {
      if (!ptsPorUsuario.has(m.idUsuario)) {
        ptsPorUsuario.set(m.idUsuario, { ganados: 0, descontados: 0, ajuste: 0 })
      }
      const acc = ptsPorUsuario.get(m.idUsuario)!
      if (m.tipoMovimiento === 'ganados' && (!m.fechaCaducidad || m.fechaCaducidad > ahora)) {
        acc.ganados += m.puntos
      } else if (m.tipoMovimiento === 'descontados') {
        acc.descontados += m.puntos
      } else if (m.tipoMovimiento === 'ajuste' && (!m.fechaCaducidad || m.fechaCaducidad > ahora)) {
        acc.ajuste += m.puntos
      }
    }

    const canjesRanking = idsRanking.length
      ? await db.from('canjes')
          .whereIn('id_usuario', idsRanking)
          .whereBetween('created_at', [desdeStr, hastaStr])
          .groupBy('id_usuario')
          .select('id_usuario')
          .count('* as total')
      : []

    for (const c of canjesRanking) {
      canjesPorUsuario.set(c.id_usuario, Number(c.total))
    }

    const rankingConDatos = rankingTop.map((u: any) => {
      const p = ptsPorUsuario.get(u.id_usuario) || { ganados: 0, descontados: 0, ajuste: 0 }
      return {
        idUsuario: u.id_usuario,
        nombre: u.nombre,
        iniciales: u.nombre.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
        entregas: Number(u.entregas),
        pts: p.ganados - p.descontados + p.ajuste,
        canjes: canjesPorUsuario.get(u.id_usuario) ?? 0,
      }
    })

    // Puntos globales
    const totalEntregados = Number((ptsResult as any)?.$extras?.total ?? (ptsResult as any)?.total ?? 0)
    const totalCanjeados = await MovimientoPunto.query()
      .where('tipo_movimiento', 'descontados')
      .whereBetween('fecha_movimiento', [desdeStr, hastaStr + 'T23:59:59'])
      .sum('puntos as total')
      .first()

    const canjeados = Number((totalCanjeados as any)?.$extras?.total ?? (totalCanjeados as any)?.total ?? 0)
    const disponibles = totalEntregados - canjeados
    const tasaCanje = totalEntregados > 0 ? Math.round((canjeados / totalEntregados) * 100) : 0

    return response.ok({
      kpis: {
        totalKg: Number(kgResult?.totalKg ?? 0),
        totalPtsEntregados: totalEntregados,
        totalCanjes: Number(canjesCount?.total ?? 0),
        usuariosActivos: Number(usuariosActivos?.total ?? 0),
      },
      materialesMes: materialesMes.map((m: any) => ({ mes: m.mes, kg: Number(m.kg) })),
      canjesRecompensa: canjesRecompensa.map((c: any) => ({ recompensa: c.recompensa, cantidad: Number(c.cantidad) })),
      rankingUsuarios: rankingConDatos,
      puntos: {
        entregados: totalEntregados,
        canjeados,
        disponibles,
        tasaCanje,
      },
    })
  }
}
