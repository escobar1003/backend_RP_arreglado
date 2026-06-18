import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'
import Entrega from './entrega.js'

export default class MovimientoPunto extends BaseModel {
  public static table = 'movimientos_puntos'

  @column({ isPrimary: true })
  declare idMovimiento: number

  @column()
  declare idUsuario: number

  @column()
  declare idEntrega: number | null

  @column()
  declare tipoMovimiento: 'ganados' | 'descontados' | 'ajuste'

  @column()
  declare puntos: number

  @column()
  declare descripcion: string | null

  @column.dateTime()
  declare fechaMovimiento: DateTime

  @column.dateTime()
  declare fechaCaducidad: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Entrega, { foreignKey: 'idEntrega' })
  declare entrega: BelongsTo<typeof Entrega>
}
