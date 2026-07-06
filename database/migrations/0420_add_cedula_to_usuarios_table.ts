import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'cedula')

    if (!hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.string('cedula', 20).nullable().unique()
      })
    }
  }

  async down() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'cedula')

    if (hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn('cedula')
      })
    }
  }
}
