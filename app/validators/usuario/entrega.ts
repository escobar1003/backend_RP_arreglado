import vine from '@vinejs/vine'

export const crearEntregaValidator = vine.compile(
  vine.object({
    idPunto: vine.number().positive(),
    fechaEntrega: vine.string(),
    observacion: vine.string().maxLength(255).optional(),
    detalles: vine
      .array(
        vine.object({
          idMaterial: vine.number().positive(),
          peso: vine.number().min(0.01),
        })
      )
      .minLength(1),
  })
)
