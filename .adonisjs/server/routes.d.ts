import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'gestion_usuarios.listar': { paramsTuple?: []; params?: {} }
    'gestion_usuarios.crear': { paramsTuple?: []; params?: {} }
    'gestion_usuarios.cambiar_estado': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.store': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'puntos_reciclajes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.index': { paramsTuple?: []; params?: {} }
    'admins.store': { paramsTuple?: []; params?: {} }
    'admins.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'gestion_usuarios.listar': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'admins.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'gestion_usuarios.listar': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'admins.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'gestion_usuarios.crear': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.store': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'admins.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'gestion_usuarios.cambiar_estado': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'puntos_reciclajes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'puntos_reciclajes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admins.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}