import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { asegurarPuntoEncargado } from '#services/encargado_punto'

export default class ReportesController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!
    const { punto, mensaje } = await asegurarPuntoEncargado(usuario)
    if (!punto) return response.notFound({ mensaje })

    const periodo = request.qs().periodo ?? 'Este mes'

    // Calcular rango de fechas según período
    let desde: DateTime
    const hasta = DateTime.now()

    if (periodo === 'Esta semana') {
      desde = hasta.startOf('week')
    } else if (periodo === 'Este año') {
      desde = hasta.startOf('year')
    } else {
      desde = hasta.startOf('month')
    }

    const desdeStr = desde.toISODate()
    const hastaStr = hasta.toISODate()
    const idPunto = punto.idPunto

    // KPIs principales
    const kgResult = await db.from('entregas')
      .join('detalle_entregas', 'entregas.id_entrega', 'detalle_entregas.id_entrega')
      .where('entregas.id_punto', idPunto)
      .whereBetween('entregas.fecha_entrega', [desdeStr, hastaStr])
      .sum('detalle_entregas.peso as totalKg')
      .count('entregas.id_entrega as totalEntregas')
      .first()

    const ptsResult = await db.from('movimientos_puntos')
      .join('entregas', 'movimientos_puntos.id_entrega', 'entregas.id_entrega')
      .where('entregas.id_punto', idPunto)
      .where('movimientos_puntos.tipo', 'suma')
      .whereBetween('entregas.fecha_entrega', [desdeStr, hastaStr])
      .sum('movimientos_puntos.cantidad as total')
      .first()

    const canjesResult = await db.from('canjes')
      .join('usuarios', 'canjes.id_usuario', 'usuarios.id_usuario')
      .where('usuarios.id_aliado', usuario.idAliado!)
      .whereBetween('canjes.created_at', [desdeStr, hastaStr])
      .count('* as total')
      .first()

    const usuariosResult = await db.from('entregas')
      .where('id_punto', idPunto)
      .whereBetween('fecha_entrega', [desdeStr, hastaStr])
      .countDistinct('id_usuario as total')
      .first()

    // Materiales por mes (últimos 5 meses)
    const materialesMes = await db.from('entregas')
      .join('detalle_entregas', 'entregas.id_entrega', 'detalle_entregas.id_entrega')
      .where('entregas.id_punto', idPunto)
      .where('entregas.fecha_entrega', '>=', DateTime.now().minus({ months: 5 }).toISODate())
      .groupByRaw('DATE_FORMAT(entregas.fecha_entrega, "%Y-%m")')
      .selectRaw('DATE_FORMAT(entregas.fecha_entrega, "%b") as mes, SUM(detalle_entregas.peso) as kg')
      .orderByRaw('MIN(entregas.fecha_entrega) asc')

    // Canjes por recompensa
    const canjesRecompensa = await db.from('canjes')
      .join('recompensas', 'canjes.id_recompensa', 'recompensas.id_recompensa')
      .join('usuarios', 'canjes.id_usuario', 'usuarios.id_usuario')
      .where('usuarios.id_aliado', usuario.idAliado!)
      .whereBetween('canjes.created_at', [desdeStr, hastaStr])
      .groupBy('recompensas.id_recompensa', 'recompensas.nombre')
      .select('recompensas.nombre as recompensa')
      .count('* as cantidad')
      .orderBy('cantidad', 'desc')
      .limit(5)

    // Ranking usuarios
    const ranking = await db.from('entregas')
      .join('usuarios', 'entregas.id_usuario', 'usuarios.id_usuario')
      .where('entregas.id_punto', idPunto)
      .whereBetween('entregas.fecha_entrega', [desdeStr, hastaStr])
      .groupBy('usuarios.id_usuario', 'usuarios.nombre')
      .select('usuarios.nombre')
      .count('entregas.id_entrega as entregas')
      .sum('0 as pts')
      .orderBy('entregas', 'desc')
      .limit(10)

    const rankingConDatos = ranking.map((u: any) => ({
      nombre: u.nombre,
      iniciales: u.nombre.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
      entregas: Number(u.entregas),
      pts: 0,
      canjes: 0,
    }))

    // Puntos
    const totalEntregados = Number(ptsResult?.total ?? 0)
    const totalCanjeados = await db.from('movimientos_puntos')
      .join('entregas', 'movimientos_puntos.id_entrega', 'entregas.id_entrega')
      .where('entregas.id_punto', idPunto)
      .where('movimientos_puntos.tipo', 'resta')
      .whereBetween('entregas.fecha_entrega', [desdeStr, hastaStr])
      .sum('movimientos_puntos.cantidad as total')
      .first()

    const canjeados = Number(totalCanjeados?.total ?? 0)
    const disponibles = totalEntregados - canjeados
    const tasaCanje = totalEntregados > 0 ? Math.round((canjeados / totalEntregados) * 100) : 0

    return response.ok({
      kpis: {
        totalKg: Number(kgResult?.totalKg ?? 0),
        totalPtsEntregados: totalEntregados,
        totalCanjes: Number(canjesResult?.total ?? 0),
        usuariosActivos: Number(usuariosResult?.total ?? 0),
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