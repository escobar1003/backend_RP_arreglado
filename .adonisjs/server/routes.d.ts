import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'puntos.asignar': { paramsTuple?: []; params?: {} }
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
    'deteccion.procesar_camara': { paramsTuple?: []; params?: {} }
    'chat.preguntar': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'puntos.asignar': { paramsTuple?: []; params?: {} }
    'deteccion.procesar_camara': { paramsTuple?: []; params?: {} }
    'chat.preguntar': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  POST: {
  }
  DELETE: {
  }
  PUT: {
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}