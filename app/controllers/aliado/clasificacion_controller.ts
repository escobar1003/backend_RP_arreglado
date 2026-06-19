import type { HttpContext } from '@adonisjs/core/http'
import ClasificacionIa from '#models/clasificacion_ia'
import Aliado from '#models/aliado'
import { DateTime } from 'luxon'

export default class ClasificacionController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!

    const aliado =
      usuario.idRol === 1
        ? null
        : await Aliado.query().where('correo', usuario.correo).firstOrFail()

    // Ver clasificaciones de los usuarios en los puntos de este aliado
    const clasificaciones = await ClasificacionIa.query()
      .if(aliado, (query) => {
        query.whereHas('entrega', (q) => {
          q.whereHas('puntoReciclaje', (q2) => {
            q2.where('id_aliado', aliado!.idAliado)
          })
        })
      })
      .preload('usuario')
      .preload('material')
      .preload('entrega')
      .orderBy('fecha_clasificacion', 'desc')

    return response.ok({ clasificaciones })
  }

  async store({ auth, request, response }: HttpContext) {
    const { idMaterial, idEntrega, imagen, confianza, canecaRecomendada, recomendacion } =
      request.only([
        'idMaterial',
        'idEntrega',
        'imagen',
        'confianza',
        'canecaRecomendada',
        'recomendacion',
      ])

    const clasificacion = await ClasificacionIa.create({
      idUsuario: auth.user!.idUsuario,
      idMaterial,
      idEntrega: idEntrega ?? null,
      imagen: imagen ?? null,
      confianza: confianza ?? null,
      canecaRecomendada: canecaRecomendada ?? null,
      recomendacion: recomendacion ?? null,
      fechaClasificacion: DateTime.now(),
    })

    await clasificacion.load('material')

    return response.created({
      mensaje: 'Clasificación registrada correctamente',
      clasificacion,
    })
  }
}
