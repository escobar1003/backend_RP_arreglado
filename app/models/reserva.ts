import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'
import PuntoReciclaje from './punto_reciclaje.js'
import ReservaImagene from './reserva_imagene.js'

export default class Reserva extends BaseModel {
  public static table = 'reservas'

  @column({ isPrimary: true })
  declare idReserva: number

  @column()
  declare idUsuario: number

  @column()
  declare idPunto: number

  @column()
  declare fecha: string // 'YYYY-MM-DD'

  @column()
  declare hora: string // 'HH:mm:ss'

  @column()
  declare estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'

  @column()
  declare notas: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => PuntoReciclaje, { foreignKey: 'idPunto' })
  declare punto: BelongsTo<typeof PuntoReciclaje>

  @hasMany(() => ReservaImagene, { foreignKey: 'idReserva' })
  declare imagenes: HasMany<typeof ReservaImagene>
}
