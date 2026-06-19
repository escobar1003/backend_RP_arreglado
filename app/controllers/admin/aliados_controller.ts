import type { HttpContext } from '@adonisjs/core/http'
import Aliado from '#models/aliado'
import PuntoReciclaje from '#models/punto_reciclaje'
import { crearAliadoValidator, actualizarAliadoValidator } from '#validators/admin/aliado'

export default class AliadosController {
  async index({ auth, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Aliado.query().preload('estadoAliado').preload('puntosReciclaje')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const aliados = await query
    return response.ok({ aliados })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!
    await usuario.load('rol')

    const query = Aliado.query()
      .where('id_aliado', params.id)
      .preload('estadoAliado')
      .preload('puntosReciclaje')

    if (usuario.rol.nombre === 'admin' && usuario.idAliado) {
      query.where('id_aliado', usuario.idAliado)
    }

    const aliado = await query.firstOrFail()
    return response.ok({ aliado })
  }

  async store({ request, response }: HttpContext) {
    console.log('=== DATOS CRUDOS ===', request.all())
    const datos = await request.validateUsing(crearAliadoValidator)
    console.log('=== DATOS VALIDADOS ===', datos)

    const { latitud, longitud, ubicacionDireccion, ...datosSinCoordenadas } = datos as any
    console.log('=== COORDENADAS ===', { latitud, longitud, ubicacionDireccion })

    const aliado = await Aliado.create({ ...datosSinCoordenadas, idEstadoAliado: 1 })

    await PuntoReciclaje.create({
      idAliado: aliado.idAliado,
      idEstadoPunto: 1,
      nombre: `Punto principal - ${aliado.nombre}`,
      direccion: ubicacionDireccion ?? null,
      latitud: latitud ?? null,
      longitud: longitud ?? null,
    })

    return response.created({ mensaje: 'Aliado creado correctamente', aliado })
  }

  async update({ params, request, response }: HttpContext) {
    const aliado = await Aliado.findOrFail(params.id)
    const datos = await request.validateUsing(actualizarAliadoValidator)
    aliado.merge(datos)
    await aliado.save()
    return response.ok({ mensaje: 'Aliado actualizado correctamente', aliado })
  }

  async destroy({ params, response }: HttpContext) {
    const aliado = await Aliado.findOrFail(params.id)
    await aliado.delete()
    return response.ok({ mensaje: 'Aliado eliminado correctamente' })
  }

  async materiales({ params, response }: HttpContext) {
    const aliado = await Aliado.findOrFail(params.id)
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

  async sincronizarMateriales({ params, request, response }: HttpContext) {
    const { materiales: materialIds } = request.only(['materiales'])
    const aliado = await Aliado.findOrFail(params.id)
    await aliado.load('puntosReciclaje')
    let punto = aliado.puntosReciclaje[0]
    if (!punto) return response.notFound({ mensaje: 'Punto de reciclaje no encontrado' })
    await punto.related('materiales').sync(materialIds ?? [])
    return response.ok({ mensaje: 'Materiales sincronizados correctamente' })
  }
}