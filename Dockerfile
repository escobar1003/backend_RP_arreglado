FROM node:24-alpine

# Instalar dependencias del sistema necesarias para la IA y Node
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compilar AdonisJS v6 de forma nativa
RUN node ace build

EXPOSE 3333

# Comando para arrancar en producción usando el build de Adonis v6
CMD ["node", "build/bin/server.js"]