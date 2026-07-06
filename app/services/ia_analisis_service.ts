import axios from 'axios'
import FormData from 'form-data'
import fs from 'node:fs'

export type EstadoAnalisisIA = 'completado' | 'sin_deteccion' | 'error'

export interface ResultadoAnalisisIA {
  estado: EstadoAnalisisIA
  detectado: boolean
  material: string | null
  confianza: number | null
  raw: Record<string, any> | null
  error?: string
}

class IaAnalisisService {
  async analizarImagen(filePath: string): Promise<ResultadoAnalisisIA> {
    const iaUrl = process.env.IA_SERVICE_URL || 'http://localhost:5000'
    try {
      if (!fs.existsSync(filePath)) {
        return {
          estado: 'error',
          detectado: false,
          material: null,
          confianza: null,
          raw: null,
          error: 'Archivo no disponible',
        }
      }
      const formData = new FormData()
      formData.append('image', fs.createReadStream(filePath))

      const apiResponse = await axios.post(`${iaUrl}/predict`, formData, {
        headers: { ...formData.getHeaders() },
        timeout: 120000,
      })

      const data = apiResponse.data
      if (data?.detectado && data?.resultado) {
        return {
          estado: 'completado',
          detectado: true,
          material: data.resultado.objeto ?? null,
          confianza: typeof data.resultado.confianza === 'number' ? data.resultado.confianza : null,
          raw: data,
        }
      }
      return {
        estado: 'sin_deteccion',
        detectado: false,
        material: null,
        confianza: null,
        raw: data ?? null,
      }
    } catch (error: any) {
      return {
        estado: 'error',
        detectado: false,
        material: null,
        confianza: null,
        raw: null,
        error: error?.message ?? 'Error al contactar la IA',
      }
    }
  }
}

export default new IaAnalisisService()
