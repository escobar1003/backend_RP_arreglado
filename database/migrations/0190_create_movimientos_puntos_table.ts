import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'movimientos_puntos'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_movimiento')
      table
        .integer('id_usuario')
        .unsigned()
        .notNullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')
      table
        .integer('id_entrega')
        .unsigned()
        .nullable()
        .references('id_entrega')
        .inTable('entregas')
        .onDelete('SET NULL')
      table.enu('tipo_movimiento', ['ganados', 'descontados', 'ajuste']).notNullable()
      table.integer('puntos').notNullable()
      table.string('descripcion', 255).nullable()
      table.datetime('fecha_movimiento').notNullable()
      table.datetime('created_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
