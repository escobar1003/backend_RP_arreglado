import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

export default class PerfilController {
  async mostrar({ auth, response }: HttpContext) {
    const usuario = await Usuario.query()
      .where('id_usuario', auth.user!.idUsuario)
      .preload('rol')
      .preload('estadoUsuario')
      .firstOrFail()

    // SCRUM-874: Total de entregas
    const { default: Entrega } = await import('#models/entrega')
    const totalEntregas = await Entrega.query()
      .where('id_usuario', usuario.idUsuario)
      .count('* as total')
    const entregas = Number(totalEntregas[0].$extras.total)

    // SCRUM-875: Puntos acumulados
    const { default: MovimientoPunto } = await import('#models/movimiento_punto')
    const movimientos = await MovimientoPunto.query().where('id_usuario', usuario.idUsuario)

    const ganados = movimientos
      .filter((m) => m.tipoMovimiento === 'ganados')
      .reduce((sum, m) => sum + m.puntos, 0)
    const descontados = movimientos
      .filter((m) => m.tipoMovimiento === 'descontados')
      .reduce((sum, m) => sum + m.puntos, 0)
    const ajuste = movimientos
      .filter((m) => m.tipoMovimiento === 'ajuste')
      .reduce((sum, m) => sum + m.puntos, 0)
    const puntosAcumulados = Math.max(0, ganados - descontados + ajuste)

    // SCRUM-876: Total de canjes
    const { default: Canje } = await import('#models/canje')
    const totalCanjesQuery = await Canje.query()
      .where('id_usuario', usuario.idUsuario)
      .count('* as total')
    const totalCanjes = Number(totalCanjesQuery[0].$extras.total)

    // SCRUM-877: Nivel ecológico
    let nivelEcologico = 'Semilla'
    if (puntosAcumulados >= 5000) nivelEcologico = 'Diamante'
    else if (puntosAcumulados >= 2000) nivelEcologico = 'Oro'
    else if (puntosAcumulados >= 1000) nivelEcologico = 'Plata'
    else if (puntosAcumulados >= 500) nivelEcologico = 'Bronce'
    else if (puntosAcumulados >= 100) nivelEcologico = 'Verde'

    // SCRUM-878: Respuesta JSON actualizada
    return response.ok({
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
        fechaRegistro: usuario.fechaRegistro,
        rol: usuario.rol.nombre,
        estado: usuario.estadoUsuario.nombre,
      },
      estadisticas: {
        totalEntregas: entregas,
        puntosAcumulados,
        totalCanjes,
        nivelEcologico,
      },
    })
  }

  async actualizar({ auth, request, response }: HttpContext) {
    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)

    const datos = request.only(['nombre', 'apellido', 'telefono', 'imagen'])
    usuario.merge(datos)
    await usuario.save()

    return response.ok({
      mensaje: 'Perfil actualizado correctamente',
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
      },
    })
  }

  async cambiarPassword({ auth, request, response }: HttpContext) {
    const { passwordActual, passwordNuevo } = request.only(['passwordActual', 'passwordNuevo'])

    const usuario = await Usuario.findOrFail(auth.user!.idUsuario)

    const passwordValido = await hash.verify(usuario.password, passwordActual)
    if (!passwordValido) {
      return response.unauthorized({
        mensaje: 'La contraseña actual es incorrecta',
      })
    }

    usuario.password = passwordNuevo
    await usuario.save()

    return response.ok({
      mensaje: 'Contraseña actualizada correctamente',
    })
  }
}
