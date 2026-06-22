import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'zonas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_zona')
      table.string('nombre', 100).notNullable()
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() { this.schema.dropTable(this.tableName) }
}
