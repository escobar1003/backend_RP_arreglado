import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notificaciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_notificacion')
      table.integer('id_usuario').unsigned().notNullable()
        .references('id_usuario').inTable('usuarios').onDelete('CASCADE')
      table.integer('id_encargado').unsigned().nullable()
      table.enum('tipo', ['nueva_reserva', 'respuesta_reserva', 'reserva', 'entrega', 'canje'])
        .notNullable().defaultTo('reserva')
      table.string('titulo', 150).notNullable()
      table.text('descripcion').nullable()
      table.boolean('leida').notNullable().defaultTo(false)
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}