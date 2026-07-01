import vine from '@vinejs/vine'

// El frontend envía solo el correo del usuario
export const solicitarCodigoValidator = vine.compile(
  vine.object({
    correo: vine.string().email().normalizeEmail(),
  })
)

// El frontend envía el correo + el código de 6 dígitos que el usuario escribió
export const verificarCodigoValidator = vine.compile(
  vine.object({
    correo: vine.string().email().normalizeEmail(),
    codigo: vine.string().fixedLength(6),
  })
)

// El frontend envía el correo, el código confirmado y la nueva contraseña
export const restablecerPasswordValidator = vine.compile(
  vine.object({
    correo: vine.string().email().normalizeEmail(),
    codigo: vine.string().fixedLength(6),
    nuevaPassword: vine.string().minLength(6).maxLength(255),
  })
)
