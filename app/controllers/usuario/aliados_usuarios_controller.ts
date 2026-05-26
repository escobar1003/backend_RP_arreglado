import type { HttpContext } from '@adonisjs/core/http'
import Aliado from '#models/aliado'

export default class AliadosUsuarioController {
  async index({ response }: HttpContext) {
    const aliados = await Aliado.query()
      .where('id_estado_aliado', 1)

    return response.ok({
      aliados: aliados.map(a => ({
        idAliado: a.idAliado,
        nombre: a.nombre,
        tipoNegocio: a.tipoNegocio ?? null,
        descripcion: a.descripcion ?? null,
      }))
    })
  }
}