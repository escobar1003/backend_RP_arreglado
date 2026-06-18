import type { HttpContext } from '@adonisjs/core/http'
import Aliado from '#models/aliado'

export default class MaterialesController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    if (!usuario.idAliado) {
      return response.badRequest({ mensaje: 'No tienes un supermercado asignado' })
    }

    const aliado = await Aliado.findOrFail(usuario.idAliado)
    await aliado.load('puntosReciclaje')

    const materialesSet = new Set<string>()
    for (const punto of aliado.puntosReciclaje) {
      await punto.load('materiales')
      for (const mat of punto.materiales) {
        materialesSet.add(JSON.stringify(mat))
      }
    }

    const materiales = Array.from(materialesSet).map(m => JSON.parse(m) as Record<string, unknown>)
    return response.ok({ materiales })
  }
}
