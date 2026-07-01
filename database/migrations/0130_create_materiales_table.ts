import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'materiales'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_material')
      table
        .integer('id_estado_material')
        .unsigned()
        .notNullable()
        .references('id_estado_material')
        .inTable('estados_materiales')
        .onDelete('RESTRICT')
      table.string('nombre', 50).notNullable()
      table.string('descripcion', 255).nullable()
      table.string('tipo_residuo', 50).nullable()
      table.string('color_caneca', 30).nullable()
      table.string('indicacion_disposicion', 255).nullable()
      table.decimal('puntos_por_kg', 10, 2).notNullable().defaultTo(0)
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
