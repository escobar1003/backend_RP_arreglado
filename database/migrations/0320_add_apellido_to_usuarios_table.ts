import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'apellido')

    if (!hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.string('apellido', 100).nullable()
      })
    }
  }

  async down() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'apellido')

    if (hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn('apellido')
      })
    }
  }
}
