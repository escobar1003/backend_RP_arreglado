import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'estados_materiales'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('descripcion', 255).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('descripcion')
    })
  }
}