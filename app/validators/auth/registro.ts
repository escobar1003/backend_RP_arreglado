import vine from '@vinejs/vine'

export const registroValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100),
    correo: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6).maxLength(255),
    telefono: vine.string().maxLength(20).optional(),
    cedula: vine.string().maxLength(20).optional(),
  })
)
