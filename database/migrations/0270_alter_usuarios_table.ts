import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Quitamos el .after() para que se cree sin errores al final de la tabla
      table.integer('puntos_totales').defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('puntos_totales')
    })
  }
}