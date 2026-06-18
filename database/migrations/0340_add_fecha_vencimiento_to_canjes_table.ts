import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'canjes'
  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.datetime('fecha_vencimiento').nullable().after('fecha_canje')
    })
  }
  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fecha_vencimiento')
    })
  }
}
