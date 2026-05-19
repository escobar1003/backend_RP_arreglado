import { BaseModel, column, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import EstadoUsuario from './estado_usuario.js'
import Aliado from './aliado.js'
import PuntoReciclaje from './punto_reciclaje.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['correo'],
  passwordColumnName: 'password',
})

export default class Usuario extends compose(BaseModel, AuthFinder) {
  public static table = 'usuarios'

  static accessTokens = DbAccessTokensProvider.forModel(Usuario, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'api_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @column({ isPrimary: true })
  declare idUsuario: number

  @column()
  declare idRol: number

  @column()
  declare idEstadoUsuario: number

  @column()
  declare nombre: string

  @column({ columnName: 'correo' })
  declare correo: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare telefono: string | null

  @column()
  declare imagen: string | null

  // ── Recuperación de contraseña ──────────────────────────────────────────────
  @column({ columnName: 'codigo_recuperacion', serializeAs: null })
  declare codigoRecuperacion: string | null

  @column.dateTime({ columnName: 'codigo_expiracion', serializeAs: null })
  declare codigoExpiracion: DateTime | null
  // ───────────────────────────────────────────────────────────────────────────

  @column.dateTime()
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Role, { foreignKey: 'idRol' })
  declare rol: BelongsTo<typeof Role>

  @belongsTo(() => EstadoUsuario, { foreignKey: 'idEstadoUsuario' })
  declare estadoUsuario: BelongsTo<typeof EstadoUsuario>

  @column()
  declare idAliado: number | null

  @belongsTo(() => Aliado, { foreignKey: 'idAliado' })
  declare aliado: BelongsTo<typeof Aliado>
  // Si este usuario es encargado, aquí está el punto que tiene a cargo
  @hasOne(() => PuntoReciclaje, { foreignKey: 'idEncargado' })
  declare puntoACargo: HasOne<typeof PuntoReciclaje>
}