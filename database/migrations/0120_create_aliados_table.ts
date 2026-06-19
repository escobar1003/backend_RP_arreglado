import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'aliados'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_aliado')
      table
        .integer('id_estado_aliado')
        .unsigned()
        .notNullable()
        .references('id_estado_aliado')
        .inTable('estados_aliados')
        .onDelete('RESTRICT')
      table.string('nombre', 100).notNullable()
      table.string('tipo_negocio', 50).nullable()
      table.string('descripcion', 255).nullable()
      table.string('direccion', 150).nullable()
      table.string('telefono', 20).nullable()
      table.string('correo', 100).nullable()
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
