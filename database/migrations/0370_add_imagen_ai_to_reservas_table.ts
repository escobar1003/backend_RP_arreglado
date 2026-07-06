import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservas'

  async up() {
    const hasImagen = await this.schema.hasColumn(this.tableName, 'imagen')
    const hasAiResultado = await this.schema.hasColumn(this.tableName, 'ai_resultado')

    if (!hasImagen || !hasAiResultado) {
      this.schema.alterTable(this.tableName, (table) => {
        if (!hasImagen) table.text('imagen').nullable().after('notas')
        if (!hasAiResultado) table.text('ai_resultado').nullable().after('imagen')
      })
    }
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('imagen')
      table.dropColumn('ai_resultado')
    })
  }
}
