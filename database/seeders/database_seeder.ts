import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    // =====================
    // ROLES
    // =====================
    await db.table('roles').multiInsert([
      { nombre: 'admin', descripcion: 'Administrador del sistema' },
      { nombre: 'aliado', descripcion: 'Punto de reciclaje en supermercado aliado' },
      { nombre: 'usuario', descripcion: 'Usuario que recicla y acumula puntos' },
    ])

    // =====================
    // ESTADOS USUARIOS
    // =====================
    await db.table('estados_usuarios').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
      { nombre: 'suspendido' },
    ])

    // =====================
    // ESTADOS ALIADOS
    // =====================
    await db.table('estados_aliados').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
    ])

    // =====================
    // ESTADOS MATERIALES
    // =====================
    await db.table('estados_materiales').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
    ])

    // =====================
    // ESTADOS PUNTOS
    // =====================
    await db.table('estados_puntos').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
      { nombre: 'mantenimiento' },
    ])

    // =====================
    // ESTADOS ENTREGAS
    // =====================
    await db.table('estados_entregas').multiInsert([
      { nombre: 'pendiente' },
      { nombre: 'completada' },
      { nombre: 'cancelada' },
    ])

    // =====================
    // TIPOS RECOMPENSA
    // =====================
    await db.table('tipos_recompensa').multiInsert([
      { nombre: 'descuento', descripcion: 'Descuento porcentual en productos' },
      { nombre: 'producto', descripcion: 'Producto físico canjeable' },
      { nombre: 'cupon', descripcion: 'Cupón de descuento' },
    ])

    // =====================
    // ESTADOS RECOMPENSAS
    // =====================
    await db.table('estados_recompensas').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
      { nombre: 'agotado' },
    ])

    // =====================
    // ESTADOS CANJES
    // =====================
    await db.table('estados_canjes').multiInsert([
      { nombre: 'pendiente' },
      { nombre: 'canjeado' },
      { nombre: 'vencido' },
    ])

    console.log('Seeders ejecutados correctamente')
    await db.table('usuarios').insert({
      id_rol: 1,
      id_estado_usuario: 1,
      nombre: 'Administrador',
      correo: 'admin@test.com',
      password: await hash.make('123456'),
      fecha_registro: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    console.log('Usuario admin creado: admin@test.com / 123456')
  }
}