import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'recompensas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_recompensa')
      table
        .integer('id_tipo_recompensa')
        .unsigned()
        .notNullable()
        .references('id_tipo_recompensa')
        .inTable('tipos_recompensa')
        .onDelete('RESTRICT')
      table
        .integer('id_aliado')
        .unsigned()
        .nullable()
        .references('id_aliado')
        .inTable('aliados')
        .onDelete('SET NULL')
      table
        .integer('id_estado_recompensa')
        .unsigned()
        .notNullable()
        .references('id_estado_recompensa')
        .inTable('estados_recompensas')
        .onDelete('RESTRICT')
      table.string('nombre', 100).notNullable()
      table.string('descripcion', 255).nullable()
      table.integer('puntos_requeridos').notNullable()
      table.date('fecha_inicio').nullable()
      table.date('fecha_fin').nullable()
      table.integer('stock').nullable()
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
