import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js' // Importamos tu modelo de Usuario

export default class TransaccionPunto extends BaseModel {
  public static table = 'transaccion_puntos'

  @column({ isPrimary: true })
  declare idTransaccion: number

  @column()
  declare idUsuario: number

  @column()
  declare cantidadPuntos: number

  @column()
  declare tipoMaterial: string

  @column()
  declare descripcion: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relación: Una transacción pertenece a un Usuario
  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>
}
