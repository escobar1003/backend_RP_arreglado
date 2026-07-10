import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.raw('UPDATE usuarios SET puntos_totales = 0 WHERE puntos_totales < 0')
  }

  async down() {
    // No reverse - negative points should not exist
  }
}
