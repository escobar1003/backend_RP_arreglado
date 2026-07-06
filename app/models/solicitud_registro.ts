import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Aliado from './aliado.js'

export default class SolicitudRegistro extends BaseModel {
  static table = 'solicitudes_registro'

  @column({ isPrimary: true })
  declare idSolicitud: number

  @column()
  declare nombre: string

  @column()
  declare correo: string

  @column({ columnName: 'password_hash' })
  declare passwordHash: string

  @column()
  declare telefono: string | null

  @column()
  declare cedula: string | null

  @column()
  declare mensaje: string | null

  @column()
  declare idAliado: number | null

  @column()
  declare rolSolicitado: 'admin' | 'encargado'

  @column()
  declare estado: 'pendiente' | 'aprobado' | 'rechazado'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Aliado, { foreignKey: 'idAliado' })
  declare aliado: BelongsTo<typeof Aliado>
}
