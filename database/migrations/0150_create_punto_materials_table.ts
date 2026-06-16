import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'punto_material'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_punto').unsigned().notNullable()
        .references('id_punto').inTable('puntos_reciclaje').onDelete('CASCADE')
      table.integer('id_material').unsigned().notNullable()
        .references('id_material').inTable('materiales').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}