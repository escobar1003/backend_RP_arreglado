import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: 'bsczq2jyp0c0ier7ihzy-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uw9k92byoe4asegy',
  password: 'B9IjiIAoHSqDxYsAY5ls',
  database: 'bsczq2jyp0c0ier7ihzy',
});

const [rows] = await conn.execute(
  "SELECT ID, USER, HOST, TIME, COMMAND FROM information_schema.PROCESSLIST WHERE USER = 'uw9k92byoe4asegy'"
);
console.log('Active connections:', rows.length);
for (const row of rows) {
  if (row.ID !== conn.threadId) {
    console.log('Killing connection ID:', row.ID, row.TIME + 's', row.COMMAND);
    try { await conn.execute('KILL CONNECTION ' + row.ID); } catch (e) { console.log('  error:', e.message); }
  }
}
await conn.end();
console.log('Done');
