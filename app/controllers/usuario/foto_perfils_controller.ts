import type { HttpContext } from '@adonisjs/core/http'
import { createWriteStream, mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import { randomUUID } from 'node:crypto'
import Usuario from '#models/usuario'

export default class FotoPerfilController {
  async store({ auth, request, response }: HttpContext) {
    const foto = request.file('foto', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png'],
    })

    if (!foto) {
      return response.badRequest({ mensaje: 'No se envió ninguna foto' })
    }

    if (!foto.isValid) {
      return response.badRequest({ mensaje: foto.errors })
    }

    // Crear carpeta si no existe
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'perfil')
    mkdirSync(uploadDir, { recursive: true })

    // Nombre único para el archivo
    const nombreArchivo = `${randomUUID()}${extname(foto.clientName)}`
    const rutaCompleta = join(uploadDir, nombreArchivo)

    // Mover el archivo
    await foto.move(uploadDir, { name: nombreArchivo })

    // Actualizar en BD
    const usuario = auth.user!
    usuario.imagen = `/uploads/perfil/${nombreArchivo}`
    await usuario.save()

    return response.ok({
      mensaje: 'Foto actualizada correctamente',
      foto: `${request.protocol()}://${request.host()}/uploads/perfil/${nombreArchivo}`,
    })
  }
}