import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Usuario from './usuario.js'

export default class Notificacion extends BaseModel {
  public static table = 'notificaciones'

  @column({ isPrimary: true })
  declare idNotificacion: number

  @column()
  declare idUsuario: number

  @column()
  declare titulo: string

  @column()
  declare mensaje: string

  @column()
  declare leida: boolean

  @column()
  declare tipo: string

  @column()
  declare idReferencia: number | null

  // @column()
  // declare idEncargado: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>
}