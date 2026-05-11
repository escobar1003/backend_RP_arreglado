/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'login.iniciar_sesion': {
    methods: ["POST"],
    pattern: '/api/auth/iniciar-sesion',
    tokens: [{"old":"/api/auth/iniciar-sesion","type":0,"val":"api","end":""},{"old":"/api/auth/iniciar-sesion","type":0,"val":"auth","end":""},{"old":"/api/auth/iniciar-sesion","type":0,"val":"iniciar-sesion","end":""}],
    types: placeholder as Registry['login.iniciar_sesion']['types'],
  },
  'registros.registrarse': {
    methods: ["POST"],
    pattern: '/api/auth/registrarse',
    tokens: [{"old":"/api/auth/registrarse","type":0,"val":"api","end":""},{"old":"/api/auth/registrarse","type":0,"val":"auth","end":""},{"old":"/api/auth/registrarse","type":0,"val":"registrarse","end":""}],
    types: placeholder as Registry['registros.registrarse']['types'],
  },
  'recuperar_passwords.solicitar_codigo': {
    methods: ["POST"],
    pattern: '/api/auth/recuperar-password/solicitar',
    tokens: [{"old":"/api/auth/recuperar-password/solicitar","type":0,"val":"api","end":""},{"old":"/api/auth/recuperar-password/solicitar","type":0,"val":"auth","end":""},{"old":"/api/auth/recuperar-password/solicitar","type":0,"val":"recuperar-password","end":""},{"old":"/api/auth/recuperar-password/solicitar","type":0,"val":"solicitar","end":""}],
    types: placeholder as Registry['recuperar_passwords.solicitar_codigo']['types'],
  },
  'recuperar_passwords.restablecer_password': {
    methods: ["POST"],
    pattern: '/api/auth/recuperar-password/restablecer',
    tokens: [{"old":"/api/auth/recuperar-password/restablecer","type":0,"val":"api","end":""},{"old":"/api/auth/recuperar-password/restablecer","type":0,"val":"auth","end":""},{"old":"/api/auth/recuperar-password/restablecer","type":0,"val":"recuperar-password","end":""},{"old":"/api/auth/recuperar-password/restablecer","type":0,"val":"restablecer","end":""}],
    types: placeholder as Registry['recuperar_passwords.restablecer_password']['types'],
  },
  'login.cerrar_sesion': {
    methods: ["DELETE"],
    pattern: '/api/auth/cerrar-sesion',
    tokens: [{"old":"/api/auth/cerrar-sesion","type":0,"val":"api","end":""},{"old":"/api/auth/cerrar-sesion","type":0,"val":"auth","end":""},{"old":"/api/auth/cerrar-sesion","type":0,"val":"cerrar-sesion","end":""}],
    types: placeholder as Registry['login.cerrar_sesion']['types'],
  },
  'administradores.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/admins',
    tokens: [{"old":"/api/admin/admins","type":0,"val":"api","end":""},{"old":"/api/admin/admins","type":0,"val":"admin","end":""},{"old":"/api/admin/admins","type":0,"val":"admins","end":""}],
    types: placeholder as Registry['administradores.index']['types'],
  },
  'administradores.store': {
    methods: ["POST"],
    pattern: '/api/admin/admins',
    tokens: [{"old":"/api/admin/admins","type":0,"val":"api","end":""},{"old":"/api/admin/admins","type":0,"val":"admin","end":""},{"old":"/api/admin/admins","type":0,"val":"admins","end":""}],
    types: placeholder as Registry['administradores.store']['types'],
  },
  'administradores.update': {
    methods: ["PUT"],
    pattern: '/api/admin/admins/:id',
    tokens: [{"old":"/api/admin/admins/:id","type":0,"val":"api","end":""},{"old":"/api/admin/admins/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/admins/:id","type":0,"val":"admins","end":""},{"old":"/api/admin/admins/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['administradores.update']['types'],
  },
  'administradores.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/admins/:id',
    tokens: [{"old":"/api/admin/admins/:id","type":0,"val":"api","end":""},{"old":"/api/admin/admins/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/admins/:id","type":0,"val":"admins","end":""},{"old":"/api/admin/admins/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['administradores.destroy']['types'],
  },
  'usuarios.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/usuarios',
    tokens: [{"old":"/api/admin/usuarios","type":0,"val":"api","end":""},{"old":"/api/admin/usuarios","type":0,"val":"admin","end":""},{"old":"/api/admin/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.index']['types'],
  },
  'usuarios.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/usuarios/:id',
    tokens: [{"old":"/api/admin/usuarios/:id","type":0,"val":"api","end":""},{"old":"/api/admin/usuarios/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/api/admin/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.show']['types'],
  },
  'usuarios.update': {
    methods: ["PUT"],
    pattern: '/api/admin/usuarios/:id',
    tokens: [{"old":"/api/admin/usuarios/:id","type":0,"val":"api","end":""},{"old":"/api/admin/usuarios/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/api/admin/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.update']['types'],
  },
  'usuarios.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/usuarios/:id',
    tokens: [{"old":"/api/admin/usuarios/:id","type":0,"val":"api","end":""},{"old":"/api/admin/usuarios/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/api/admin/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.destroy']['types'],
  },
  'aliados.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/aliados',
    tokens: [{"old":"/api/admin/aliados","type":0,"val":"api","end":""},{"old":"/api/admin/aliados","type":0,"val":"admin","end":""},{"old":"/api/admin/aliados","type":0,"val":"aliados","end":""}],
    types: placeholder as Registry['aliados.index']['types'],
  },
  'aliados.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/aliados/:id',
    tokens: [{"old":"/api/admin/aliados/:id","type":0,"val":"api","end":""},{"old":"/api/admin/aliados/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/aliados/:id","type":0,"val":"aliados","end":""},{"old":"/api/admin/aliados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['aliados.show']['types'],
  },
  'aliados.store': {
    methods: ["POST"],
    pattern: '/api/admin/aliados',
    tokens: [{"old":"/api/admin/aliados","type":0,"val":"api","end":""},{"old":"/api/admin/aliados","type":0,"val":"admin","end":""},{"old":"/api/admin/aliados","type":0,"val":"aliados","end":""}],
    types: placeholder as Registry['aliados.store']['types'],
  },
  'aliados.update': {
    methods: ["PUT"],
    pattern: '/api/admin/aliados/:id',
    tokens: [{"old":"/api/admin/aliados/:id","type":0,"val":"api","end":""},{"old":"/api/admin/aliados/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/aliados/:id","type":0,"val":"aliados","end":""},{"old":"/api/admin/aliados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['aliados.update']['types'],
  },
  'aliados.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/aliados/:id',
    tokens: [{"old":"/api/admin/aliados/:id","type":0,"val":"api","end":""},{"old":"/api/admin/aliados/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/aliados/:id","type":0,"val":"aliados","end":""},{"old":"/api/admin/aliados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['aliados.destroy']['types'],
  },
  'materiales.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/materiales',
    tokens: [{"old":"/api/admin/materiales","type":0,"val":"api","end":""},{"old":"/api/admin/materiales","type":0,"val":"admin","end":""},{"old":"/api/admin/materiales","type":0,"val":"materiales","end":""}],
    types: placeholder as Registry['materiales.index']['types'],
  },
  'materiales.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/materiales/:id',
    tokens: [{"old":"/api/admin/materiales/:id","type":0,"val":"api","end":""},{"old":"/api/admin/materiales/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/materiales/:id","type":0,"val":"materiales","end":""},{"old":"/api/admin/materiales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['materiales.show']['types'],
  },
  'materiales.store': {
    methods: ["POST"],
    pattern: '/api/admin/materiales',
    tokens: [{"old":"/api/admin/materiales","type":0,"val":"api","end":""},{"old":"/api/admin/materiales","type":0,"val":"admin","end":""},{"old":"/api/admin/materiales","type":0,"val":"materiales","end":""}],
    types: placeholder as Registry['materiales.store']['types'],
  },
  'materiales.update': {
    methods: ["PUT"],
    pattern: '/api/admin/materiales/:id',
    tokens: [{"old":"/api/admin/materiales/:id","type":0,"val":"api","end":""},{"old":"/api/admin/materiales/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/materiales/:id","type":0,"val":"materiales","end":""},{"old":"/api/admin/materiales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['materiales.update']['types'],
  },
  'materiales.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/materiales/:id',
    tokens: [{"old":"/api/admin/materiales/:id","type":0,"val":"api","end":""},{"old":"/api/admin/materiales/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/materiales/:id","type":0,"val":"materiales","end":""},{"old":"/api/admin/materiales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['materiales.destroy']['types'],
  },
  'recompensas.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/recompensas',
    tokens: [{"old":"/api/admin/recompensas","type":0,"val":"api","end":""},{"old":"/api/admin/recompensas","type":0,"val":"admin","end":""},{"old":"/api/admin/recompensas","type":0,"val":"recompensas","end":""}],
    types: placeholder as Registry['recompensas.index']['types'],
  },
  'recompensas.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/recompensas/:id',
    tokens: [{"old":"/api/admin/recompensas/:id","type":0,"val":"api","end":""},{"old":"/api/admin/recompensas/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/recompensas/:id","type":0,"val":"recompensas","end":""},{"old":"/api/admin/recompensas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['recompensas.show']['types'],
  },
  'recompensas.store': {
    methods: ["POST"],
    pattern: '/api/admin/recompensas',
    tokens: [{"old":"/api/admin/recompensas","type":0,"val":"api","end":""},{"old":"/api/admin/recompensas","type":0,"val":"admin","end":""},{"old":"/api/admin/recompensas","type":0,"val":"recompensas","end":""}],
    types: placeholder as Registry['recompensas.store']['types'],
  },
  'recompensas.update': {
    methods: ["PUT"],
    pattern: '/api/admin/recompensas/:id',
    tokens: [{"old":"/api/admin/recompensas/:id","type":0,"val":"api","end":""},{"old":"/api/admin/recompensas/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/recompensas/:id","type":0,"val":"recompensas","end":""},{"old":"/api/admin/recompensas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['recompensas.update']['types'],
  },
  'recompensas.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/recompensas/:id',
    tokens: [{"old":"/api/admin/recompensas/:id","type":0,"val":"api","end":""},{"old":"/api/admin/recompensas/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/recompensas/:id","type":0,"val":"recompensas","end":""},{"old":"/api/admin/recompensas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['recompensas.destroy']['types'],
  },
  'roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/roles',
    tokens: [{"old":"/api/admin/roles","type":0,"val":"api","end":""},{"old":"/api/admin/roles","type":0,"val":"admin","end":""},{"old":"/api/admin/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.index']['types'],
  },
  'roles.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/roles/:id',
    tokens: [{"old":"/api/admin/roles/:id","type":0,"val":"api","end":""},{"old":"/api/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.show']['types'],
  },
  'roles.store': {
    methods: ["POST"],
    pattern: '/api/admin/roles',
    tokens: [{"old":"/api/admin/roles","type":0,"val":"api","end":""},{"old":"/api/admin/roles","type":0,"val":"admin","end":""},{"old":"/api/admin/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.store']['types'],
  },
  'roles.update': {
    methods: ["PUT"],
    pattern: '/api/admin/roles/:id',
    tokens: [{"old":"/api/admin/roles/:id","type":0,"val":"api","end":""},{"old":"/api/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.update']['types'],
  },
  'roles.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/roles/:id',
    tokens: [{"old":"/api/admin/roles/:id","type":0,"val":"api","end":""},{"old":"/api/admin/roles/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/admin/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.destroy']['types'],
  },
  'encargados.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/encargados',
    tokens: [{"old":"/api/admin/encargados","type":0,"val":"api","end":""},{"old":"/api/admin/encargados","type":0,"val":"admin","end":""},{"old":"/api/admin/encargados","type":0,"val":"encargados","end":""}],
    types: placeholder as Registry['encargados.index']['types'],
  },
  'encargados.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/encargados/:id',
    tokens: [{"old":"/api/admin/encargados/:id","type":0,"val":"api","end":""},{"old":"/api/admin/encargados/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/encargados/:id","type":0,"val":"encargados","end":""},{"old":"/api/admin/encargados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['encargados.show']['types'],
  },
  'encargados.store': {
    methods: ["POST"],
    pattern: '/api/admin/encargados',
    tokens: [{"old":"/api/admin/encargados","type":0,"val":"api","end":""},{"old":"/api/admin/encargados","type":0,"val":"admin","end":""},{"old":"/api/admin/encargados","type":0,"val":"encargados","end":""}],
    types: placeholder as Registry['encargados.store']['types'],
  },
  'encargados.update': {
    methods: ["PUT"],
    pattern: '/api/admin/encargados/:id',
    tokens: [{"old":"/api/admin/encargados/:id","type":0,"val":"api","end":""},{"old":"/api/admin/encargados/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/encargados/:id","type":0,"val":"encargados","end":""},{"old":"/api/admin/encargados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['encargados.update']['types'],
  },
  'encargados.destroy': {
    methods: ["DELETE"],
    pattern: '/api/admin/encargados/:id',
    tokens: [{"old":"/api/admin/encargados/:id","type":0,"val":"api","end":""},{"old":"/api/admin/encargados/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/encargados/:id","type":0,"val":"encargados","end":""},{"old":"/api/admin/encargados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['encargados.destroy']['types'],
  },
  'entregas.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/entregas',
    tokens: [{"old":"/api/admin/entregas","type":0,"val":"api","end":""},{"old":"/api/admin/entregas","type":0,"val":"admin","end":""},{"old":"/api/admin/entregas","type":0,"val":"entregas","end":""}],
    types: placeholder as Registry['entregas.index']['types'],
  },
  'entregas.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/admin/entregas/:id',
    tokens: [{"old":"/api/admin/entregas/:id","type":0,"val":"api","end":""},{"old":"/api/admin/entregas/:id","type":0,"val":"admin","end":""},{"old":"/api/admin/entregas/:id","type":0,"val":"entregas","end":""},{"old":"/api/admin/entregas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['entregas.show']['types'],
  },
  'entregas.actualizar_estado': {
    methods: ["PUT"],
    pattern: '/api/admin/entregas/:id/estado',
    tokens: [{"old":"/api/admin/entregas/:id/estado","type":0,"val":"api","end":""},{"old":"/api/admin/entregas/:id/estado","type":0,"val":"admin","end":""},{"old":"/api/admin/entregas/:id/estado","type":0,"val":"entregas","end":""},{"old":"/api/admin/entregas/:id/estado","type":1,"val":"id","end":""},{"old":"/api/admin/entregas/:id/estado","type":0,"val":"estado","end":""}],
    types: placeholder as Registry['entregas.actualizar_estado']['types'],
  },
  'perfil.mostrar': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/perfil',
    tokens: [{"old":"/api/usuario/perfil","type":0,"val":"api","end":""},{"old":"/api/usuario/perfil","type":0,"val":"usuario","end":""},{"old":"/api/usuario/perfil","type":0,"val":"perfil","end":""}],
    types: placeholder as Registry['perfil.mostrar']['types'],
  },
  'perfil.actualizar': {
    methods: ["PUT"],
    pattern: '/api/usuario/perfil',
    tokens: [{"old":"/api/usuario/perfil","type":0,"val":"api","end":""},{"old":"/api/usuario/perfil","type":0,"val":"usuario","end":""},{"old":"/api/usuario/perfil","type":0,"val":"perfil","end":""}],
    types: placeholder as Registry['perfil.actualizar']['types'],
  },
  'perfil.cambiar_password': {
    methods: ["PUT"],
    pattern: '/api/usuario/perfil/cambiar-password',
    tokens: [{"old":"/api/usuario/perfil/cambiar-password","type":0,"val":"api","end":""},{"old":"/api/usuario/perfil/cambiar-password","type":0,"val":"usuario","end":""},{"old":"/api/usuario/perfil/cambiar-password","type":0,"val":"perfil","end":""},{"old":"/api/usuario/perfil/cambiar-password","type":0,"val":"cambiar-password","end":""}],
    types: placeholder as Registry['perfil.cambiar_password']['types'],
  },
  'entregas.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/entregas',
    tokens: [{"old":"/api/usuario/entregas","type":0,"val":"api","end":""},{"old":"/api/usuario/entregas","type":0,"val":"usuario","end":""},{"old":"/api/usuario/entregas","type":0,"val":"entregas","end":""}],
    types: placeholder as Registry['entregas.index']['types'],
  },
  'entregas.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/entregas/:id',
    tokens: [{"old":"/api/usuario/entregas/:id","type":0,"val":"api","end":""},{"old":"/api/usuario/entregas/:id","type":0,"val":"usuario","end":""},{"old":"/api/usuario/entregas/:id","type":0,"val":"entregas","end":""},{"old":"/api/usuario/entregas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['entregas.show']['types'],
  },
  'entregas.store': {
    methods: ["POST"],
    pattern: '/api/usuario/entregas',
    tokens: [{"old":"/api/usuario/entregas","type":0,"val":"api","end":""},{"old":"/api/usuario/entregas","type":0,"val":"usuario","end":""},{"old":"/api/usuario/entregas","type":0,"val":"entregas","end":""}],
    types: placeholder as Registry['entregas.store']['types'],
  },
  'puntos.resumen': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/puntos',
    tokens: [{"old":"/api/usuario/puntos","type":0,"val":"api","end":""},{"old":"/api/usuario/puntos","type":0,"val":"usuario","end":""},{"old":"/api/usuario/puntos","type":0,"val":"puntos","end":""}],
    types: placeholder as Registry['puntos.resumen']['types'],
  },
  'puntos.historial': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/puntos/historial',
    tokens: [{"old":"/api/usuario/puntos/historial","type":0,"val":"api","end":""},{"old":"/api/usuario/puntos/historial","type":0,"val":"usuario","end":""},{"old":"/api/usuario/puntos/historial","type":0,"val":"puntos","end":""},{"old":"/api/usuario/puntos/historial","type":0,"val":"historial","end":""}],
    types: placeholder as Registry['puntos.historial']['types'],
  },
  'canjes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/canjes',
    tokens: [{"old":"/api/usuario/canjes","type":0,"val":"api","end":""},{"old":"/api/usuario/canjes","type":0,"val":"usuario","end":""},{"old":"/api/usuario/canjes","type":0,"val":"canjes","end":""}],
    types: placeholder as Registry['canjes.index']['types'],
  },
  'canjes.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuario/canjes/:id',
    tokens: [{"old":"/api/usuario/canjes/:id","type":0,"val":"api","end":""},{"old":"/api/usuario/canjes/:id","type":0,"val":"usuario","end":""},{"old":"/api/usuario/canjes/:id","type":0,"val":"canjes","end":""},{"old":"/api/usuario/canjes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['canjes.show']['types'],
  },
  'canjes.store': {
    methods: ["POST"],
    pattern: '/api/usuario/canjes',
    tokens: [{"old":"/api/usuario/canjes","type":0,"val":"api","end":""},{"old":"/api/usuario/canjes","type":0,"val":"usuario","end":""},{"old":"/api/usuario/canjes","type":0,"val":"canjes","end":""}],
    types: placeholder as Registry['canjes.store']['types'],
  },
  'perfil_aliado.mostrar': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliado/perfil',
    tokens: [{"old":"/api/aliado/perfil","type":0,"val":"api","end":""},{"old":"/api/aliado/perfil","type":0,"val":"aliado","end":""},{"old":"/api/aliado/perfil","type":0,"val":"perfil","end":""}],
    types: placeholder as Registry['perfil_aliado.mostrar']['types'],
  },
  'perfil_aliado.actualizar': {
    methods: ["PUT"],
    pattern: '/api/aliado/perfil',
    tokens: [{"old":"/api/aliado/perfil","type":0,"val":"api","end":""},{"old":"/api/aliado/perfil","type":0,"val":"aliado","end":""},{"old":"/api/aliado/perfil","type":0,"val":"perfil","end":""}],
    types: placeholder as Registry['perfil_aliado.actualizar']['types'],
  },
  'perfil_aliado.agregar_punto': {
    methods: ["POST"],
    pattern: '/api/aliado/perfil/puntos',
    tokens: [{"old":"/api/aliado/perfil/puntos","type":0,"val":"api","end":""},{"old":"/api/aliado/perfil/puntos","type":0,"val":"aliado","end":""},{"old":"/api/aliado/perfil/puntos","type":0,"val":"perfil","end":""},{"old":"/api/aliado/perfil/puntos","type":0,"val":"puntos","end":""}],
    types: placeholder as Registry['perfil_aliado.agregar_punto']['types'],
  },
  'perfil_aliado.actualizar_punto': {
    methods: ["PUT"],
    pattern: '/api/aliado/perfil/puntos/:id',
    tokens: [{"old":"/api/aliado/perfil/puntos/:id","type":0,"val":"api","end":""},{"old":"/api/aliado/perfil/puntos/:id","type":0,"val":"aliado","end":""},{"old":"/api/aliado/perfil/puntos/:id","type":0,"val":"perfil","end":""},{"old":"/api/aliado/perfil/puntos/:id","type":0,"val":"puntos","end":""},{"old":"/api/aliado/perfil/puntos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['perfil_aliado.actualizar_punto']['types'],
  },
  'entregas_aliado.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliado/entregas',
    tokens: [{"old":"/api/aliado/entregas","type":0,"val":"api","end":""},{"old":"/api/aliado/entregas","type":0,"val":"aliado","end":""},{"old":"/api/aliado/entregas","type":0,"val":"entregas","end":""}],
    types: placeholder as Registry['entregas_aliado.index']['types'],
  },
  'entregas_aliado.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliado/entregas/:id',
    tokens: [{"old":"/api/aliado/entregas/:id","type":0,"val":"api","end":""},{"old":"/api/aliado/entregas/:id","type":0,"val":"aliado","end":""},{"old":"/api/aliado/entregas/:id","type":0,"val":"entregas","end":""},{"old":"/api/aliado/entregas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['entregas_aliado.show']['types'],
  },
  'entregas_aliado.actualizar_estado': {
    methods: ["PUT"],
    pattern: '/api/aliado/entregas/:id/estado',
    tokens: [{"old":"/api/aliado/entregas/:id/estado","type":0,"val":"api","end":""},{"old":"/api/aliado/entregas/:id/estado","type":0,"val":"aliado","end":""},{"old":"/api/aliado/entregas/:id/estado","type":0,"val":"entregas","end":""},{"old":"/api/aliado/entregas/:id/estado","type":1,"val":"id","end":""},{"old":"/api/aliado/entregas/:id/estado","type":0,"val":"estado","end":""}],
    types: placeholder as Registry['entregas_aliado.actualizar_estado']['types'],
  },
  'clasificacion.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliado/clasificaciones',
    tokens: [{"old":"/api/aliado/clasificaciones","type":0,"val":"api","end":""},{"old":"/api/aliado/clasificaciones","type":0,"val":"aliado","end":""},{"old":"/api/aliado/clasificaciones","type":0,"val":"clasificaciones","end":""}],
    types: placeholder as Registry['clasificacion.index']['types'],
  },
  'clasificacion.store': {
    methods: ["POST"],
    pattern: '/api/aliado/clasificaciones',
    tokens: [{"old":"/api/aliado/clasificaciones","type":0,"val":"api","end":""},{"old":"/api/aliado/clasificaciones","type":0,"val":"aliado","end":""},{"old":"/api/aliado/clasificaciones","type":0,"val":"clasificaciones","end":""}],
    types: placeholder as Registry['clasificacion.store']['types'],
  },
  'openapi.html': {
    methods: ["GET","HEAD"],
    pattern: '/swagger',
    tokens: [{"old":"/swagger","type":0,"val":"swagger","end":""}],
    types: placeholder as Registry['openapi.html']['types'],
  },
  'openapi.json': {
    methods: ["GET","HEAD"],
    pattern: '/swagger.json',
    tokens: [{"old":"/swagger.json","type":0,"val":"swagger.json","end":""}],
    types: placeholder as Registry['openapi.json']['types'],
  },
  'openapi.yaml': {
    methods: ["GET","HEAD"],
    pattern: '/swagger.yaml',
    tokens: [{"old":"/swagger.yaml","type":0,"val":"swagger.yaml","end":""}],
    types: placeholder as Registry['openapi.yaml']['types'],
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
