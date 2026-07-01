import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reserva_imagenes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('estado_analisis', 20).notNullable().defaultTo('pendiente')
      table.boolean('detectado').notNullable().defaultTo(false)
      table.string('material_detectado', 100).nullable()
      table.decimal('confianza', 5, 2).nullable()
      table.json('analisis_raw').nullable()
      table.datetime('analizado_en').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('estado_analisis')
      table.dropColumn('detectado')
      table.dropColumn('material_detectado')
      table.dropColumn('confianza')
      table.dropColumn('analisis_raw')
      table.dropColumn('analizado_en')
    })
  }
}