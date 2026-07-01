import type { HttpContext } from '@adonisjs/core/http'
import PuntoReciclaje from '#models/punto_reciclaje'
import Aliado from '#models/aliado'

export default class AdminPuntosReciclajesController {
  async store({ params, request, response }: HttpContext) {
    const aliado = await Aliado.findOrFail(params.id)

    const punto = await PuntoReciclaje.create({
      idAliado: aliado.idAliado,
      idEstadoPunto: 1,
      nombre: request.input('nombre'),
      direccion: request.input('direccion'),
      latitud: request.input('latitud'),
      longitud: request.input('longitud'),
      horario: request.input('horario'),
    })

    return response.created({ mensaje: 'Punto de reciclaje creado', punto })
  }

  async update({ params, request, response }: HttpContext) {
    const punto = await PuntoReciclaje.query().where('id_aliado', params.id).firstOrFail()

    punto.merge(request.only(['nombre', 'direccion', 'latitud', 'longitud', 'horario']))
    await punto.save()

    return response.ok({ mensaje: 'Punto de reciclaje actualizado', punto })
  }
}
