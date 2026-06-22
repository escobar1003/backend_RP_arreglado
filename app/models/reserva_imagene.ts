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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Reserva, { foreignKey: 'idReserva' })
  declare reserva: BelongsTo<typeof Reserva>
}
