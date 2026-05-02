import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Admin extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare email: string   // 👈 usamos email en la BD

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}