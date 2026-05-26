import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'estados_encargados'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_estado_encargado')
      table.string('nombre', 50).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}