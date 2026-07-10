import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',

  connections: {
    mysql: {
      client: 'mysql2',

      connection: {
        host: env.get('MYSQL_HOST', env.get('DB_HOST', 'localhost')),
        port: Number(env.get('DB_PORT', '3306')),
        user: env.get('MYSQL_USER', env.get('DB_USER', 'root')),
        password: env.get('MYSQL_PASSWORD', env.get('DB_PASSWORD', '')),
        database: env.get('MYSQL_DB_NAME', env.get('DB_DATABASE', 'reciclyng_points')),
      },

      pool: {
        min: 0,
        max: 1,
        acquireTimeoutMillis: 3000,
        createTimeoutMillis: 3000,
        idleTimeoutMillis: 100,
        reapIntervalMillis: 200,
      },

      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
