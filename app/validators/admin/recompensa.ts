import vine from '@vinejs/vine'

export const crearRecompensaValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100),
    idTipoRecompensa: vine.number().positive(),
    idAliado: vine.number().positive().optional(),
    descripcion: vine.string().maxLength(255).optional(),
    puntosRequeridos: vine.number().positive(),
    fechaInicio: vine.string().optional(),
    fechaFin: vine.string().optional(),
    stock: vine.number().min(0).optional(),
  })
)

export const actualizarRecompensaValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).optional(),
    idTipoRecompensa: vine.number().positive().optional(),
    idEstadoRecompensa: vine.number().positive().optional(),
    idAliado: vine.number().positive().optional(),
    descripcion: vine.string().maxLength(255).optional(),
    puntosRequeridos: vine.number().positive().optional(),
    fechaInicio: vine.string().optional(),
    fechaFin: vine.string().optional(),
    stock: vine.number().min(0).optional(),
  })
)
