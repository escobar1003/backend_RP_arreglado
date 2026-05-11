import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'encargados'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_encargado')
      table.string('nombre', 150).notNullable()
      table.string('correo', 150).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('telefono', 20).nullable()
      table.string('zona', 100).nullable()
      table.string('punto_asignado', 150).nullable()
      table.integer('id_estado').unsigned().defaultTo(1)
      table.timestamp('fecha_registro', { useTz: true }).defaultTo(this.now())
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}