import db from '@adonisjs/lucid/services/db'

async function seedMateriales() {
  const [existeEstado] = await db.rawQuery(
    'SELECT COUNT(*) as total FROM estados_materiales WHERE id_estado_material = 1'
  )
  if (Number(existeEstado[0]?.total ?? 0) === 0) {
    await db.rawQuery(
      "INSERT INTO estados_materiales (id_estado_material, nombre) VALUES (1, 'Activo')"
    )
  }

  const materiales = [
    { nombre: 'Plástico', puntos_por_kg: 30 },
    { nombre: 'Papel', puntos_por_kg: 15 },
    { nombre: 'Cartón', puntos_por_kg: 20 },
    { nombre: 'Vidrio', puntos_por_kg: 25 },
  ]

  let creados = 0
  for (const mat of materiales) {
    const [existe] = await db.rawQuery(
      'SELECT COUNT(*) as total FROM materiales WHERE nombre = ?',
      [mat.nombre]
    )
    if (Number(existe[0]?.total ?? 0) === 0) {
      await db.table('materiales').insert({
        id_estado_material: 1,
        nombre: mat.nombre,
        puntos_por_kg: mat.puntos_por_kg,
        created_at: new Date(),
        updated_at: new Date(),
      })
      creados++
    }
  }

  console.log(`[seed] ${creados} materiales creados automáticamente`)
}

seedMateriales().catch((err) => {
  console.error('[seed] Error al crear materiales:', err.message)
})
