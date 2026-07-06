import db from '@adonisjs/lucid/services/db'
import PuntoReciclaje from '#models/punto_reciclaje'
import type Usuario from '#models/usuario'

export async function asegurarPuntoEncargado(
  usuario: Usuario
): Promise<{ punto: PuntoReciclaje | null; mensaje?: string }> {
  const puntoAsignado = await db.transaction(async (trx) => {
    let puntoEncontrado = await PuntoReciclaje.query({ client: trx })
      .where('id_encargado', usuario.idUsuario)
      .first()

    if (!puntoEncontrado && usuario.idAliado) {
      // forUpdate() bloquea la fila hasta que termine la transacción, así
      // dos encargados del mismo aliado no pueden quedarse con el mismo
      // punto libre si llegan casi al mismo tiempo.
      puntoEncontrado = await PuntoReciclaje.query({ client: trx })
        .where('id_aliado', usuario.idAliado)
        .whereNull('id_encargado')
        .forUpdate()
        .first()

      if (puntoEncontrado) {
        puntoEncontrado.useTransaction(trx)
        puntoEncontrado.idEncargado = usuario.idUsuario
        await puntoEncontrado.save()
      }
    }

    return puntoEncontrado
  })

  if (!puntoAsignado) {
    return { punto: null, mensaje: 'No tienes un punto de reciclaje asignado' }
  }

  return { punto: puntoAsignado }
}
