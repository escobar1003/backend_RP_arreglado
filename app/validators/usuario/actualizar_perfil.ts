import vine from '@vinejs/vine'

export const actualizarPerfilValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).optional(),
    telefono: vine.string().maxLength(20).optional(),
    imagen: vine.string().maxLength(255).optional(),
  })
)
