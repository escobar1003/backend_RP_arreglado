import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Reserva from './reserva.js'

export default class ReservaImagene extends BaseModel {
  public static table = 'reserva_imagenes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare idReserva: number

  @column()
  declare url: string

  @column()
  declare estadoAnalisis: 'pendiente' | 'completado' | 'sin_deteccion' | 'error'

  @column()
  declare detectado: boolean

  @column()
  declare materialDetectado: string | null

  @column()
  declare confianza: number | null

  @column({
    prepare: (value: unknown) => (value === null || value === undefined ? null : JSON.stringify(value)),
    consume: (value: unknown) => {
      if (value === null || value === undefined) return null
      if (typeof value === 'string') {
        try { return JSON.parse(value) } catch { return value }
      }
      return value
    },
  })
  declare analisisRaw: Record<string, any> | null

  @column.dateTime()
  declare analizadoEn: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Reserva, { foreignKey: 'idReserva' })
  declare reserva: BelongsTo<typeof Reserva>
}
