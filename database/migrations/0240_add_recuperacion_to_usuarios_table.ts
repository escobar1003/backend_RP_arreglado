import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Código numérico de 6 dígitos (se guarda como string para conservar ceros iniciales)
      table.string('codigo_recuperacion', 6).nullable()
      // Fecha/hora de expiración del código (15 minutos desde que se generó)
      table.datetime('codigo_expiracion').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('codigo_recuperacion')
      table.dropColumn('codigo_expiracion')
    })
  }
}
