import mysql from 'mysql2/promise'

const conn = await mysql.createConnection({
  host: 'bsczq2jyp0c0ier7ihzy-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uw9k92byoe4asegy',
  password: 'B9IjiIAoHSqDxYsAY5ls',
  database: 'bsczq2jyp0c0ier7ihzy',
  connectTimeout: 10000,
})

const [processes] = await conn.execute("SHOW FULL PROCESSLIST")
for (const p of processes) {
  if (p.Command === 'Sleep' || p.Time > 10) {
    console.log(`Killing connection ${p.Id} (${p.Command}, ${p.Time}s, ${p.User})`)
    await conn.execute(`KILL ${p.Id}`)
  } else {
    console.log(`Keeping ${p.Id} (${p.Command}, ${p.Time}s)`)
  }
}

await conn.end()
console.log('Done')
