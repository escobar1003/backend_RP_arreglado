import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'movimientos_puntos'
  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.datetime('fecha_caducidad').nullable().after('fecha_movimiento')
    })
  }
  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fecha_caducidad')
    })
  }
}
