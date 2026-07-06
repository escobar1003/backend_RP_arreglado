import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'roles'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_rol')
      table.string('nombre', 50).notNullable()
      table.string('descripcion', 255).nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
