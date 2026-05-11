/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  login: {
    iniciarSesion: typeof routes['login.iniciar_sesion']
    cerrarSesion: typeof routes['login.cerrar_sesion']
  }
  registros: {
    registrarse: typeof routes['registros.registrarse']
  }
  recuperarPasswords: {
    solicitarCodigo: typeof routes['recuperar_passwords.solicitar_codigo']
    restablecerPassword: typeof routes['recuperar_passwords.restablecer_password']
  }
  administradores: {
    index: typeof routes['administradores.index']
    store: typeof routes['administradores.store']
    update: typeof routes['administradores.update']
    destroy: typeof routes['administradores.destroy']
  }
  usuarios: {
    index: typeof routes['usuarios.index']
    show: typeof routes['usuarios.show']
    update: typeof routes['usuarios.update']
    destroy: typeof routes['usuarios.destroy']
  }
  aliados: {
    index: typeof routes['aliados.index']
    show: typeof routes['aliados.show']
    store: typeof routes['aliados.store']
    update: typeof routes['aliados.update']
    destroy: typeof routes['aliados.destroy']
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
  encargados: {
    index: typeof routes['encargados.index']
    show: typeof routes['encargados.show']
    store: typeof routes['encargados.store']
    update: typeof routes['encargados.update']
    destroy: typeof routes['encargados.destroy']
  }
  entregas: {
    index: typeof routes['entregas.index']
    show: typeof routes['entregas.show']
    actualizarEstado: typeof routes['entregas.actualizar_estado']
    store: typeof routes['entregas.store']
  }
  perfil: {
    mostrar: typeof routes['perfil.mostrar']
    actualizar: typeof routes['perfil.actualizar']
    cambiarPassword: typeof routes['perfil.cambiar_password']
  }
  puntos: {
    resumen: typeof routes['puntos.resumen']
    historial: typeof routes['puntos.historial']
  }
  canjes: {
    index: typeof routes['canjes.index']
    show: typeof routes['canjes.show']
    store: typeof routes['canjes.store']
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
  openapi: {
    html: typeof routes['openapi.html']
    json: typeof routes['openapi.json']
    yaml: typeof routes['openapi.yaml']
  }
}
