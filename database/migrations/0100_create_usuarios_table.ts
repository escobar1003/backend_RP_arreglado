import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'usuarios'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_usuario')
      table
        .integer('id_rol')
        .unsigned()
        .notNullable()
        .references('id_rol')
        .inTable('roles')
        .onDelete('RESTRICT')
      table
        .integer('id_estado_usuario')
        .unsigned()
        .notNullable()
        .references('id_estado_usuario')
        .inTable('estados_usuarios')
        .onDelete('RESTRICT')
      table.string('nombre', 100).notNullable()
      table.string('correo', 100).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('telefono', 20).nullable()
      table.datetime('fecha_registro').notNullable()
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
