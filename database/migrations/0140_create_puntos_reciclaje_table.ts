import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'puntos_reciclaje'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_punto')
      table
        .integer('id_estado_punto')
        .unsigned()
        .notNullable()
        .references('id_estado_punto')
        .inTable('estados_puntos')
        .onDelete('RESTRICT')
      table
        .integer('id_aliado')
        .unsigned()
        .notNullable()
        .references('id_aliado')
        .inTable('aliados')
        .onDelete('CASCADE')
      table.string('nombre', 100).notNullable()
      table.string('direccion', 150).nullable()
      table.decimal('latitud', 10, 7).nullable()
      table.decimal('longitud', 10, 7).nullable()
      table.string('horario', 100).nullable()
      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
