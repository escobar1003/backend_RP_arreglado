import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',

  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: Number(env.get('DB_PORT', '3306')),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        ssl: env.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
      },
      pool: {
        min: 1,
        max: 3,
        acquireTimeoutMillis: 15000,
        createTimeoutMillis: 15000,
        idleTimeoutMillis: 10000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
        afterCreate: (conn: any, done: any) => {
          conn.query('SELECT 1', (err: any) => {
            done(err, conn)
          })
        },
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
