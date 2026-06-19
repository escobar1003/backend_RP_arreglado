import vine from '@vinejs/vine'

export const crearAliadoValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100),
    tipoNegocio: vine.string().maxLength(50).optional(),
    descripcion: vine.string().maxLength(255).optional(),
    direccion: vine.string().maxLength(150).optional(),
    telefono: vine.string().maxLength(20).optional(),
    correo: vine.string().email().normalizeEmail().optional(),
    comision: vine.number().min(0).max(100).optional(),
    latitud: vine.number().optional(),
    longitud: vine.number().optional(),
    ubicacionDireccion: vine.string().maxLength(255).optional(),
  })
)

export const actualizarAliadoValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).optional(),
    idEstadoAliado: vine.number().positive().optional(),
    tipoNegocio: vine.string().maxLength(50).optional(),
    descripcion: vine.string().maxLength(255).optional(),
    direccion: vine.string().maxLength(150).optional(),
    telefono: vine.string().maxLength(20).optional(),
    correo: vine.string().email().normalizeEmail().optional(),
    comision: vine.number().min(0).max(100).optional(),
    latitud: vine.number().optional(),
    longitud: vine.number().optional(),
    ubicacionDireccion: vine.string().maxLength(255).optional(),
  })
)
