import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaccion_puntos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Usamos 'id_transaccion' para que coincida con tu @column idTransaccion
      table.increments('id_transaccion')

      // Relación con el usuario
      table
        .integer('id_usuario')
        .unsigned()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')

      // Columnas para los puntos y el material
      table.integer('cantidad_puntos').notNullable()
      table.string('tipo_material', 50).notNullable()
      table.string('descripcion', 255).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
