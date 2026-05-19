import { BaseSchema } from '@adonisjs/lucid/schema'
 
export default class extends BaseSchema {
  protected tableName = 'puntos_reciclaje'
 
  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('id_encargado')
        .unsigned()
        .nullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('SET NULL')
    })
  }
 
  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('id_encargado')
    })
  }
}