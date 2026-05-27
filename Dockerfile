FROM node:20-alpine

# Instalar dependencias del sistema si tu backend procesa imágenes localmente
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compilar AdonisJS
RUN node ace build

EXPOSE 3333

# Comando para arrancar en producción
CMD ["node", "build/server.js"]