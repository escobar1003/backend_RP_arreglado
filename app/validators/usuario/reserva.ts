import vine from '@vinejs/vine'

export const crearReservaValidator = vine.compile(
  vine.object({
    idPunto: vine.number().positive(),
    fecha: vine.string().trim(),
    hora: vine.string().trim(),
    notas: vine.string().trim().maxLength(500).optional(),

    // Foto e IA capturadas del lado del cliente (Flutter) al momento de reservar.
    // Los tres son opcionales: si el usuario no adjunta foto, la reserva se crea igual (compatibilidad hacia atrás).
    urlFoto: vine.string().trim().url().maxLength(500).optional(),
    iaMaterial: vine.string().trim().maxLength(100).optional(),
    iaConfianza: vine.string().trim().maxLength(10).optional(),
  })
)
