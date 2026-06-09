FROM node:24-alpine

# Instalar dependencias del sistema necesarias para la IA y Node
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ---> AGREGA ESTAS LÍNEAS AQUÍ <---
ENV HOST=0.0.0.0
ENV PORT=3333
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV APP_URL=https://backend-rp-arreglado-q254.onrender.com
ENV SESSION_DRIVER=cookie
ENV APP_KEY=ClaveSecretaSuperLargaYEstricta12345!
ENV DB_CONNECTION=mysql
ENV DB_HOST=bjdtlyapogyor4ot2kui-mysql.services.clever-cloud.com
ENV DB_PORT=3306
ENV DB_USER=uuf3g42x3zoaywij
ENV DB_PASSWORD=JRW8s4qTsUFpnbs3vAH7
ENV DB_DATABASE=bjdtlyapogyor4ot2kui

# Compilar AdonisJS v6 de forma nativa
RUN node ace build --ignore-ts-errors

EXPOSE 3333

# Comando para arrancar en producción usando el build de Adonis v6
CMD ["node", "build/bin/server.js"]