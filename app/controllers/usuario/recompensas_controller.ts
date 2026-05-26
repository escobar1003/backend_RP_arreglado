import type { HttpContext } from '@adonisjs/core/http'
import Recompensa from '#models/recompensa'

export default class RecompensasController {
  async index({ response }: HttpContext) {
    const recompensas = await Recompensa.query()
      .where('id_estado_recompensa', 1) // solo activas
      .preload('tipoRecompensa')
      .preload('aliado')
      .orderBy('nombre', 'asc')

    return response.ok({
      recompensas: recompensas.map(r => ({
        idRecompensa: r.idRecompensa,
        nombre: r.nombre,
        descripcion: r.descripcion,
        puntosRequeridos: r.puntosRequeridos,
        stock: r.stock,
        fechaInicio: r.fechaInicio,
        fechaFin: r.fechaFin,
        tipoRecompensa: r.tipoRecompensa?.nombre ?? null,
        aliado: r.aliado?.nombre ?? null,
      }))
    })
  }
}