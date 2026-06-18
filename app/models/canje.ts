import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'
import Recompensa from './recompensa.js'
import EstadoCanje from './estado_canje.js'

export default class Canje extends BaseModel {
  public static table = 'canjes'

  @column({ isPrimary: true })
  declare idCanje: number

  @column()
  declare idUsuario: number

  @column()
  declare idRecompensa: number

  @column()
  declare idEstadoCanje: number

  @column()
  declare codigoCanje: string | null

  @column()
  declare puntosUsados: number

  @column.dateTime()
  declare fechaCanje: DateTime

  @column.dateTime()
  declare fechaVencimiento: DateTime | null

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @belongsTo(() => Recompensa, { foreignKey: 'idRecompensa' })
  declare recompensa: BelongsTo<typeof Recompensa>

  @belongsTo(() => EstadoCanje, { foreignKey: 'idEstadoCanje' })
  declare estadoCanje: BelongsTo<typeof EstadoCanje>
}
