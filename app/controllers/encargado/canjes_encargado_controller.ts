import type { HttpContext } from '@adonisjs/core/http'
import Canje from '#models/canje'
import PuntoReciclaje from '#models/punto_reciclaje'
import Notificacion from '#models/notificacion'

export default class CanjesEncargadoController {
  /**
   * GET /api/encargado/canjes
   * Lista los canjes de usuarios asociados al punto del encargado
   */
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
    .where('id_encargado', usuario.idUsuario)
    .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const { estado, usuario_id } = request.qs()

  // Canjes de usuarios que han hecho entregas en este punto
    const query = Canje.query()
    .whereIn('id_usuario', (subquery) => {
      subquery.from('entregas').select('id_usuario').where('id_punto', punto.idPunto)
    })
    .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo'))
    .preload('recompensa')
    .preload('estadoCanje')
    .orderBy('fecha_canje', 'desc')

    if (estado) query.where('id_estado_canje', estado)
    if (usuario_id) query.where('id_usuario', usuario_id)

    const canjes = await query

    return response.ok({ total: canjes.length, canjes })
  }

  /**
   * GET /api/encargado/canjes/:id
   * Detalle de un canje
   */
  async show({ params, response }: HttpContext) {
    const canje = await Canje.query()
      .where('id_canje', params.id)
      .preload('usuario', (q) => q.select('id_usuario', 'nombre', 'correo'))
      .preload('recompensa')
      .preload('estadoCanje')
      .firstOrFail()

    return response.ok({ canje })
  }

  /**
   * PUT /api/encargado/canjes/:id/validar
   * El encargado valida (aprueba o rechaza) un canje por código físico
   * Body: { idEstadoCanje: 2 (canjeado) | 3 (vencido), codigoCanje }
   */
  async validar({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const canje = await Canje.query()
      .where('id_canje', params.id)
      .preload('recompensa')
      .firstOrFail()

    const { idEstadoCanje, codigoCanje } = request.only(['idEstadoCanje', 'codigoCanje'])

    if (codigoCanje && canje.codigoCanje !== codigoCanje) {
      return response.badRequest({ mensaje: 'El código de canje no coincide' })
    }

    const estadosValidos = [2, 3] // canjeado, vencido
    if (!estadosValidos.includes(idEstadoCanje)) {
      return response.badRequest({ mensaje: 'Estado inválido. Use 2 (canjeado) o 3 (vencido)' })
    }

    canje.idEstadoCanje = idEstadoCanje
    await canje.save()

    await Notificacion.create({
      idUsuario: canje.idUsuario,
      titulo: 'Tu canje fue procesado',
      mensaje: `Tu canje de "${canje.recompensa.nombre}" fue ${idEstadoCanje === 2 ? 'canjeado exitosamente' : 'marcado como vencido'}.`,
      leida: false,
      tipo: 'canje',
      idReferencia: canje.idCanje,
    })

    return response.ok({ mensaje: 'Canje actualizado correctamente', canje })
  }
}