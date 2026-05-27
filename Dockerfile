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
ENV SESSION_DRIVER=cookie
ENV APP_KEY=ClaveSecretaSuperLargaYEstricta12345!
ENV DB_CONNECTION=mysql
ENV DB_HOST=bsczq2jyp0c0ier7ihzy-mysql.services.clever-cloud.com
ENV DB_PORT=3306
ENV DB_USER=uw9k92byoe4asegy
ENV DB_PASSWORD=B9IjilAoHSqDxYsAY5ls
ENV DB_DATABASE=bsczq2jyp0c0ier7ihzy

# Compilar AdonisJS v6 de forma nativa
RUN node ace build --ignore-ts-errors

EXPOSE 3333

# Comando para arrancar en producción usando el build de Adonis v6
CMD ["node", "build/bin/server.js"]