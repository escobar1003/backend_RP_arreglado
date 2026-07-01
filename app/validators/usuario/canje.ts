import vine from '@vinejs/vine'

export const crearCanjeValidator = vine.compile(
  vine.object({
    idRecompensa: vine.number().positive(),
  })
)
