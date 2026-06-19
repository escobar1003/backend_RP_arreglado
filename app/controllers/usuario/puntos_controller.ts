import type { HttpContext } from '@adonisjs/core/http'
import MovimientoPunto from '#models/movimiento_punto'
import { DateTime } from 'luxon'


export default class PuntosController {
  async resumen({ auth, response }: HttpContext) {
    const ahora = DateTime.now()
    const movimientos = await MovimientoPunto.query()
      .where('id_usuario', auth.user!.idUsuario)
      .orderBy('fecha_movimiento', 'desc')

    const ganados = movimientos
      .filter(
        (m) => m.tipoMovimiento === 'ganados' && (!m.fechaCaducidad || m.fechaCaducidad > ahora)
      )
      .reduce((sum, m) => sum + m.puntos, 0)

    const descontados = movimientos
      .filter((m) => m.tipoMovimiento === 'descontados')
      .reduce((sum, m) => sum + m.puntos, 0)

    const ajuste = movimientos
      .filter(
        (m) => m.tipoMovimiento === 'ajuste' && (!m.fechaCaducidad || m.fechaCaducidad > ahora)
      )
      .reduce((sum, m) => sum + m.puntos, 0)

    const saldo = ganados - descontados + ajuste

    return response.ok({
      puntos: saldo,
      saldo,
      ganados,
      descontados,
      movimientos,
    })
  }

  async historial({ auth, response }: HttpContext) {
    const movimientos = await MovimientoPunto.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('entrega')
      .orderBy('fecha_movimiento', 'desc')

    return response.ok({ movimientos })
  }

  // 👇 ESTE ES EL MÉTODO QUE DETECTABA EL COMPILADOR CON EL ERROR EN LA LÍNEA 49 👇
  async guardar({ request, response }: HttpContext) {
    try {
      const data = request.only(['id_usuario', 'puntos', 'tipo_movimiento', 'motivo'])
      const movimiento = await MovimientoPunto.create(data)
      return response.created({ movimiento })
    } catch (error: any) {
      // El ": any" soluciona el fallo de TypeScript en producción
      return response.internalServerError({
        message: 'Error al procesar los puntos',
        error: error.message,
      })
    }
  }
}
