import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aliados'

  async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'zona')
    if (!hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.string('zona', 100).nullable()
      })
    }
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('zona')
    })
  }
}