import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'recompensa_detalle'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_detalle_recompensa')
      table
        .integer('id_recompensa')
        .unsigned()
        .notNullable()
        .references('id_recompensa')
        .inTable('recompensas')
        .onDelete('CASCADE')
      table.decimal('valor_porcentaje', 5, 2).nullable()
      table.decimal('valor_fijo', 10, 2).nullable()
      table.string('codigo_cupon', 50).nullable()
      table.string('producto_descripcion', 150).nullable()
      table.text('condiciones').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
