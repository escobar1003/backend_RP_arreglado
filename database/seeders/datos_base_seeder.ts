import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const rolesExisten = await db.from('roles').count('* as total').first()
    if (rolesExisten.$extras.total === 0) {
      await db.table('roles').insert([
        { id_rol: 1, nombre: 'admin', descripcion: 'Administrador' },
        { id_rol: 2, nombre: 'aliado', descripcion: 'Aliado reciclador' },
        { id_rol: 3, nombre: 'usuario', descripcion: 'Usuario de la app' },
        { id_rol: 4, nombre: 'encargado', descripcion: 'Encargado de punto' },
      ])
    }

    const estadosUsuarioExisten = await db.from('estados_usuarios').count('* as total').first()
    if (estadosUsuarioExisten.$extras.total === 0) {
      await db.table('estados_usuarios').insert([
        { id_estado_usuario: 1, nombre: 'activo' },
        { id_estado_usuario: 2, nombre: 'inactivo' },
      ])
    }

    const estadosAliadoExisten = await db.from('estados_aliados').count('* as total').first()
    if (estadosAliadoExisten.$extras.total === 0) {
      await db.table('estados_aliados').insert([
        { id_estado_aliado: 1, nombre: 'activo' },
        { id_estado_aliado: 2, nombre: 'inactivo' },
      ])
    }

    const estadosEntregaExisten = await db.from('estados_entregas').count('* as total').first()
    if (estadosEntregaExisten.$extras.total === 0) {
      await db.table('estados_entregas').insert([
        { id_estado_entrega: 1, nombre: 'pendiente' },
        { id_estado_entrega: 2, nombre: 'completada' },
        { id_estado_entrega: 3, nombre: 'cancelada' },
      ])
    }

    const estadosPuntoExisten = await db.from('estados_puntos').count('* as total').first()
    if (estadosPuntoExisten.$extras.total === 0) {
      await db.table('estados_puntos').insert([
        { id_estado_punto: 1, nombre: 'activo' },
        { id_estado_punto: 2, nombre: 'inactivo' },
      ])
    }

    const estadosCanjeExisten = await db.from('estados_canjes').count('* as total').first()
    if (estadosCanjeExisten.$extras.total === 0) {
      await db.table('estados_canjes').insert([
        { id_estado_canje: 1, nombre: 'pendiente' },
        { id_estado_canje: 2, nombre: 'completado' },
        { id_estado_canje: 3, nombre: 'cancelado' },
      ])
    }

    const estadosRecompensaExisten = await db.from('estados_recompensas').count('* as total').first()
    if (estadosRecompensaExisten.$extras.total === 0) {
      await db.table('estados_recompensas').insert([
        { id_estado_recompensa: 1, nombre: 'activo' },
        { id_estado_recompensa: 2, nombre: 'inactivo' },
      ])
    }

    const estadosMaterialExisten = await db.from('estados_materiales').count('* as total').first()
    if (estadosMaterialExisten.$extras.total === 0) {
      await db.table('estados_materiales').insert([
        { id_estado_material: 1, nombre: 'activo', descripcion: 'Material disponible' },
        { id_estado_material: 2, nombre: 'inactivo', descripcion: 'Material no disponible' },
      ])
    }

    const tiposRecompensaExisten = await db.from('tipos_recompensa').count('* as total').first()
    if (tiposRecompensaExisten.$extras.total === 0) {
      await db.table('tipos_recompensa').insert([
        { id_tipo_recompensa: 1, nombre: 'descuento', descripcion: 'Descuento en productos' },
        { id_tipo_recompensa: 2, nombre: 'producto', descripcion: 'Producto físico' },
        { id_tipo_recompensa: 3, nombre: 'cupon', descripcion: 'Cupón de descuento' },
      ])
    }
  }
}