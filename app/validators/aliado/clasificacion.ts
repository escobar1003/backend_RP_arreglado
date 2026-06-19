import vine from '@vinejs/vine'

export const crearClasificacionValidator = vine.compile(
  vine.object({
    idMaterial: vine.number().positive(),
    idEntrega: vine.number().positive().optional(),
    imagen: vine.string().maxLength(255).optional(),
    confianza: vine.number().min(0).max(100).optional(),
    canecaRecomendada: vine.string().maxLength(50).optional(),
    recomendacion: vine.string().maxLength(255).optional(),
    fechaClasificacion: vine.string(),
  })
)
