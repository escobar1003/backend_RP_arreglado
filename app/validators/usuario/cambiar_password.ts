import vine from '@vinejs/vine'

export const cambiarPasswordValidator = vine.compile(
  vine.object({
    passwordActual: vine.string().minLength(6),
    passwordNuevo: vine.string().minLength(6).maxLength(255),
  })
)
