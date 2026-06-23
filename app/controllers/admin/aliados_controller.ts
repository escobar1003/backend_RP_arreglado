import type { HttpContext } from '@adonisjs/core/http'
import Aliado from '#models/aliado'
import PuntoReciclaje from '#models/punto_reciclaje'
import { crearAliadoValidator, actualizarAliadoValidator } from '#validators/admin/aliado'
import { ApiBody, ApiResponse, ApiParam } from '@foadonis/openapi/decorators'

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

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', minLength: 2, maxLength: 100, description: 'Nombre del supermercado' },
        tipoNegocio: { type: 'string', maxLength: 50, description: 'Tipo de negocio' },
        descripcion: { type: 'string', maxLength: 255, description: 'Descripción' },
        direccion: { type: 'string', maxLength: 150, description: 'Dirección' },
        telefono: { type: 'string', maxLength: 20, description: 'Teléfono' },
        correo: { type: 'string', format: 'email', description: 'Correo de contacto' },
        comision: { type: 'number', minimum: 0, maximum: 100, description: 'Comisión %' },
        latitud: { type: 'number', description: 'Latitud (-90 a 90)' },
        longitud: { type: 'number', description: 'Longitud (-180 a 180)' },
        materiales: { type: 'array', items: { type: 'number' }, description: 'IDs de materiales: 1=Plástico, 2=Papel, 3=Cartón, 4=Vidrio' },
      },
      required: ['nombre'],
    },
  })
  @ApiResponse({ status: 201, description: 'Aliado creado correctamente' })
  @ApiResponse({ status: 422, description: 'Error de validación' })
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
    const { latitud, longitud } = datos
    const { latitud: _l, longitud: _ll, ...datosAliado } = datos
    aliado.merge(datosAliado)
    await aliado.save()
    if (latitud !== undefined || longitud !== undefined) {
      await aliado.load('puntosReciclaje')
      const punto = aliado.puntosReciclaje[0]
      if (punto) {
        punto.latitud = latitud ?? punto.latitud
        punto.longitud = longitud ?? punto.longitud
        await punto.save()
      }
    }
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

  @ApiParam({ name: 'id', schema: { type: 'number' }, description: 'ID del aliado' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['materiales'],
      properties: {
        materiales: { type: 'array', items: { type: 'number' }, description: 'IDs de materiales: 1=Plástico, 2=Papel, 3=Cartón, 4=Vidrio' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Materiales sincronizados correctamente' })
  async sincronizarMateriales({ params, request, response }: HttpContext) {
    const { materiales: materialIds } = request.only(['materiales'])
    const aliado = await Aliado.findOrFail(params.id)
    await aliado.load('puntosReciclaje')
    let punto = aliado.puntosReciclaje[0]
    if (!punto) return response.notFound({ mensaje: 'Punto de reciclaje no encontrado' })
    await punto.related('materiales').sync(materialIds ?? [])
    return response.ok({ mensaje: 'Materiales sincronizados correctamente' })
  }

  async listaPublica({ response }: HttpContext) {
    const aliados = await Aliado.query()
      .preload('estadoAliado')
      .orderBy('nombre', 'asc')
    return response.ok({ aliados })
  }
}