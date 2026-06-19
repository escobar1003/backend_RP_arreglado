import vine from '@vinejs/vine'

export const actualizarUsuarioValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).optional(),
    correo: vine.string().email().normalizeEmail().optional(),
    telefono: vine.string().maxLength(20).optional(),
    imagen: vine.string().maxLength(255).optional(),
    idRol: vine.number().positive().optional(),
    idEstadoUsuario: vine.number().positive().optional(),
  })
)
export const crearUsuarioValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100),
    correo: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6).maxLength(255),
    telefono: vine.string().maxLength(20).optional(),
    idRol: vine.number().positive().optional(),
    idEstadoUsuario: vine.number().positive().optional(),
  })
)
