import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_reserva')

      table
        .integer('id_usuario')
        .unsigned()
        .notNullable()
        .references('id_usuario')
        .inTable('usuarios')
        .onDelete('CASCADE')

      table
        .integer('id_punto')
        .unsigned()
        .notNullable()
        .references('id_punto')
        .inTable('puntos_reciclaje')
        .onDelete('CASCADE')

      // Fecha y hora de la cita
      table.date('fecha').notNullable()
      table.time('hora').notNullable()

      // Estado: pendiente | confirmada | cancelada | completada
      table.string('estado', 20).notNullable().defaultTo('pendiente')

      // Notas opcionales del usuario al reservar
      table.string('notas', 500).nullable()

      table.datetime('created_at').nullable()
      table.datetime('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
