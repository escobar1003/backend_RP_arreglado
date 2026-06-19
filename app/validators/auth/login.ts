import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    correo: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6),
  })
)
