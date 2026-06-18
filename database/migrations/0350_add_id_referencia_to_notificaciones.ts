import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notificaciones'

  async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'id_referencia')
    if (!hasColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.integer('id_referencia').unsigned().nullable()
      })
    }
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_referencia')
    })
  }
}
