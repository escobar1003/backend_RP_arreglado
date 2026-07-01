import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'canjes'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_canje')
      table
        .integer('id_usuario')
        .unsigned()
        .notNullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')
      table
        .integer('id_recompensa')
        .unsigned()
        .notNullable()
        .references('id_recompensa')
        .inTable('recompensas')
        .onDelete('RESTRICT')
      table
        .integer('id_estado_canje')
        .unsigned()
        .notNullable()
        .references('id_estado_canje')
        .inTable('estados_canjes')
        .onDelete('RESTRICT')
      table.string('codigo_canje', 50).nullable()
      table.integer('puntos_usados').unsigned().notNullable()
      table.datetime('fecha_canje').notNullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
