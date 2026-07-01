import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('url_foto', 500).nullable()
      table.string('ia_material', 100).nullable()
      table.string('ia_confianza', 10).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('url_foto')
      table.dropColumn('ia_material')
      table.dropColumn('ia_confianza')
    })
  }
}