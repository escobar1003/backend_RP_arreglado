import router from '@adonisjs/core/services/router'

router.group(() => {

  // USUARIOS
  router.get('/usuarios', '#controllers/usuarios/gestion_usuarios_controller.listar')
  router.post('/usuarios', '#controllers/usuarios/gestion_usuarios_controller.crear')
  router.patch('/usuarios/:id/estado', '#controllers/usuarios/gestion_usuarios_controller.cambiarEstado')

  // PUNTOS
  router.get('/puntos', '#controllers/supermercados/puntos_reciclajes_controller.index')
  router.post('/puntos', '#controllers/supermercados/puntos_reciclajes_controller.store')
  router.put('/puntos/:id', '#controllers/supermercados/puntos_reciclajes_controller.update')
  router.delete('/puntos/:id', '#controllers/supermercados/puntos_reciclajes_controller.destroy')

  // ROLES
  router.get('/roles', '#controllers/roles_controller.index')
  router.post('/roles', '#controllers/roles_controller.store')
  router.put('/roles/:id', '#controllers/roles_controller.update')
  router.delete('/roles/:id', '#controllers/roles_controller.destroy')

  // ADMINS
  router.get('/admins', '#controllers/admins_controller.index')
  router.post('/admins', '#controllers/admins_controller.store')
  router.put('/admins/:id', '#controllers/admins_controller.update')
  router.delete('/admins/:id', '#controllers/admins_controller.destroy')

}).prefix('/api')