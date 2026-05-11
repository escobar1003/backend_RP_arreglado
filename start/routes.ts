import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'


// AUTH (públicas)

router.group(() => {
  router.post('/iniciar-sesion', [() => import('#controllers/auth/login_controller'), 'iniciarSesion'])
  router.post('/registrarse', [() => import('#controllers/auth/registros_controller'), 'registrarse'])
  router.post('/recuperar-password/solicitar', [() => import('#controllers/auth/recuperar_passwords_controller'), 'solicitarCodigo'])
  router.post('/recuperar-password/restablecer', [() => import('#controllers/auth/recuperar_passwords_controller'), 'restablecerPassword'])
}).prefix('/api/auth')


// AUTH (protegidas)

router.group(() => {
  router.delete('/cerrar-sesion', [() => import('#controllers/auth/login_controller'), 'cerrarSesion'])
}).prefix('/api/auth').use(middleware.auth())


// ADMIN

router.group(() => {

  // Administradores
  router.get('/admins', [() => import('#controllers/admin/administradores_controller'), 'index'])
  router.post('/admins', [() => import('#controllers/admin/administradores_controller'), 'store'])
  router.put('/admins/:id', [() => import('#controllers/admin/administradores_controller'), 'update'])
  router.delete('/admins/:id', [() => import('#controllers/admin/administradores_controller'), 'destroy'])

  // Usuarios
  router.get('/usuarios', [() => import('#controllers/admin/usuarios_controller'), 'index'])
  router.get('/usuarios/:id', [() => import('#controllers/admin/usuarios_controller'), 'show'])
  router.put('/usuarios/:id', [() => import('#controllers/admin/usuarios_controller'), 'update'])
  router.delete('/usuarios/:id', [() => import('#controllers/admin/usuarios_controller'), 'destroy'])

  // Aliados
  router.get('/aliados', [() => import('#controllers/admin/aliados_controller'), 'index'])
  router.get('/aliados/:id', [() => import('#controllers/admin/aliados_controller'), 'show'])
  router.post('/aliados', [() => import('#controllers/admin/aliados_controller'), 'store'])
  router.put('/aliados/:id', [() => import('#controllers/admin/aliados_controller'), 'update'])
  router.delete('/aliados/:id', [() => import('#controllers/admin/aliados_controller'), 'destroy'])

  // Materiales
  router.get('/materiales', [() => import('#controllers/admin/materiales_controller'), 'index'])
  router.get('/materiales/:id', [() => import('#controllers/admin/materiales_controller'), 'show'])
  router.post('/materiales', [() => import('#controllers/admin/materiales_controller'), 'store'])
  router.put('/materiales/:id', [() => import('#controllers/admin/materiales_controller'), 'update'])
  router.delete('/materiales/:id', [() => import('#controllers/admin/materiales_controller'), 'destroy'])

  // Recompensas
  router.get('/recompensas', [() => import('#controllers/admin/recompensas_controller'), 'index'])
  router.get('/recompensas/:id', [() => import('#controllers/admin/recompensas_controller'), 'show'])
  router.post('/recompensas', [() => import('#controllers/admin/recompensas_controller'), 'store'])
  router.put('/recompensas/:id', [() => import('#controllers/admin/recompensas_controller'), 'update'])
  router.delete('/recompensas/:id', [() => import('#controllers/admin/recompensas_controller'), 'destroy'])

  // Roles
  router.get('/roles', [() => import('#controllers/admin/roles_controller'), 'index'])
  router.get('/roles/:id', [() => import('#controllers/admin/roles_controller'), 'show'])
  router.post('/roles', [() => import('#controllers/admin/roles_controller'), 'store'])
  router.put('/roles/:id', [() => import('#controllers/admin/roles_controller'), 'update'])
  router.delete('/roles/:id', [() => import('#controllers/admin/roles_controller'), 'destroy'])

  // Encargados
  router.get('/encargados', [() => import('#controllers/admin/encargados_controller'), 'index'])
  router.get('/encargados/:id', [() => import('#controllers/admin/encargados_controller'), 'show'])
  router.post('/encargados', [() => import('#controllers/admin/encargados_controller'), 'store'])
  router.put('/encargados/:id', [() => import('#controllers/admin/encargados_controller'), 'update'])
  router.delete('/encargados/:id', [() => import('#controllers/admin/encargados_controller'), 'destroy'])

  // Entregas (admin)
  router.get('/entregas', [() => import('#controllers/admin/entregas_controller'), 'index'])
  router.get('/entregas/:id', [() => import('#controllers/admin/entregas_controller'), 'show'])
  router.put('/entregas/:id/estado', [() => import('#controllers/admin/entregas_controller'), 'actualizarEstado'])

}).prefix('/api/admin').use([middleware.auth(), middleware.verificar_rol(['admin'])])


// USUARIO

router.group(() => {

  // Perfil
  router.get('/perfil', [() => import('#controllers/usuario/perfil_controller'), 'mostrar'])
  router.put('/perfil', [() => import('#controllers/usuario/perfil_controller'), 'actualizar'])
  router.put('/perfil/cambiar-password', [() => import('#controllers/usuario/perfil_controller'), 'cambiarPassword'])

  // Entregas
  router.get('/entregas', [() => import('#controllers/usuario/entregas_controller'), 'index'])
  router.get('/entregas/:id', [() => import('#controllers/usuario/entregas_controller'), 'show'])
  router.post('/entregas', [() => import('#controllers/usuario/entregas_controller'), 'store'])

  // Puntos
  router.get('/puntos', [() => import('#controllers/usuario/puntos_controller'), 'resumen'])
  router.get('/puntos/historial', [() => import('#controllers/usuario/puntos_controller'), 'historial'])

  // Canjes
  router.get('/canjes', [() => import('#controllers/usuario/canjes_controller'), 'index'])
  router.get('/canjes/:id', [() => import('#controllers/usuario/canjes_controller'), 'show'])
  router.post('/canjes', [() => import('#controllers/usuario/canjes_controller'), 'store'])

}).prefix('/api/usuario').use([middleware.auth(), middleware.verificar_rol(['usuario'])])


// ALIADO

router.group(() => {

  // Perfil aliado
  router.get('/perfil', [() => import('#controllers/aliado/perfil_aliado_controller'), 'mostrar'])
  router.put('/perfil', [() => import('#controllers/aliado/perfil_aliado_controller'), 'actualizar'])
  router.post('/perfil/puntos', [() => import('#controllers/aliado/perfil_aliado_controller'), 'agregarPunto'])
  router.put('/perfil/puntos/:id', [() => import('#controllers/aliado/perfil_aliado_controller'), 'actualizarPunto'])

  // Entregas del aliado
  router.get('/entregas', [() => import('#controllers/aliado/entregas_aliado_controller'), 'index'])
  router.get('/entregas/:id', [() => import('#controllers/aliado/entregas_aliado_controller'), 'show'])
  router.put('/entregas/:id/estado', [() => import('#controllers/aliado/entregas_aliado_controller'), 'actualizarEstado'])

  // Clasificación IA
  router.get('/clasificaciones', [() => import('#controllers/aliado/clasificacion_controller'), 'index'])
  router.post('/clasificaciones', [() => import('#controllers/aliado/clasificacion_controller'), 'store'])

}).prefix('/api/aliado').use([middleware.auth(), middleware.verificar_rol(['aliado'])])

// SWAGGER / OPENAPI
import openapi from '@foadonis/openapi/services/main'
openapi.registerRoutes('/swagger')