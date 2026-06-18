import type { HttpContext } from '@adonisjs/core/http'
import MovimientoPunto from '#models/movimiento_punto'
import Notificacion from '#models/notificacion'
import Usuario from '#models/usuario'
import { DateTime } from 'luxon'

export default class PuntosController {
  // SCRUM-584: Corrección de puntos con notificación
  async ajustarPuntos({ params, request, response }: HttpContext) {
    const { puntos, descripcion } = request.only(['puntos', 'descripcion'])

    const usuario = await Usuario.findOrFail(params.idUsuario)

    // Crear movimiento de ajuste
    const movimiento = await MovimientoPunto.create({
      idUsuario: usuario.idUsuario,
      idEntrega: null,
      tipoMovimiento: 'ajuste',
      puntos,
      descripcion: descripcion ?? 'Corrección de puntos por el administrador',
      fechaMovimiento: DateTime.now(),
    })

    // Generar notificación al usuario
    await Notificacion.create({
      idUsuario: usuario.idUsuario,
      titulo: 'Corrección de puntos',
      mensaje: `Tu saldo de puntos fue ajustado en ${puntos > 0 ? '+' : ''}${puntos}pts. Motivo: ${descripcion ?? 'Corrección administrativa'}.`,
      leida: false,
      tipo: 'puntos',
    })

    return response.ok({
      mensaje: 'Puntos ajustados correctamente',
      movimiento,
    })
  }
}