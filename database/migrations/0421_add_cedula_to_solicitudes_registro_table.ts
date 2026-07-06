import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'solicitudes_registro'

  async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'cedula')

    if (!hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.string('cedula', 20).nullable()
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
