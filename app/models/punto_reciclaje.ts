import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import EstadoPunto from './estado_punto.js'
import Aliado from './aliado.js'
import Material from './material.js'
import Entrega from './entrega.js'
import Usuario from './usuario.ts'

export default class PuntoReciclaje extends BaseModel {
  public static table = 'puntos_reciclaje'

  @column({ isPrimary: true })
  declare idPunto: number

  @column()
  declare idEstadoPunto: number

  @column()
  declare idAliado: number

  @column()
  declare idEncargado: number | null

  @column()
  declare nombre: string

  @column()
  declare direccion: string | null

  @column()
  declare latitud: number | null

  @column()
  declare longitud: number | null

  @column()
  declare horario: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => EstadoPunto, { foreignKey: 'idEstadoPunto' })
  declare estadoPunto: BelongsTo<typeof EstadoPunto>

  @belongsTo(() => Aliado, { foreignKey: 'idAliado' })
  declare aliado: BelongsTo<typeof Aliado>

  @belongsTo(() => Usuario, { foreignKey: 'idEncargado' })
  declare encargado: BelongsTo<typeof Usuario>

  @manyToMany(() => Material, {
    pivotTable: 'punto_material',
    localKey: 'idPunto',
    pivotForeignKey: 'id_punto',
    relatedKey: 'idMaterial',
    pivotRelatedForeignKey: 'id_material',
  })
  declare materiales: ManyToMany<typeof Material>

  @hasMany(() => Entrega, { foreignKey: 'idPunto' })
  declare entregas: HasMany<typeof Entrega>
}
