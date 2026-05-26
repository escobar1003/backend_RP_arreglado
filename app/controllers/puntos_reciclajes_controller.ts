import type { HttpContext } from '@adonisjs/core/http'
import PuntoReciclaje from '#models/punto_reciclaje'

export default class PuntosReciclajeController {
  async index({ response }: HttpContext) {
    const puntos = await PuntoReciclaje.query()
      .where('id_estado_punto', 1)
      .preload('aliado')
      .preload('materiales')
      .orderBy('nombre', 'asc')

    return response.ok({
      total: puntos.length,
      puntos: puntos.map(p => ({
        id: p.idPunto,
        nombre: p.nombre,
        direccion: p.direccion,
        latitud: p.latitud,
        longitud: p.longitud,
        horario: p.horario,
        aliado: {
          nombre: p.aliado.nombre,
        },
        materiales: p.materiales.map(m => ({
          id: m.idMaterial,
          nombre: m.nombre,
          puntosPorKg: m.puntosPorKg,
        }))
      }))
    })
  }

  async show({ params, response }: HttpContext) {
    const punto = await PuntoReciclaje.query()
      .where('id_punto', params.id)
      .preload('aliado')
      .preload('materiales')
      .firstOrFail()

    return response.ok({
      id: punto.idPunto,
      nombre: punto.nombre,
      direccion: punto.direccion,
      latitud: punto.latitud,
      longitud: punto.longitud,
      horario: punto.horario,
      aliado: {
        nombre: punto.aliado.nombre,
      },
      materiales: punto.materiales.map(m => ({
        id: m.idMaterial,
        nombre: m.nombre,
        puntosPorKg: m.puntosPorKg,
      }))
    })
  }
}