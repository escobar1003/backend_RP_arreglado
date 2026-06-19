import PuntoReciclaje from '#models/punto_reciclaje'
import Usuario from '#models/usuario'

export async function asegurarPuntoEncargado(
  usuario: Usuario
): Promise<{ punto: PuntoReciclaje | null; mensaje?: string }> {
  let punto = await PuntoReciclaje.query().where('id_encargado', usuario.idUsuario).first()

  if (!punto && usuario.idAliado) {
    punto = await PuntoReciclaje.query()
      .where('id_aliado', usuario.idAliado)
      .whereNull('id_encargado')
      .first()
    if (punto) {
      punto.idEncargado = usuario.idUsuario
      await punto.save()
    }
  }

  if (!punto) {
    return { punto: null, mensaje: 'No tienes un punto de reciclaje asignado' }
  }

  return { punto }
}
