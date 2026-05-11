import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Encargado extends BaseModel {
  public static table = 'encargados'

  @column({ isPrimary: true, columnName: 'id_encargado' })
  declare idEncargado: number

  @column()
  declare nombre: string

  @column()
  declare correo: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare telefono: string | null

  @column()
  declare zona: string | null

  @column({ columnName: 'punto_asignado' })
  declare puntoAsignado: string | null

  @column({ columnName: 'id_estado' })
  declare idEstado: number

  @column.dateTime({ autoCreate: true, columnName: 'fecha_registro' })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  declare updatedAt: DateTime
}