import { defineConfig } from '@foadonis/openapi'

export default defineConfig({
  ui: 'scalar',
  document: {
    info: {
      title: 'Recycling Points API',
      version: '1.0.0',
      description: 'API para la plataforma de reciclaje y recompensas',
    },
    servers: [
      {
        url: 'https://backend-rp-arreglado-n8p8.onrender.com',
        description: 'Servidor de producción',
      },
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token obtenido al iniciar sesión',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
})
