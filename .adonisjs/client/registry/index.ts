/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'gestion_usuarios.listar': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuarios',
    tokens: [{"old":"/api/usuarios","type":0,"val":"api","end":""},{"old":"/api/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['gestion_usuarios.listar']['types'],
  },
  'gestion_usuarios.crear': {
    methods: ["POST"],
    pattern: '/api/usuarios',
    tokens: [{"old":"/api/usuarios","type":0,"val":"api","end":""},{"old":"/api/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['gestion_usuarios.crear']['types'],
  },
  'gestion_usuarios.cambiar_estado': {
    methods: ["PATCH"],
    pattern: '/api/usuarios/:id/estado',
    tokens: [{"old":"/api/usuarios/:id/estado","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id/estado","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id/estado","type":1,"val":"id","end":""},{"old":"/api/usuarios/:id/estado","type":0,"val":"estado","end":""}],
    types: placeholder as Registry['gestion_usuarios.cambiar_estado']['types'],
  },
  'puntos_reciclajes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/puntos',
    tokens: [{"old":"/api/puntos","type":0,"val":"api","end":""},{"old":"/api/puntos","type":0,"val":"puntos","end":""}],
    types: placeholder as Registry['puntos_reciclajes.index']['types'],
  },
  'puntos_reciclajes.store': {
    methods: ["POST"],
    pattern: '/api/puntos',
    tokens: [{"old":"/api/puntos","type":0,"val":"api","end":""},{"old":"/api/puntos","type":0,"val":"puntos","end":""}],
    types: placeholder as Registry['puntos_reciclajes.store']['types'],
  },
  'puntos_reciclajes.update': {
    methods: ["PUT"],
    pattern: '/api/puntos/:id',
    tokens: [{"old":"/api/puntos/:id","type":0,"val":"api","end":""},{"old":"/api/puntos/:id","type":0,"val":"puntos","end":""},{"old":"/api/puntos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['puntos_reciclajes.update']['types'],
  },
  'puntos_reciclajes.destroy': {
    methods: ["DELETE"],
    pattern: '/api/puntos/:id',
    tokens: [{"old":"/api/puntos/:id","type":0,"val":"api","end":""},{"old":"/api/puntos/:id","type":0,"val":"puntos","end":""},{"old":"/api/puntos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['puntos_reciclajes.destroy']['types'],
  },
  'roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/roles',
    tokens: [{"old":"/api/roles","type":0,"val":"api","end":""},{"old":"/api/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.index']['types'],
  },
  'roles.store': {
    methods: ["POST"],
    pattern: '/api/roles',
    tokens: [{"old":"/api/roles","type":0,"val":"api","end":""},{"old":"/api/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.store']['types'],
  },
  'roles.update': {
    methods: ["PUT"],
    pattern: '/api/roles/:id',
    tokens: [{"old":"/api/roles/:id","type":0,"val":"api","end":""},{"old":"/api/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.update']['types'],
  },
  'roles.destroy': {
    methods: ["DELETE"],
    pattern: '/api/roles/:id',
    tokens: [{"old":"/api/roles/:id","type":0,"val":"api","end":""},{"old":"/api/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.destroy']['types'],
  },
  'admins.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admins',
    tokens: [{"old":"/api/admins","type":0,"val":"api","end":""},{"old":"/api/admins","type":0,"val":"admins","end":""}],
    types: placeholder as Registry['admins.index']['types'],
  },
  'admins.store': {
    methods: ["POST"],
    pattern: '/api/admins',
    tokens: [{"old":"/api/admins","type":0,"val":"api","end":""},{"old":"/api/admins","type":0,"val":"admins","end":""}],
    types: placeholder as Registry['admins.store']['types'],
  },
  'admins.update': {
    methods: ["PUT"],
    pattern: '/api/admins/:id',
    tokens: [{"old":"/api/admins/:id","type":0,"val":"api","end":""},{"old":"/api/admins/:id","type":0,"val":"admins","end":""},{"old":"/api/admins/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admins.update']['types'],
  },
  'admins.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admins/:id',
    tokens: [{"old":"/api/admins/:id","type":0,"val":"api","end":""},{"old":"/api/admins/:id","type":0,"val":"admins","end":""},{"old":"/api/admins/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admins.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
