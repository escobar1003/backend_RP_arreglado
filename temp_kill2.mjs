import mysql from 'mysql2/promise'
const c = await mysql.createConnection({
  host: 'bsczq2jyp0c0ier7ihzy-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uw9k92byoe4asegy',
  password: 'B9IjiIAoHSqDxYsAY5ls',
  database: 'bsczq2jyp0c0ier7ihzy',
})
const [r] = await c.execute(
  "SELECT ID,USER,TIME,COMMAND FROM information_schema.PROCESSLIST WHERE USER='uw9k92byoe4asegy'"
)
console.log('Active:', r.length)
for (const row of r) {
  if (row.ID !== c.threadId) {
    try {
      await c.execute('KILL CONNECTION ' + row.ID)
      console.log('Killed:', row.ID, row.TIME + 's')
    } catch (e) {
      console.log('Fail:', row.ID, e.message)
    }
  }
}
await c.end()
console.log('Done')
