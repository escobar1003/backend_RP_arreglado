import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Material from './material.js'

export default class EstadoMaterial extends BaseModel {
  public static table = 'estados_materiales'
  public static primaryKey = 'id_estado_material'
  public static timestamps = false

  @column({ isPrimary: true })
  declare idEstadoMaterial: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string | null

  @hasMany(() => Material, { foreignKey: 'idEstadoMaterial' })
  declare materiales: HasMany<typeof Material>
}
