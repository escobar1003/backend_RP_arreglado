import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class EstadoEncargado extends BaseModel {
  public static table = 'estados_encargados'

  @column({ isPrimary: true })
  declare idEstadoEncargado: number

  @column()
  declare nombre: string

  @hasMany(() => Usuario, { foreignKey: 'idEstadoEncargado' })
  declare encargados: HasMany<typeof Usuario>
}
