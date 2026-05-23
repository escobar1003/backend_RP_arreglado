import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import PuntosController from '#controllers/puntos_controller'


// RUTA PARA ASIGNACIÓN DE PUNTOS (SCRUM-506)
router.post('/puntos/asignar', [PuntosController, 'asignar'])

router.get('/', async () => {
  return {
    mensaje: 'Backend funcionando'
  }
})

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

  // Estados Materiales
// Puntos (ajuste)
  router.post('/usuarios/:idUsuario/ajustar-puntos', [() => import('#controllers/admin/puntos_controller'), 'ajustarPuntos'])

// Estados Materiales
  router.get('/estados-materiales', [() => import('#controllers/admin/estados_materiales_controller'), 'index'])
  router.get('/estados-materiales/:id', [() => import('#controllers/admin/estados_materiales_controller'), 'show'])
  router.post('/estados-materiales', [() => import('#controllers/admin/estados_materiales_controller'), 'store'])
  router.put('/estados-materiales/:id', [() => import('#controllers/admin/estados_materiales_controller'), 'update'])
  router.delete('/estados-materiales/:id', [() => import('#controllers/admin/estados_materiales_controller'), 'destroy'])


  // Estados Puntos
  router.get('/estados-puntos', [() => import('#controllers/admin/estados_puntos_controller'), 'index'])
  router.get('/estados-puntos/:id', [() => import('#controllers/admin/estados_puntos_controller'), 'show'])
  router.post('/estados-puntos', [() => import('#controllers/admin/estados_puntos_controller'), 'store'])
  router.put('/estados-puntos/:id', [() => import('#controllers/admin/estados_puntos_controller'), 'update'])
  router.delete('/estados-puntos/:id', [() => import('#controllers/admin/estados_puntos_controller'), 'destroy'])

  // Estados Entregas
  router.get('/estados-entregas', [() => import('#controllers/admin/estados_entregas_controller'), 'index'])
  router.get('/estados-entregas/:id', [() => import('#controllers/admin/estados_entregas_controller'), 'show'])
  router.post('/estados-entregas', [() => import('#controllers/admin/estados_entregas_controller'), 'store'])
  router.put('/estados-entregas/:id', [() => import('#controllers/admin/estados_entregas_controller'), 'update'])
  router.delete('/estados-entregas/:id', [() => import('#controllers/admin/estados_entregas_controller'), 'destroy'])

  // Estados Aliados
  router.get('/estados-aliados', [() => import('#controllers/admin/estados_aliados_controller'), 'index'])
  router.get('/estados-aliados/:id', [() => import('#controllers/admin/estados_aliados_controller'), 'show'])
  router.post('/estados-aliados', [() => import('#controllers/admin/estados_aliados_controller'), 'store'])
  router.put('/estados-aliados/:id', [() => import('#controllers/admin/estados_aliados_controller'), 'update'])
  router.delete('/estados-aliados/:id', [() => import('#controllers/admin/estados_aliados_controller'), 'destroy'])

  // Estados Canjes
  router.get('/estados-canjes', [() => import('#controllers/admin/estados_canjes_controller'), 'index'])
  router.get('/estados-canjes/:id', [() => import('#controllers/admin/estados_canjes_controller'), 'show'])
  router.post('/estados-canjes', [() => import('#controllers/admin/estados_canjes_controller'), 'store'])
  router.put('/estados-canjes/:id', [() => import('#controllers/admin/estados_canjes_controller'), 'update'])
  router.delete('/estados-canjes/:id', [() => import('#controllers/admin/estados_canjes_controller'), 'destroy'])

  // Estados Usuarios
  router.get('/estados-usuarios', [() => import('#controllers/admin/estados_usuarios_controller'), 'index'])
  router.get('/estados-usuarios/:id', [() => import('#controllers/admin/estados_usuarios_controller'), 'show'])
  router.post('/estados-usuarios', [() => import('#controllers/admin/estados_usuarios_controller'), 'store'])
  router.put('/estados-usuarios/:id', [() => import('#controllers/admin/estados_usuarios_controller'), 'update'])
  router.delete('/estados-usuarios/:id', [() => import('#controllers/admin/estados_usuarios_controller'), 'destroy'])

  // Estados Recompensas
  router.get('/estados-recompensas', [() => import('#controllers/admin/estados_recompensas_controller'), 'index'])
  router.get('/estados-recompensas/:id', [() => import('#controllers/admin/estados_recompensas_controller'), 'show'])
  router.post('/estados-recompensas', [() => import('#controllers/admin/estados_recompensas_controller'), 'store'])
  router.put('/estados-recompensas/:id', [() => import('#controllers/admin/estados_recompensas_controller'), 'update'])
  router.delete('/estados-recompensas/:id', [() => import('#controllers/admin/estados_recompensas_controller'), 'destroy'])

  // Tipos Recompensa
  router.get('/tipos-recompensas', [() => import('#controllers/admin/tipos_recompensas_controller'), 'index'])
  router.get('/tipos-recompensas/:id', [() => import('#controllers/admin/tipos_recompensas_controller'), 'show'])
  router.post('/tipos-recompensas', [() => import('#controllers/admin/tipos_recompensas_controller'), 'store'])
  router.put('/tipos-recompensas/:id', [() => import('#controllers/admin/tipos_recompensas_controller'), 'update'])
  router.delete('/tipos-recompensas/:id', [() => import('#controllers/admin/tipos_recompensas_controller'), 'destroy'])
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

  // Reservas (app móvil - usuario)
  router.get('/reservas',        [() => import('#controllers/usuario/reservas_usuario_controller'), 'index'])
  router.get('/reservas/:id',    [() => import('#controllers/usuario/reservas_usuario_controller'), 'show'])
  router.post('/reservas',       [() => import('#controllers/usuario/reservas_usuario_controller'), 'store'])
  router.delete('/reservas/:id', [() => import('#controllers/usuario/reservas_usuario_controller'), 'destroy'])

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

// ENCARGADO
router.group(() => {
  router.get('/reservas',        [() => import('#controllers/encargado/reservas_encargado_controller'), 'index'])
  router.get('/reservas/:id',    [() => import('#controllers/encargado/reservas_encargado_controller'), 'show'])
  router.post('/reservas',       [() => import('#controllers/encargado/reservas_encargado_controller'), 'store'])
  router.put('/reservas/:id',    [() => import('#controllers/encargado/reservas_encargado_controller'), 'update'])
  router.delete('/reservas/:id', [() => import('#controllers/encargado/reservas_encargado_controller'), 'destroy'])

  // Notificaciones
  router.get('/notificaciones', [() => import('#controllers/encargado/notificaciones_controller'), 'index'])
  router.put('/notificaciones/:id/leer', [() => import('#controllers/encargado/notificaciones_controller'), 'marcarLeida'])
  router.put('/notificaciones/leer-todas', [() => import('#controllers/encargado/notificaciones_controller'), 'marcarTodasLeidas'])

 // Entregas
  router.get('/entregas', [() => import('#controllers/encargado/entregas_controller'), 'index'])
  router.get('/entregas/:id', [() => import('#controllers/encargado/entregas_controller'), 'show'])
  router.put('/entregas/:id/estado', [() => import('#controllers/encargado/entregas_controller'), 'actualizarEstado'])

}).prefix('/api/encargado').use([middleware.auth(), middleware.verificar_rol(['encargado'])])


// SWAGGER / OPENAPI
import openapi from '@foadonis/openapi/services/main'
openapi.registerRoutes('/swagger')

router.post('/api/detectar-material', '#controllers/deteccion_controller.procesarCamara')