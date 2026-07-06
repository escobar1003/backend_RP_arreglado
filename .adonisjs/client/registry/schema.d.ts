/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'puntos_reciclajes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/puntos-reciclaje'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/puntos_reciclajes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/puntos_reciclajes_controller').default['index']>>>
    }
  }
  'puntos_reciclajes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/puntos-reciclaje/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/puntos_reciclajes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/puntos_reciclajes_controller').default['show']>>>
    }
  }
  'chatbot.preguntar': {
    methods: ["POST"]
    pattern: '/api/chatbot'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chatbot_controller').default['preguntar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chatbot_controller').default['preguntar']>>>
    }
  }
  'aliados.lista_publica': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliados-lista'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['listaPublica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['listaPublica']>>>
    }
  }
  'login.iniciar_sesion': {
    methods: ["POST"]
    pattern: '/api/auth/iniciar-sesion'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/login').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/login').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/login_controller').default['iniciarSesion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/login_controller').default['iniciarSesion']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'registros.registrarse': {
    methods: ["POST"]
    pattern: '/api/auth/registrarse'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/registros_controller').default['registrarse']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/registros_controller').default['registrarse']>>>
    }
  }
  'solicitudes_registro.solicitar': {
    methods: ["POST"]
    pattern: '/api/auth/solicitar-registro'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['solicitar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['solicitar']>>>
    }
  }
  'recuperar_passwords.solicitar_codigo': {
    methods: ["POST"]
    pattern: '/api/auth/recuperar-password/solicitar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/recuperar_password').solicitarCodigoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/recuperar_password').solicitarCodigoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/recuperar_passwords_controller').default['solicitarCodigo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/recuperar_passwords_controller').default['solicitarCodigo']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'recuperar_passwords.verificar_codigo': {
    methods: ["POST"]
    pattern: '/api/auth/recuperar-password/verificar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/recuperar_password').verificarCodigoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/recuperar_password').verificarCodigoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/recuperar_passwords_controller').default['verificarCodigo']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/recuperar_passwords_controller').default['verificarCodigo']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'recuperar_passwords.restablecer_password': {
    methods: ["POST"]
    pattern: '/api/auth/recuperar-password/restablecer'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/recuperar_password').restablecerPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/recuperar_password').restablecerPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/recuperar_passwords_controller').default['restablecerPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/recuperar_passwords_controller').default['restablecerPassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'login.cerrar_sesion': {
    methods: ["DELETE"]
    pattern: '/api/auth/cerrar-sesion'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/login_controller').default['cerrarSesion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/login_controller').default['cerrarSesion']>>>
    }
  }
  'solicitudes_registro.listar': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/solicitudes-registro'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['listar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['listar']>>>
    }
  }
  'solicitudes_registro.pendientes_count': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/solicitudes-registro/pendientes-count'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['pendientesCount']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['pendientesCount']>>>
    }
  }
  'solicitudes_registro.aprobar': {
    methods: ["PUT"]
    pattern: '/api/admin/solicitudes-registro/:id/aprobar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['aprobar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['aprobar']>>>
    }
  }
  'solicitudes_registro.rechazar': {
    methods: ["PUT"]
    pattern: '/api/admin/solicitudes-registro/:id/rechazar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['rechazar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/solicitudes_registro_controller').default['rechazar']>>>
    }
  }
  'administradores.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/admins'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['index']>>>
    }
  }
  'administradores.store': {
    methods: ["POST"]
    pattern: '/api/admin/admins'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['store']>>>
    }
  }
  'administradores.update': {
    methods: ["PUT"]
    pattern: '/api/admin/admins/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['update']>>>
    }
  }
  'administradores.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/admins/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/administradores_controller').default['destroy']>>>
    }
  }
  'encargados.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/encargados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['index']>>>
    }
  }
  'encargados.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/encargados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['show']>>>
    }
  }
  'encargados.store': {
    methods: ["POST"]
    pattern: '/api/admin/encargados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['store']>>>
    }
  }
  'encargados.update': {
    methods: ["PUT"]
    pattern: '/api/admin/encargados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['update']>>>
    }
  }
  'encargados.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/encargados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['destroy']>>>
    }
  }
  'encargados.asignar_punto': {
    methods: ["PUT"]
    pattern: '/api/admin/encargados/:id/asignar-punto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['asignarPunto']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/encargados_controller').default['asignarPunto']>>>
    }
  }
  'usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['index']>>>
    }
  }
  'usuarios.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['show']>>>
    }
  }
  'usuarios.store': {
    methods: ["POST"]
    pattern: '/api/admin/usuarios'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/usuario').crearUsuarioValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/usuario').crearUsuarioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'usuarios.update': {
    methods: ["PUT"]
    pattern: '/api/admin/usuarios/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/usuario').actualizarUsuarioValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/usuario').actualizarUsuarioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'usuarios.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/usuarios_controller').default['destroy']>>>
    }
  }
  'aliados.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/aliados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['index']>>>
    }
  }
  'aliados.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['show']>>>
    }
  }
  'aliados.store': {
    methods: ["POST"]
    pattern: '/api/admin/aliados'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/aliado').crearAliadoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/aliado').crearAliadoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'aliados.update': {
    methods: ["PUT"]
    pattern: '/api/admin/aliados/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/aliado').actualizarAliadoValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/aliado').actualizarAliadoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'aliados.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['destroy']>>>
    }
  }
  'aliados.materiales': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/aliados/:id/materiales'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['materiales']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['materiales']>>>
    }
  }
  'aliados.sincronizar_materiales': {
    methods: ["PUT"]
    pattern: '/api/admin/aliados/:id/materiales'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['sincronizarMateriales']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/aliados_controller').default['sincronizarMateriales']>>>
    }
  }
  'materiales.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/materiales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['index']>>>
    }
  }
  'materiales.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/materiales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['show']>>>
    }
  }
  'materiales.store': {
    methods: ["POST"]
    pattern: '/api/admin/materiales'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/material').crearMaterialValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/material').crearMaterialValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'materiales.update': {
    methods: ["PUT"]
    pattern: '/api/admin/materiales/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/material').actualizarMaterialValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/material').actualizarMaterialValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'materiales.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/materiales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/materiales_controller').default['destroy']>>>
    }
  }
  'recompensas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['index']>>>
    }
  }
  'recompensas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['show']>>>
    }
  }
  'recompensas.store': {
    methods: ["POST"]
    pattern: '/api/admin/recompensas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/recompensa').crearRecompensaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/recompensa').crearRecompensaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'recompensas.update': {
    methods: ["PUT"]
    pattern: '/api/admin/recompensas/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/recompensa').actualizarRecompensaValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/recompensa').actualizarRecompensaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'recompensas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/recompensas_controller').default['destroy']>>>
    }
  }
  'roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['index']>>>
    }
  }
  'roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['show']>>>
    }
  }
  'roles.store': {
    methods: ["POST"]
    pattern: '/api/admin/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['store']>>>
    }
  }
  'roles.update': {
    methods: ["PUT"]
    pattern: '/api/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['update']>>>
    }
  }
  'roles.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/roles_controller').default['destroy']>>>
    }
  }
  'puntos.ajustar_puntos': {
    methods: ["POST"]
    pattern: '/api/admin/usuarios/:idUsuario/ajustar-puntos'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { idUsuario: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/puntos_controller').default['ajustarPuntos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/puntos_controller').default['ajustarPuntos']>>>
    }
  }
  'estados_materiales.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-materiales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['index']>>>
    }
  }
  'estados_materiales.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-materiales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['show']>>>
    }
  }
  'estados_materiales.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-materiales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['store']>>>
    }
  }
  'estados_materiales.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-materiales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['update']>>>
    }
  }
  'estados_materiales.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-materiales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_materiales_controller').default['destroy']>>>
    }
  }
  'estados_puntos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-puntos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['index']>>>
    }
  }
  'estados_puntos.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-puntos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['show']>>>
    }
  }
  'estados_puntos.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-puntos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['store']>>>
    }
  }
  'estados_puntos.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-puntos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['update']>>>
    }
  }
  'estados_puntos.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-puntos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_puntos_controller').default['destroy']>>>
    }
  }
  'estados_entregas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['index']>>>
    }
  }
  'estados_entregas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['show']>>>
    }
  }
  'estados_entregas.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['store']>>>
    }
  }
  'estados_entregas.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['update']>>>
    }
  }
  'estados_entregas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_entregas_controller').default['destroy']>>>
    }
  }
  'entregas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/entregas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/entregas_controller').default['index']>>>
    }
  }
  'entregas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/entregas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/entregas_controller').default['show']>>>
    }
  }
  'entregas.actualizar_estado': {
    methods: ["PUT"]
    pattern: '/api/admin/entregas/:id/estado'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/entregas_controller').default['actualizarEstado']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/entregas_controller').default['actualizarEstado']>>>
    }
  }
  'estadisticas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estadisticas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estadisticas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estadisticas_controller').default['index']>>>
    }
  }
  'estados_aliados.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-aliados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['index']>>>
    }
  }
  'estados_aliados.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['show']>>>
    }
  }
  'estados_aliados.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-aliados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['store']>>>
    }
  }
  'estados_aliados.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['update']>>>
    }
  }
  'estados_aliados.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_aliados_controller').default['destroy']>>>
    }
  }
  'estados_canjes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-canjes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['index']>>>
    }
  }
  'estados_canjes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-canjes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['show']>>>
    }
  }
  'estados_canjes.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-canjes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['store']>>>
    }
  }
  'estados_canjes.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-canjes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['update']>>>
    }
  }
  'estados_canjes.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-canjes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_canjes_controller').default['destroy']>>>
    }
  }
  'estados_usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['index']>>>
    }
  }
  'estados_usuarios.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['show']>>>
    }
  }
  'estados_usuarios.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['store']>>>
    }
  }
  'estados_usuarios.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['update']>>>
    }
  }
  'estados_usuarios.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_usuarios_controller').default['destroy']>>>
    }
  }
  'estados_recompensas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['index']>>>
    }
  }
  'estados_recompensas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['show']>>>
    }
  }
  'estados_recompensas.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['store']>>>
    }
  }
  'estados_recompensas.update': {
    methods: ["PUT"]
    pattern: '/api/admin/estados-recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['update']>>>
    }
  }
  'estados_recompensas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/estados_recompensas_controller').default['destroy']>>>
    }
  }
  'tipos_recompensas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/tipos-recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['index']>>>
    }
  }
  'tipos_recompensas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/tipos-recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['show']>>>
    }
  }
  'tipos_recompensas.store': {
    methods: ["POST"]
    pattern: '/api/admin/tipos-recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['store']>>>
    }
  }
  'tipos_recompensas.update': {
    methods: ["PUT"]
    pattern: '/api/admin/tipos-recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['update']>>>
    }
  }
  'tipos_recompensas.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/tipos-recompensas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/tipos_recompensas_controller').default['destroy']>>>
    }
  }
  'zonas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/zonas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/zonas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/zonas_controller').default['index']>>>
    }
  }
  'estados_encargados.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-encargados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'estados_encargados.store': {
    methods: ["POST"]
    pattern: '/api/admin/estados-encargados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'estados_encargados.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/estados-encargados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'estados_encargados.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/admin/estados-encargados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'estados_encargados.destroy': {
    methods: ["DELETE"]
    pattern: '/api/admin/estados-encargados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'perfil_admin.mostrar': {
    methods: ["GET","HEAD"]
    pattern: '/api/admin/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/perfil_admin_controller').default['mostrar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/perfil_admin_controller').default['mostrar']>>>
    }
  }
  'perfil_admin.actualizar': {
    methods: ["PUT"]
    pattern: '/api/admin/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/perfil_admin_controller').default['actualizar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/perfil_admin_controller').default['actualizar']>>>
    }
  }
  'puntos_reciclajes.store': {
    methods: ["POST"]
    pattern: '/api/admin/aliados/:id/punto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['store']>>>
    }
  }
  'puntos_reciclajes.update': {
    methods: ["PUT"]
    pattern: '/api/admin/aliados/:id/punto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['update']>>>
    }
  }
  'perfil.mostrar': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/perfil_controller').default['mostrar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/perfil_controller').default['mostrar']>>>
    }
  }
  'perfil.actualizar': {
    methods: ["PUT"]
    pattern: '/api/usuario/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/perfil_controller').default['actualizar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/perfil_controller').default['actualizar']>>>
    }
  }
  'perfil.cambiar_password': {
    methods: ["PUT"]
    pattern: '/api/usuario/perfil/cambiar-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/perfil_controller').default['cambiarPassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/perfil_controller').default['cambiarPassword']>>>
    }
  }
  'foto_perfils.store': {
    methods: ["POST"]
    pattern: '/api/usuario/perfil/foto'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/foto_perfils_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/foto_perfils_controller').default['store']>>>
    }
  }
  'entregas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/entregas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/entregas_controller').default['index']>>>
    }
  }
  'entregas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/entregas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/entregas_controller').default['show']>>>
    }
  }
  'entregas.store': {
    methods: ["POST"]
    pattern: '/api/usuario/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/entregas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/entregas_controller').default['store']>>>
    }
  }
  'puntos.resumen': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/puntos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/puntos_controller').default['resumen']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/puntos_controller').default['resumen']>>>
    }
  }
  'puntos.historial': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/puntos/historial'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/puntos_controller').default['historial']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/puntos_controller').default['historial']>>>
    }
  }
  'canjes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/canjes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/canjes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/canjes_controller').default['index']>>>
    }
  }
  'canjes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/canjes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/canjes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/canjes_controller').default['show']>>>
    }
  }
  'canjes.store': {
    methods: ["POST"]
    pattern: '/api/usuario/canjes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/canjes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/canjes_controller').default['store']>>>
    }
  }
  'recompensas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/recompensas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/recompensas_controller').default['index']>>>
    }
  }
  'aliados_usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/aliados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/aliados_usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/aliados_usuarios_controller').default['index']>>>
    }
  }
  'reservas_usuario.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/reservas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['index']>>>
    }
  }
  'reservas_usuario.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/reservas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['show']>>>
    }
  }
  'reservas_usuario.store': {
    methods: ["POST"]
    pattern: '/api/usuario/reservas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/usuario/reserva').crearReservaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/usuario/reserva').crearReservaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reservas_usuario.cancelar': {
    methods: ["PUT"]
    pattern: '/api/usuario/reservas/:id/cancelar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['cancelar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['cancelar']>>>
    }
  }
  'reservas_usuario.destroy': {
    methods: ["DELETE"]
    pattern: '/api/usuario/reservas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/reservas_usuario_controller').default['destroy']>>>
    }
  }
  'reserva_imagenes.store': {
    methods: ["POST"]
    pattern: '/api/usuario/reservas/:id/imagenes'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/reserva_imagenes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/reserva_imagenes_controller').default['store']>>>
    }
  }
  'notificaciones_usuario.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuario/notificaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/notificaciones_usuario_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/notificaciones_usuario_controller').default['index']>>>
    }
  }
  'notificaciones_usuario.marcar_leida': {
    methods: ["PUT"]
    pattern: '/api/usuario/notificaciones/:id/leer'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/notificaciones_usuario_controller').default['marcarLeida']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/notificaciones_usuario_controller').default['marcarLeida']>>>
    }
  }
  'notificaciones_usuario.marcar_todas_leidas': {
    methods: ["PUT"]
    pattern: '/api/usuario/notificaciones/leer-todas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuario/notificaciones_usuario_controller').default['marcarTodasLeidas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuario/notificaciones_usuario_controller').default['marcarTodasLeidas']>>>
    }
  }
  'perfil_aliado.mostrar': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliado/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['mostrar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['mostrar']>>>
    }
  }
  'perfil_aliado.actualizar': {
    methods: ["PUT"]
    pattern: '/api/aliado/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['actualizar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['actualizar']>>>
    }
  }
  'perfil_aliado.agregar_punto': {
    methods: ["POST"]
    pattern: '/api/aliado/perfil/puntos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['agregarPunto']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['agregarPunto']>>>
    }
  }
  'perfil_aliado.actualizar_punto': {
    methods: ["PUT"]
    pattern: '/api/aliado/perfil/puntos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['actualizarPunto']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/perfil_aliado_controller').default['actualizarPunto']>>>
    }
  }
  'entregas_aliado.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliado/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/entregas_aliado_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/entregas_aliado_controller').default['index']>>>
    }
  }
  'entregas_aliado.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliado/entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/entregas_aliado_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/entregas_aliado_controller').default['show']>>>
    }
  }
  'entregas_aliado.actualizar_estado': {
    methods: ["PUT"]
    pattern: '/api/aliado/entregas/:id/estado'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/entregas_aliado_controller').default['actualizarEstado']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/entregas_aliado_controller').default['actualizarEstado']>>>
    }
  }
  'clasificacion.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliado/clasificaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/clasificacion_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/clasificacion_controller').default['index']>>>
    }
  }
  'clasificacion.store': {
    methods: ["POST"]
    pattern: '/api/aliado/clasificaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliado/clasificacion_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliado/clasificacion_controller').default['store']>>>
    }
  }
  'reservas_encargado.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/reservas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['index']>>>
    }
  }
  'reservas_encargado.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/reservas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['show']>>>
    }
  }
  'reservas_encargado.store': {
    methods: ["POST"]
    pattern: '/api/encargado/reservas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['store']>>>
    }
  }
  'reservas_encargado.update': {
    methods: ["PUT"]
    pattern: '/api/encargado/reservas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['update']>>>
    }
  }
  'reservas_encargado.destroy': {
    methods: ["DELETE"]
    pattern: '/api/encargado/reservas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/reservas_encargado_controller').default['destroy']>>>
    }
  }
  'materiales.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/materiales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/materiales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/materiales_controller').default['index']>>>
    }
  }
  'notificaciones.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/notificaciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/notificaciones_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/notificaciones_controller').default['index']>>>
    }
  }
  'notificaciones.marcar_todas_leidas': {
    methods: ["PUT"]
    pattern: '/api/encargado/notificaciones/leer-todas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/notificaciones_controller').default['marcarTodasLeidas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/notificaciones_controller').default['marcarTodasLeidas']>>>
    }
  }
  'notificaciones.marcar_leida': {
    methods: ["PUT"]
    pattern: '/api/encargado/notificaciones/:id/leer'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/notificaciones_controller').default['marcarLeida']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/notificaciones_controller').default['marcarLeida']>>>
    }
  }
  'perfil_encargado.mostrar': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/perfil_encargado_controller').default['mostrar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/perfil_encargado_controller').default['mostrar']>>>
    }
  }
  'perfil_encargado.actualizar': {
    methods: ["PUT"]
    pattern: '/api/encargado/perfil'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/perfil_encargado_controller').default['actualizar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/perfil_encargado_controller').default['actualizar']>>>
    }
  }
  'entregas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['index']>>>
    }
  }
  'entregas.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/entregas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['show']>>>
    }
  }
  'entregas.store': {
    methods: ["POST"]
    pattern: '/api/encargado/entregas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['store']>>>
    }
  }
  'entregas.actualizar_estado': {
    methods: ["PUT"]
    pattern: '/api/encargado/entregas/:id/estado'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['actualizarEstado']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['actualizarEstado']>>>
    }
  }
  'entregas.comprobante': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/entregas/:id/comprobante'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['comprobante']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/entregas_controller').default['comprobante']>>>
    }
  }
  'canjes_encargado.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/canjes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['index']>>>
    }
  }
  'canjes_encargado.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/canjes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['show']>>>
    }
  }
  'canjes_encargado.store': {
    methods: ["POST"]
    pattern: '/api/encargado/canjes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['store']>>>
    }
  }
  'canjes_encargado.actualizar_estado': {
    methods: ["PUT"]
    pattern: '/api/encargado/canjes/:id/estado'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['actualizarEstado']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['actualizarEstado']>>>
    }
  }
  'canjes_encargado.validar': {
    methods: ["PUT"]
    pattern: '/api/encargado/canjes/:id/validar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['validar']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/canjes_encargado_controller').default['validar']>>>
    }
  }
  'recompensas.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/recompensas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/recompensas_controller').default['index']>>>
    }
  }
  'recompensas.store': {
    methods: ["POST"]
    pattern: '/api/encargado/recompensas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/recompensas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/recompensas_controller').default['store']>>>
    }
  }
  'usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/encargado/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/encargado/usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/encargado/usuarios_controller').default['index']>>>
    }
  }
  'puntos_reciclajes.store': {
    methods: ["POST"]
    pattern: '/api/encargado/aliados/:id/punto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['store']>>>
    }
  }
  'puntos_reciclajes.update': {
    methods: ["PUT"]
    pattern: '/api/encargado/aliados/:id/punto'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/puntos_reciclajes_controller').default['update']>>>
    }
  }
  'openapi.html': {
    methods: ["GET","HEAD"]
    pattern: '/swagger'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'openapi.json': {
    methods: ["GET","HEAD"]
    pattern: '/swagger.json'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'openapi.yaml': {
    methods: ["GET","HEAD"]
    pattern: '/swagger.yaml'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'deteccion.procesar_camara': {
    methods: ["POST"]
    pattern: '/api/detectar-material'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'chat.preguntar': {
    methods: ["POST"]
    pattern: '/api/chat'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
