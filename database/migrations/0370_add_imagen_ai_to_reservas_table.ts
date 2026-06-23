import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('imagen').nullable().after('notas')
      table.text('ai_resultado').nullable().after('imagen')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('imagen')
      table.dropColumn('ai_resultado')
    })
  }
}
