import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'entregas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_entrega')
      table
        .integer('id_usuario')
        .unsigned()
        .notNullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')
      table
        .integer('id_punto')
        .unsigned()
        .notNullable()
        .references('id_punto')
        .inTable('puntos_reciclaje')
        .onDelete('RESTRICT')
      table
        .integer('id_estado_entrega')
        .unsigned()
        .notNullable()
        .references('id_estado_entrega')
        .inTable('estados_entregas')
        .onDelete('RESTRICT')
      table.datetime('fecha_entrega').notNullable()
      table.decimal('peso_total', 10, 2).notNullable().defaultTo(0)
      table.integer('puntos_totales').notNullable().defaultTo(0)
      table.string('observacion', 255).nullable()
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
