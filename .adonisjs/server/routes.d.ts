import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'estados_encargados.index': { paramsTuple?: []; params?: {} }
    'estados_encargados.store': { paramsTuple?: []; params?: {} }
    'estados_encargados.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estados_encargados.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estados_encargados.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
    'deteccion.procesar_camara': { paramsTuple?: []; params?: {} }
    'chat.preguntar': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'estados_encargados.store': { paramsTuple?: []; params?: {} }
    'deteccion.procesar_camara': { paramsTuple?: []; params?: {} }
    'chat.preguntar': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'estados_encargados.index': { paramsTuple?: []; params?: {} }
    'estados_encargados.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'estados_encargados.index': { paramsTuple?: []; params?: {} }
    'estados_encargados.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'estados_encargados.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'estados_encargados.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'estados_encargados.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}