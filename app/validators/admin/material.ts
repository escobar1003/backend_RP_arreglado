import vine from '@vinejs/vine'

export const crearMaterialValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(50),
    descripcion: vine.string().maxLength(255).optional(),
    tipoResiduo: vine.string().maxLength(50).optional(),
    colorCaneca: vine.string().maxLength(30).optional(),
    indicacionDisposicion: vine.string().maxLength(255).optional(),
    puntosPorKg: vine.number().min(0),
    imagen: vine.string().maxLength(255).optional(),
  })
)

export const actualizarMaterialValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(50).optional(),
    idEstadoMaterial: vine.number().positive().optional(),
    descripcion: vine.string().maxLength(255).optional(),
    tipoResiduo: vine.string().maxLength(50).optional(),
    colorCaneca: vine.string().maxLength(30).optional(),
    indicacionDisposicion: vine.string().maxLength(255).optional(),
    puntosPorKg: vine.number().min(0).optional(),
    imagen: vine.string().maxLength(255).optional(),
  })
)
