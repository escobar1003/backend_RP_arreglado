import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import EstadoAliado from './estado_aliado.js'
import PuntoReciclaje from './punto_reciclaje.js'

export default class Aliado extends BaseModel {
  public static table = 'aliados'

  @column({ isPrimary: true })
  declare idAliado: number

  @column()
  declare idEstadoAliado: number

  @column()
  declare nombre: string

  @column()
  declare tipoNegocio: string | null

  @column()
  declare descripcion: string | null

  @column()
  declare direccion: string | null

  @column()
  declare telefono: string | null

  @column()
  declare correo: string | null

  @column()
  declare zona: string | null

  @column()
  declare comision: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => EstadoAliado, { foreignKey: 'idEstadoAliado' })
  declare estadoAliado: BelongsTo<typeof EstadoAliado>

  @hasMany(() => PuntoReciclaje, { foreignKey: 'idAliado' })
  declare puntosReciclaje: HasMany<typeof PuntoReciclaje>
}
