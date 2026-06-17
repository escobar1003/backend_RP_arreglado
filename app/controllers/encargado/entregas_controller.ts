import type { HttpContext } from '@adonisjs/core/http'
import Entrega from '#models/entrega'
import PuntoReciclaje from '#models/punto_reciclaje'
import Notificacion from '#models/notificacion'
import { DateTime } from 'luxon'

export default class EntregasController {
  async index({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const query = Entrega.query()
      .where('id_punto', punto.idPunto)
      .preload('puntoReciclaje', (q) => q.preload('aliado'))
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .orderBy('fecha_entrega', 'desc')

    // Filtros por URL
    const { supermercado_id, usuario_id, encargado_id } = request.qs()

    if (supermercado_id) {
      query.whereHas('puntoReciclaje', (q) => {
        q.where('id_aliado', supermercado_id)
      })
    }

    if (usuario_id) {
      query.where('id_usuario', usuario_id)
    }

    if (encargado_id) {
      query.where('id_punto', punto.idPunto)
    }

    const entregas = await query

    return response.ok({
      total: entregas.length,
      entregas,
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_punto', punto.idPunto)
      .preload('puntoReciclaje', (q) => q.preload('aliado'))
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()

    return response.ok({ entrega })
  }
  async store({ auth, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
    .where('id_encargado', usuario.idUsuario)
    .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
      }

  const { idUsuario, materiales, observacion } = request.only(['idUsuario', 'materiales', 'observacion'])
  // materiales: [{ idMaterial: 1, peso: 2.5 }, ...]

  if (!idUsuario || !materiales || !Array.isArray(materiales) || materiales.length === 0) {
    return response.badRequest({ mensaje: 'idUsuario y materiales son obligatorios' })
  }

  // Cargar materiales para calcular puntos
  const Material = (await import('#models/material')).default
  const ids = materiales.map((m: any) => m.idMaterial)
  const materialesDb = await Material.query().whereIn('id_material', ids)

  // Calcular peso total y puntos totales
  let pesoTotal = 0
  let puntosTotales = 0

  const detalles = materiales.map((m: any) => {
    const mat = materialesDb.find((db) => db.idMaterial === m.idMaterial)
    if (!mat) throw new Error(`Material ${m.idMaterial} no encontrado`)

    const puntosGenerados = Math.round(m.peso * mat.puntosPorKg)
    pesoTotal += m.peso
    puntosTotales += puntosGenerados

    return {
      idMaterial: m.idMaterial,
      peso: m.peso,
      puntosGenerados,
    }
  })

  // Crear entrega
  const entrega = await Entrega.create({
    idUsuario,
    idPunto: punto.idPunto,
    idEstadoEntrega: 1, // pendiente
    fechaEntrega: DateTime.now(),
    pesoTotal,
    puntosTotales,
    observacion: observacion ?? null,
  })

  // Crear detalles
  const DetalleEntrega = (await import('#models/detalle_entrega')).default
  await DetalleEntrega.createMany(detalles.map((d) => ({ ...d, idEntrega: entrega.idEntrega })))

  // Actualizar puntos del usuario
  const Usuario = (await import('#models/usuario')).default
  const usuarioObj = await Usuario.findOrFail(idUsuario)
  usuarioObj.puntosTotales = (usuarioObj.puntosTotales ?? 0) + puntosTotales
  await usuarioObj.save()

  // Notificar al usuario
  await Notificacion.create({
    idUsuario: idUsuario,
    titulo: 'Nueva entrega registrada',
    mensaje: `Se registró tu entrega de ${pesoTotal}kg por ${puntosTotales} puntos en ${punto.nombre}.`,
    leida: false,
    tipo: 'entrega',
    idReferencia: entrega.idEntrega,
  })

  // registro de entrega con detalle para comprobante
  await entrega.load('detalles', (q) => q.preload('material'))
  await entrega.load('estadoEntrega')
  await entrega.load('usuario')
  await entrega.load('puntoReciclaje')

  return response.created({
    mensaje: 'Entrega registrada exitosamente',
    comprobante: {
      idEntrega: entrega.idEntrega,
      fechaEntrega: entrega.fechaEntrega,
      estado: entrega.estadoEntrega,
      usuario: {
        idUsuario: entrega.usuario.idUsuario,
        nombre: entrega.usuario.nombre,
        apellido: entrega.usuario.apellido,
        correo: entrega.usuario.correo,
        puntosAcumulados: usuarioObj.puntosTotales,
      },
      puntoReciclaje: {
        nombre: entrega.puntoReciclaje.nombre,
        direccion: entrega.puntoReciclaje.direccion,
      },
      materiales: entrega.detalles.map((d) => ({
        nombre: d.material.nombre,
        peso: d.peso,
        puntosGenerados: d.puntosGenerados,
      })),
      pesoTotal: entrega.pesoTotal,
      puntosTotales: entrega.puntosTotales,
      observacion: entrega.observacion,
    },
  })
}

  async actualizarEstado({ auth, params, request, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_punto', punto.idPunto)
      .firstOrFail()

    const { idEstadoEntrega } = request.only(['idEstadoEntrega'])
    entrega.idEstadoEntrega = idEstadoEntrega
    await entrega.save()

    // Generar notificación al usuario
    await Notificacion.create({
      idUsuario: entrega.idUsuario,
      titulo: 'Estado de entrega actualizado',
      mensaje: `Tu entrega #${entrega.idEntrega} ha cambiado de estado.`,
      leida: false,
      tipo: 'entrega',
      idReferencia: entrega.idEntrega,
    })

    return response.ok({
      mensaje: 'Estado de entrega actualizado correctamente',
      entrega,
    })
  }
  async comprobante({ auth, params, response }: HttpContext) {
    const usuario = auth.user!

    const punto = await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!punto) {
      return response.notFound({ mensaje: 'No tienes un punto de reciclaje asignado' })
    }

    const entrega = await Entrega.query()
      .where('id_entrega', params.id)
      .where('id_punto', punto.idPunto)
      .preload('puntoReciclaje')
      .preload('usuario')
      .preload('estadoEntrega')
      .preload('detalles', (q) => q.preload('material'))
      .firstOrFail()

    return response.ok({
      comprobante: {
        idEntrega: entrega.idEntrega,
        fechaEntrega: entrega.fechaEntrega,
        estado: entrega.estadoEntrega,
        usuario: {
          idUsuario: entrega.usuario.idUsuario,
          nombre: entrega.usuario.nombre,
          apellido: entrega.usuario.apellido,
          correo: entrega.usuario.correo,
          puntosAcumulados: entrega.usuario.puntosTotales,
        },
        puntoReciclaje: {
          nombre: entrega.puntoReciclaje.nombre,
          direccion: entrega.puntoReciclaje.direccion,
        },
        materiales: entrega.detalles.map((d) => ({
          nombre: d.material.nombre,
          peso: d.peso,
          puntosGenerados: d.puntosGenerados,
        })),
        pesoTotal: entrega.pesoTotal,
        puntosTotales: entrega.puntosTotales,
        observacion: entrega.observacion,
      },
    })
  }
}