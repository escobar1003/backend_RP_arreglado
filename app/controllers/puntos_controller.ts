import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import TransaccionPunto from '#models/transaccion_punto'

export default class PuntosController {
  
  public async asignar({ request, response }: HttpContext) {
    const { idUsuario, tipoMaterial, cantidad } = request.only(['idUsuario', 'tipoMaterial', 'cantidad'])

    // 1. Lógica de cálculo (SCRUM-506)
    const tablaPuntos: Record<string, number> = {
      vidrio: 10,
      plastico: 8,
      metal: 12,
      papel: 4,
      carton: 5
    }

    const puntosPorUnidad = tablaPuntos[tipoMaterial.toLowerCase()] || 0
    const puntosAGanar = puntosPorUnidad * cantidad

    if (puntosAGanar === 0) {
      return response.badRequest({ message: 'Material no válido o cantidad insuficiente' })
    }

    try {
      // 2. Buscar al usuario
      const usuario = await Usuario.findOrFail(idUsuario)

      // 3. Crear la transacción (SCRUM-507)
      await TransaccionPunto.create({
        idUsuario: usuario.idUsuario,
        cantidadPuntos: puntosAGanar,
        tipoMaterial: tipoMaterial,
        descripcion: `Reciclaje de ${cantidad} unidades/kg de ${tipoMaterial}`
      })

      // 4. Actualizar el saldo total del usuario (SCRUM-511)
      usuario.puntosTotales += puntosAGanar
      await usuario.save()

            return response.ok({
        message: 'Puntos asignados correctamente',
        puntosGanados: puntosAGanar,
        nuevoSaldo: usuario.puntosTotales
      })

    } catch (error: any) {
      return response.internalServerError({
        message: 'Error al procesar los puntos',
        error: error.message
      })
    }
  }
}
