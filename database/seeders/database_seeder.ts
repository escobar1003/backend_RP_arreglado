import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import Usuario from '#models/usuario'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    // ROLES

    await db.table('roles').multiInsert([
      { nombre: 'admin', descripcion: 'Administrador del sistema' },
      { nombre: 'aliado', descripcion: 'Punto de reciclaje en supermercado aliado' },
      { nombre: 'usuario', descripcion: 'Usuario que recicla y acumula puntos' },
      { nombre: 'encargado', descripcion: 'Persona que recibe material,asigna puntos a Usuarios ' },
      { nombre: 'superadmin', descripcion: 'Super Administrador del sistema' },
    ])

    // ESTADOS USUARIOS

    await db
      .table('estados_usuarios')
      .multiInsert([{ nombre: 'activo' }, { nombre: 'inactivo' }, { nombre: 'suspendido' }])

    await db.table('estados_encargados').multiInsert([{ nombre: 'activo' }, { nombre: 'inactivo' }])

    // ESTADOS ALIADOS

    await db.table('estados_aliados').multiInsert([{ nombre: 'activo' }, { nombre: 'inactivo' }])

    // ESTADOS MATERIALES

    await db.table('estados_materiales').multiInsert([{ nombre: 'activo' }, { nombre: 'inactivo' }])

    // ESTADOS PUNTOS

    await db
      .table('estados_puntos')
      .multiInsert([{ nombre: 'activo' }, { nombre: 'inactivo' }, { nombre: 'mantenimiento' }])

    // ESTADOS ENTREGAS

    await db
      .table('estados_entregas')
      .multiInsert([{ nombre: 'pendiente' }, { nombre: 'completada' }, { nombre: 'cancelada' }])

    // TIPOS RECOMPENSA

    await db.table('tipos_recompensa').multiInsert([
      { nombre: 'descuento', descripcion: 'Descuento porcentual en productos' },
      { nombre: 'producto', descripcion: 'Producto físico canjeable' },
      { nombre: 'cupon', descripcion: 'Cupón de descuento' },
    ])

    // ESTADOS RECOMPENSAS
    await db
      .table('estados_recompensas')
      .multiInsert([{ nombre: 'activo' }, { nombre: 'inactivo' }, { nombre: 'agotado' }])

    // ESTADOS CANJES

    await db
      .table('estados_canjes')
      .multiInsert([{ nombre: 'pendiente' }, { nombre: 'canjeado' }, { nombre: 'vencido' }])

    const adminExiste = await db.from('usuarios').where('correo', 'admin@test.com').first()
    if (!adminExiste) {
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

    const superadminExiste = await Usuario.findBy('correo', 'superadmin@test.com')
    if (!superadminExiste) {
      await db.table('usuarios').insert({
        id_rol: 5,
        id_estado_usuario: 1,
        nombre: 'Super Administrador',
        correo: 'superadmin@test.com',
        password: await hash.make('123456'),
        fecha_registro: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      })
    }
    // MATERIALES
    const materialesData = [
      {
        id_estado_material: 1,
        nombre: 'Plástico',
        descripcion: 'Botellas y envases plásticos',
        tipo_residuo: 'reciclable',
        color_caneca: 'azul',
        puntos_por_kg: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_estado_material: 1,
        nombre: 'Cartón',
        descripcion: 'Cajas y papel cartón',
        tipo_residuo: 'reciclable',
        color_caneca: 'gris',
        puntos_por_kg: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_estado_material: 1,
        nombre: 'Vidrio',
        descripcion: 'Botellas y frascos de vidrio',
        tipo_residuo: 'reciclable',
        color_caneca: 'blanco',
        puntos_por_kg: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    for (const mat of materialesData) {
      const [existe] = await db.rawQuery(
        'SELECT COUNT(*) as total FROM materiales WHERE nombre = ?',
        [mat.nombre]
      )
      if (Number(existe[0]?.total ?? 0) === 0) {
        await db.table('materiales').insert(mat)
      }
    }

    console.log('Materiales creados')

    // ALIADO
    const [idAliado] = await db.table('aliados').insert({
      id_estado_aliado: 1,
      nombre: 'Supermercado Test',
      tipo_negocio: 'Supermercado',
      descripcion: 'Aliado de prueba',
      direccion: 'Calle 123 # 45-67',
      telefono: '3001234567',
      correo: 'aliado@test.com',
      created_at: new Date(),
      updated_at: new Date(),
    })

    console.log('Aliado creado con id:', idAliado)

    // ENCARGADO

    const [idEncargado] = await db.table('usuarios').insert({
      id_rol: 4,
      id_estado_usuario: 1,
      nombre: 'Encargado Test',
      correo: 'encargado@test.com',
      password: await hash.make('123456'),
      fecha_registro: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    console.log('Encargado creado con id:', idEncargado)

    // PUNTO DE RECICLAJE

    const [idPunto] = await db.table('puntos_reciclaje').insert({
      id_estado_punto: 1,
      id_aliado: idAliado,
      id_encargado: idEncargado,
      nombre: 'Punto Reciclaje Test',
      direccion: 'Calle 123 # 45-67',
      latitud: 4.711,
      longitud: -74.0721,
      horario: 'Lunes a Viernes 8am - 6pm',
      created_at: new Date(),
      updated_at: new Date(),
    })

    // ASIGNAR MATERIALES AL PUNTO DE RECICLAJE
    const materiales = await db.from('materiales').select('id_material')
    const materialIds = materiales.map((m: { id_material: number }) => m.id_material)
    if (materialIds.length > 0) {
      await db.table('punto_material').multiInsert(
        materialIds.map((id_material: number) => ({
          id_punto: idPunto,
          id_material,
        }))
      )
      console.log(`Materiales asignados al punto: ${materialIds.join(', ')}`)
    }

    console.log(`Punto creado (id: ${idPunto}) → encargado (id: ${idEncargado})`)

    console.log('Seeders ejecutados correctamente')
  }
}
