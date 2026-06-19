import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'clasificaciones_ia'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_clasificacion')
      table
        .integer('id_usuario')
        .unsigned()
        .notNullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')
      table
        .integer('id_material')
        .unsigned()
        .notNullable()
        .references('id_material')
        .inTable('materiales')
        .onDelete('RESTRICT')
      table
        .integer('id_entrega')
        .unsigned()
        .nullable()
        .references('id_entrega')
        .inTable('entregas')
        .onDelete('SET NULL')
      table.string('imagen', 255).nullable()
      table.decimal('confianza', 5, 2).nullable()
      table.string('caneca_recomendada', 50).nullable()
      table.string('recomendacion', 255).nullable()
      table.datetime('fecha_clasificacion').notNullable()
      table.datetime('created_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
