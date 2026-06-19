import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'detalle_entregas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_detalle')
      table
        .integer('id_entrega')
        .unsigned()
        .notNullable()
        .references('id_entrega')
        .inTable('entregas')
        .onDelete('CASCADE')
      table
        .integer('id_material')
        .unsigned()
        .notNullable()
        .references('id_material')
        .inTable('materiales')
        .onDelete('RESTRICT')
      table.decimal('peso', 10, 2).notNullable()
      table.integer('puntos_generados').notNullable().defaultTo(0)
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
