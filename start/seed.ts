import db from '@adonisjs/lucid/services/db'

async function seedMateriales() {
  const [row] = await db.rawQuery('SELECT COUNT(*) as total FROM materiales')
  if (Number(row[0]?.total ?? 0) > 0) return

  const [estados] = await db.rawQuery('SELECT COUNT(*) as total FROM estados_materiales')
  if (Number(estados[0]?.total ?? 0) === 0) {
    await db.rawQuery("INSERT INTO estados_materiales (id_estado_material, nombre) VALUES (1, 'Activo')")
  }

  await db.rawQuery(
    `INSERT INTO materiales (id_material, nombre, puntos_por_kg, id_estado_material) VALUES
      (1, 'Plástico', 30, 1),
      (2, 'Papel',    15, 1),
      (3, 'Cartón',   20, 1),
      (4, 'Vidrio',   25, 1)`
  )

  console.log('[seed] 4 materiales creados automáticamente')
}

seedMateriales().catch((err) => {
  console.error('[seed] Error al crear materiales:', err.message)
})