import vine from '@vinejs/vine'

export const crearEncargadoValidator = vine.compile(
  vine.object({
    nombre:        vine.string().minLength(2).maxLength(150),
    correo:        vine.string().email().normalizeEmail(),
    password:      vine.string().minLength(6).maxLength(255).optional(),
    telefono:      vine.string().maxLength(20).optional(),
    zona:          vine.string().maxLength(100).optional(),
    puntoAsignado: vine.string().maxLength(150).optional(),
  })
)

export const actualizarEncargadoValidator = vine.compile(
  vine.object({
    nombre:        vine.string().minLength(2).maxLength(150).optional(),
    correo:        vine.string().email().normalizeEmail().optional(),
    telefono:      vine.string().maxLength(20).optional(),
    zona:          vine.string().maxLength(100).optional(),
    puntoAsignado: vine.string().maxLength(150).optional(),
    idEstado:      vine.number().positive().optional(),
  })
)