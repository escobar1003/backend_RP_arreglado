import mysql from 'mysql2/promise'

const origin = {
  host: 'bsczq2jyp0c0ier7ihzy-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uw9k92byoe4asegy',
  password: 'B9IjiIAoHSqDxYsAY5ls',
  database: 'bsczq2jyp0c0ier7ihzy',
}

const destination = {
  host: 'thomas.proxy.rlwy.net',
  port: 57548,
  user: 'root',
  password: 'GHLcnmXMdwLeIpWJSXeMgsYRvMQyKpYS',
  database: 'railway',
}

const skipTables = ['adonis_schema', 'adonis_schema_versions']

async function getTables(conn) {
  const [rows] = await conn.query(
    "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE'",
    [conn.config.database]
  )
  return rows.map((r) => r.TABLE_NAME).filter((t) => !skipTables.includes(t))
}

async function getCreateTable(conn, table) {
  const [rows] = await conn.query(`SHOW CREATE TABLE \`${table}\``)
  return rows[0]['Create Table']
}

async function migrate() {
  const originConn = await mysql.createConnection(origin)
  const destConn = await mysql.createConnection(destination)

  try {
    const tables = await getTables(originConn)
    console.log(`Tablas a migrar: ${tables.join(', ')}`)

    for (const table of tables) {
      console.log(`\nMigrando ${table}...`)

      const [rows] = await originConn.query(`SELECT * FROM \`${table}\``)
      if (rows.length === 0) {
        console.log(`  ${table}: sin datos`)
        continue
      }

      const columns = Object.keys(rows[0])
      const placeholders = columns.map(() => '?').join(', ')
      const values = rows.map((row) => columns.map((col) => row[col]))

      for (const rowValues of values) {
        try {
          await destConn.query(
            `INSERT INTO \`${table}\` (${columns.map((c) => '`' + c + '`').join(', ')}) VALUES (${placeholders})`,
            rowValues
          )
        } catch (err) {
          console.log(`  Error insertando en ${table}: ${err.message}`)
        }
      }

      console.log(`  ${table}: ${rows.length} registros migrados`)
    }

    console.log('\n Migración completada!')
  } finally {
    await originConn.end()
    await destConn.end()
  }
}

migrate().catch(console.error)
