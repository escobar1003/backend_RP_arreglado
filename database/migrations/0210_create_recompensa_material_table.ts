import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'recompensa_material'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_recompensa_material')
      table
        .integer('id_recompensa')
        .unsigned()
        .notNullable()
        .references('id_recompensa')
        .inTable('recompensas')
        .onDelete('CASCADE')
      table
        .integer('id_material')
        .unsigned()
        .notNullable()
        .references('id_material')
        .inTable('materiales')
        .onDelete('CASCADE')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
