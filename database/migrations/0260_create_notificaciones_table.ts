import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notificaciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_notificacion')
      table.integer('id_usuario').unsigned().notNullable()
        .references('id_usuario').inTable('usuarios').onDelete('CASCADE')
      table.string('titulo', 100).notNullable()
      table.text('mensaje').notNullable()
      table.boolean('leida').defaultTo(false)
      table.string('tipo', 50).nullable() 
      table.integer('id_referencia').unsigned().nullable() 
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}