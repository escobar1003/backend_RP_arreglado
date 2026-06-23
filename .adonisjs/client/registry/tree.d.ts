/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  puntosReciclajes: {
    index: typeof routes['puntos_reciclajes.index']
    show: typeof routes['puntos_reciclajes.show']
    store: typeof routes['puntos_reciclajes.store']
    update: typeof routes['puntos_reciclajes.update']
  }
  chatbot: {
    preguntar: typeof routes['chatbot.preguntar']
  }
  login: {
    iniciarSesion: typeof routes['login.iniciar_sesion']
    cerrarSesion: typeof routes['login.cerrar_sesion']
  }
  registros: {
    registrarse: typeof routes['registros.registrarse']
  }
  recuperarPasswords: {
    solicitarCodigo: typeof routes['recuperar_passwords.solicitar_codigo']
    verificarCodigo: typeof routes['recuperar_passwords.verificar_codigo']
    restablecerPassword: typeof routes['recuperar_passwords.restablecer_password']
  }
  administradores: {
    index: typeof routes['administradores.index']
    store: typeof routes['administradores.store']
    update: typeof routes['administradores.update']
    destroy: typeof routes['administradores.destroy']
  }
  encargados: {
    index: typeof routes['encargados.index']
    show: typeof routes['encargados.show']
    store: typeof routes['encargados.store']
    update: typeof routes['encargados.update']
    destroy: typeof routes['encargados.destroy']
    asignarPunto: typeof routes['encargados.asignar_punto']
  }
  usuarios: {
    index: typeof routes['usuarios.index']
    show: typeof routes['usuarios.show']
    store: typeof routes['usuarios.store']
    update: typeof routes['usuarios.update']
    destroy: typeof routes['usuarios.destroy']
  }
  aliados: {
    index: typeof routes['aliados.index']
    show: typeof routes['aliados.show']
    store: typeof routes['aliados.store']
    update: typeof routes['aliados.update']
    destroy: typeof routes['aliados.destroy']
    materiales: typeof routes['aliados.materiales']
    sincronizarMateriales: typeof routes['aliados.sincronizar_materiales']
  }
  materiales: {
    index: typeof routes['materiales.index']
    show: typeof routes['materiales.show']
    store: typeof routes['materiales.store']
    update: typeof routes['materiales.update']
    destroy: typeof routes['materiales.destroy']
  }
  recompensas: {
    index: typeof routes['recompensas.index']
    show: typeof routes['recompensas.show']
    store: typeof routes['recompensas.store']
    update: typeof routes['recompensas.update']
    destroy: typeof routes['recompensas.destroy']
  }
  roles: {
    index: typeof routes['roles.index']
    show: typeof routes['roles.show']
    store: typeof routes['roles.store']
    update: typeof routes['roles.update']
    destroy: typeof routes['roles.destroy']
  }
  puntos: {
    ajustarPuntos: typeof routes['puntos.ajustar_puntos']
    resumen: typeof routes['puntos.resumen']
    historial: typeof routes['puntos.historial']
  }
  estadosMateriales: {
    index: typeof routes['estados_materiales.index']
    show: typeof routes['estados_materiales.show']
    store: typeof routes['estados_materiales.store']
    update: typeof routes['estados_materiales.update']
    destroy: typeof routes['estados_materiales.destroy']
  }
  estadosPuntos: {
    index: typeof routes['estados_puntos.index']
    show: typeof routes['estados_puntos.show']
    store: typeof routes['estados_puntos.store']
    update: typeof routes['estados_puntos.update']
    destroy: typeof routes['estados_puntos.destroy']
  }
  estadosEntregas: {
    index: typeof routes['estados_entregas.index']
    show: typeof routes['estados_entregas.show']
    store: typeof routes['estados_entregas.store']
    update: typeof routes['estados_entregas.update']
    destroy: typeof routes['estados_entregas.destroy']
  }
  entregas: {
    index: typeof routes['entregas.index']
    show: typeof routes['entregas.show']
    actualizarEstado: typeof routes['entregas.actualizar_estado']
    store: typeof routes['entregas.store']
    comprobante: typeof routes['entregas.comprobante']
  }
  estadisticas: {
    index: typeof routes['estadisticas.index']
  }
  estadosAliados: {
    index: typeof routes['estados_aliados.index']
    show: typeof routes['estados_aliados.show']
    store: typeof routes['estados_aliados.store']
    update: typeof routes['estados_aliados.update']
    destroy: typeof routes['estados_aliados.destroy']
  }
  estadosCanjes: {
    index: typeof routes['estados_canjes.index']
    show: typeof routes['estados_canjes.show']
    store: typeof routes['estados_canjes.store']
    update: typeof routes['estados_canjes.update']
    destroy: typeof routes['estados_canjes.destroy']
  }
  estadosUsuarios: {
    index: typeof routes['estados_usuarios.index']
    show: typeof routes['estados_usuarios.show']
    store: typeof routes['estados_usuarios.store']
    update: typeof routes['estados_usuarios.update']
    destroy: typeof routes['estados_usuarios.destroy']
  }
  estadosRecompensas: {
    index: typeof routes['estados_recompensas.index']
    show: typeof routes['estados_recompensas.show']
    store: typeof routes['estados_recompensas.store']
    update: typeof routes['estados_recompensas.update']
    destroy: typeof routes['estados_recompensas.destroy']
  }
  tiposRecompensas: {
    index: typeof routes['tipos_recompensas.index']
    show: typeof routes['tipos_recompensas.show']
    store: typeof routes['tipos_recompensas.store']
    update: typeof routes['tipos_recompensas.update']
    destroy: typeof routes['tipos_recompensas.destroy']
  }
  estadosEncargados: {
    index: typeof routes['estados_encargados.index']
    store: typeof routes['estados_encargados.store']
    show: typeof routes['estados_encargados.show']
    update: typeof routes['estados_encargados.update']
    destroy: typeof routes['estados_encargados.destroy']
  }
  perfilAdmin: {
    mostrar: typeof routes['perfil_admin.mostrar']
    actualizar: typeof routes['perfil_admin.actualizar']
  }
  perfil: {
    mostrar: typeof routes['perfil.mostrar']
    actualizar: typeof routes['perfil.actualizar']
    cambiarPassword: typeof routes['perfil.cambiar_password']
  }
  fotoPerfils: {
    store: typeof routes['foto_perfils.store']
  }
  canjes: {
    index: typeof routes['canjes.index']
    show: typeof routes['canjes.show']
    store: typeof routes['canjes.store']
  }
  aliadosUsuarios: {
    index: typeof routes['aliados_usuarios.index']
  }
  reservasUsuario: {
    index: typeof routes['reservas_usuario.index']
    show: typeof routes['reservas_usuario.show']
    store: typeof routes['reservas_usuario.store']
    cancelar: typeof routes['reservas_usuario.cancelar']
    destroy: typeof routes['reservas_usuario.destroy']
  }
  reservaImagenes: {
    store: typeof routes['reserva_imagenes.store']
  }
  notificacionesUsuario: {
    index: typeof routes['notificaciones_usuario.index']
    marcarLeida: typeof routes['notificaciones_usuario.marcar_leida']
    marcarTodasLeidas: typeof routes['notificaciones_usuario.marcar_todas_leidas']
  }
  perfilAliado: {
    mostrar: typeof routes['perfil_aliado.mostrar']
    actualizar: typeof routes['perfil_aliado.actualizar']
    agregarPunto: typeof routes['perfil_aliado.agregar_punto']
    actualizarPunto: typeof routes['perfil_aliado.actualizar_punto']
  }
  entregasAliado: {
    index: typeof routes['entregas_aliado.index']
    show: typeof routes['entregas_aliado.show']
    actualizarEstado: typeof routes['entregas_aliado.actualizar_estado']
  }
  clasificacion: {
    index: typeof routes['clasificacion.index']
    store: typeof routes['clasificacion.store']
  }
  reservasEncargado: {
    index: typeof routes['reservas_encargado.index']
    show: typeof routes['reservas_encargado.show']
    store: typeof routes['reservas_encargado.store']
    update: typeof routes['reservas_encargado.update']
    destroy: typeof routes['reservas_encargado.destroy']
  }
  notificaciones: {
    index: typeof routes['notificaciones.index']
    marcarTodasLeidas: typeof routes['notificaciones.marcar_todas_leidas']
    marcarLeida: typeof routes['notificaciones.marcar_leida']
  }
  perfilEncargado: {
    mostrar: typeof routes['perfil_encargado.mostrar']
    actualizar: typeof routes['perfil_encargado.actualizar']
  }
  canjesEncargado: {
    index: typeof routes['canjes_encargado.index']
    show: typeof routes['canjes_encargado.show']
    store: typeof routes['canjes_encargado.store']
    actualizarEstado: typeof routes['canjes_encargado.actualizar_estado']
    validar: typeof routes['canjes_encargado.validar']
  }
  deteccion: {
    procesarCamara: typeof routes['deteccion.procesar_camara']
  }
  chat: {
    preguntar: typeof routes['chat.preguntar']
  }
}
