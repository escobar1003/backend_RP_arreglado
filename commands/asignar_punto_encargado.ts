import { BaseCommand } from '@adonisjs/core/ace'
import Usuario from '#models/usuario'
import PuntoReciclaje from '#models/punto_reciclaje'
export default class AsignarPuntoEncargado extends BaseCommand {
  static commandName = 'asignar:punto'
  static description = 'Asigna un punto de reciclaje a un encargado por su correo'

  static options = {
    startApp: true,
  }

  async run() {
    const correo = await this.prompt.ask('Correo del encargado', {
      validate: (v) => (v ? true : 'El correo es obligatorio'),
    })

    const usuario = await Usuario.findBy('correo', correo)
    if (!usuario) {
      this.logger.error(`No se encontró un usuario con correo "${correo}"`)
      this.exitCode = 1
      return
    }

    if (usuario.idRol !== 4) {
      this.logger.error(`El usuario "${usuario.nombre}" no es encargado (rol: ${usuario.idRol})`)
      this.exitCode = 1
      return
    }

    await usuario.load('puntoACargo')
    if (usuario.puntoACargo) {
      this.logger.info(`Punto actual: "${usuario.puntoACargo.nombre}" (id: ${usuario.puntoACargo.idPunto})`)
    } else {
      this.logger.warning('No tiene punto asignado actualmente')
    }

    const opcion = await this.prompt.choice('Acción', [
      { name: 'asignar', message: 'Asignar punto por ID' },
      { name: 'auto', message: 'Auto-asignar primer punto libre de su aliado' },
      { name: 'desasignar', message: 'Desasignar punto actual' },
    ])

    if (opcion === 'desasignar') {
      await PuntoReciclaje.query()
        .where('id_encargado', usuario.idUsuario)
        .update({ idEncargado: null })
      this.logger.success('Punto desasignado correctamente')
      return
    }

    if (opcion === 'auto') {
      if (!usuario.idAliado) {
        this.logger.error('El encargado no tiene aliado asignado')
        this.exitCode = 1
        return
      }
      const punto = await PuntoReciclaje.query()
        .where('id_aliado', usuario.idAliado)
        .whereNull('id_encargado')
        .first()
      if (!punto) {
        this.logger.error('No hay puntos libres disponibles en su aliado')
        this.exitCode = 1
        return
      }
      await PuntoReciclaje.query()
        .where('id_encargado', usuario.idUsuario)
        .whereNot('id_punto', punto.idPunto)
        .update({ idEncargado: null })
      punto.idEncargado = usuario.idUsuario
      await punto.save()
      this.logger.success(`Punto "${punto.nombre}" asignado a "${usuario.nombre}"`)
      return
    }

    const idPunto = await this.prompt.ask('ID del punto de reciclaje', {
      validate: (v) => (v && !isNaN(Number(v)) ? true : 'Debe ser un número válido'),
    })

    const punto = await PuntoReciclaje.find(Number(idPunto))
    if (!punto) {
      this.logger.error('Punto no encontrado')
      this.exitCode = 1
      return
    }

    if (punto.idEncargado && punto.idEncargado !== usuario.idUsuario) {
      const ok = await this.prompt.confirm(
        `El punto "${punto.nombre}" ya tiene otro encargado. ¿Reasignarlo?`
      )
      if (!ok) {
        this.logger.info('Cancelado')
        return
      }
    }

    await PuntoReciclaje.query()
      .where('id_encargado', usuario.idUsuario)
      .whereNot('id_punto', punto.idPunto)
      .update({ idEncargado: null })

    punto.idEncargado = usuario.idUsuario
    await punto.save()
    this.logger.success(`Punto "${punto.nombre}" asignado a "${usuario.nombre}"`)
  }
}
