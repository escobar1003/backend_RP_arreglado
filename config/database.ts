import env from '#start/env' // <--- Faltaba esta importación
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  /**
   * Conexión por defecto
   */
  connection: 'mysql',

  connections: {
    /**
     * Configuración de MySQL
     */
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: Number(env.get('DB_PORT', '3306')),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      pool: {
        min: 1,
        max: 1,
        acquireTimeoutMillis: 30000,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },

    /**
     * Puedes dejar SQLite como respaldo si quieres, 
     * pero lo importante es que MySQL esté bien cerrado arriba.
     */
  },
})

export default dbConfig