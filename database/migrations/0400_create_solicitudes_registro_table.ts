import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'solicitudes_registro'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_solicitud')

      table.string('nombre', 255).notNullable()
      table.string('correo', 255).notNullable()
      table.string('password_hash', 255).notNullable()
      table.string('telefono', 50).nullable()
      table.string('mensaje', 500).nullable()

      table
        .integer('id_aliado')
        .unsigned()
        .nullable()
        .references('id_aliado')
        .inTable('aliados')
        .onDelete('SET NULL')

      table.enu('rol_solicitado', ['admin', 'encargado']).notNullable()
      table.enu('estado', ['pendiente', 'aprobado', 'rechazado']).defaultTo('pendiente')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
