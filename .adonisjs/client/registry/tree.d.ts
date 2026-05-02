/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  gestionUsuarios: {
    listar: typeof routes['gestion_usuarios.listar']
    crear: typeof routes['gestion_usuarios.crear']
    cambiarEstado: typeof routes['gestion_usuarios.cambiar_estado']
  }
  puntosReciclajes: {
    index: typeof routes['puntos_reciclajes.index']
    store: typeof routes['puntos_reciclajes.store']
    update: typeof routes['puntos_reciclajes.update']
    destroy: typeof routes['puntos_reciclajes.destroy']
  }
  roles: {
    index: typeof routes['roles.index']
    store: typeof routes['roles.store']
    update: typeof routes['roles.update']
    destroy: typeof routes['roles.destroy']
  }
  admins: {
    index: typeof routes['admins.index']
    store: typeof routes['admins.store']
    update: typeof routes['admins.update']
    destroy: typeof routes['admins.destroy']
  }
}
