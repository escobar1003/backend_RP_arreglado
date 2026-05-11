import type { HttpContext } from '@adonisjs/core/http'
import Encargado from '#models/encargado'
import hash from '@adonisjs/core/services/hash'
import { crearEncargadoValidator, actualizarEncargadoValidator } from '#validators/admin/encargado'

export default class EncargadosController {

  async index({ response }: HttpContext) {
    const encargados = await Encargado.query().orderBy('id_encargado', 'desc')
    return response.ok({ encargados })
  }

  async show({ params, response }: HttpContext) {
    const encargado = await Encargado.findOrFail(params.id)
    return response.ok({ encargado })
  }

  async store({ request, response }: HttpContext) {
    const datos = await request.validateUsing(crearEncargadoValidator)

    const existe = await Encargado.findBy('correo', datos.correo)
    if (existe) {
      return response.conflict({ mensaje: 'El correo ya está registrado' })
    }

    const encargado = await Encargado.create({
      nombre:        datos.nombre,
      correo:        datos.correo,
      password:      await hash.make(datos.password ?? 'Temporal123!'),
      telefono:      datos.telefono      ?? null,
      zona:          datos.zona          ?? null,
      puntoAsignado: datos.puntoAsignado ?? null,
      idEstado:      1,
    })

    return response.created({ mensaje: 'Encargado creado correctamente', encargado })
  }

  async update({ params, request, response }: HttpContext) {
    const encargado = await Encargado.findOrFail(params.id)
    const datos = await request.validateUsing(actualizarEncargadoValidator)
    encargado.merge(datos)
    await encargado.save()
    return response.ok({ mensaje: 'Encargado actualizado correctamente', encargado })
  }

  async destroy({ params, response }: HttpContext) {
    const encargado = await Encargado.findOrFail(params.id)
    await encargado.delete()
    return response.ok({ mensaje: 'Encargado eliminado correctamente' })
  }
}