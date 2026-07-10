import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ZonasController {
  async index({ response }: HttpContext) {
    const zonas = await db.from('zonas').orderBy('nombre', 'asc')
    return response.ok({ zonas })
  }
}
