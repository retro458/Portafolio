<script setup lang="ts">
import { perfil } from '../datos'
import { usarEstado } from '../composables/usarEstado'

const { estado, esReal } = usarEstado()
</script>

<template>
  <section id="inicio" class="inicio">
    <span class="insignia">
      <i aria-hidden="true"></i>
      Sirviendo desde mi servidor Red Hat Enterprise Linux 9<template v-if="esReal && estado.encendidoDesde"> · encendido hace {{ estado.encendidoDesde }}</template>
    </span>
    <h1>{{ perfil.nombre }}</h1>
    <p class="rol">{{ perfil.rol }}</p>
    <p class="resumen">{{ perfil.resumen }}</p>
    <div class="acciones">
      <a href="#proyectos" class="boton boton-primario">Ver proyectos</a>
      <a :href="perfil.cv" class="boton boton-secundario" download>Descargar CV</a>
    </div>
  </section>
</template>

<style scoped>
.inicio { padding: 96px 0 72px; display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
.insignia {
  display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px;
  background: var(--ventana); border: 1px solid var(--linea); font-size: 13px; color: var(--suave);
}
.insignia i { width: 8px; height: 8px; border-radius: 50%; background: #28c840; box-shadow: 0 0 0 3px rgba(40, 200, 64, 0.2); }
h1 { margin: 0; font-size: clamp(44px, 8vw, 64px); line-height: 1.05; font-weight: 700; letter-spacing: -1.5px; }
.rol { margin: 0; font-size: clamp(20px, 3.2vw, 26px); font-weight: 500; color: var(--acento-texto); }
.resumen { margin: 0; max-width: 680px; font-size: 18px; color: var(--suave); }
.acciones { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
@media (max-width: 720px) { .inicio { padding: 56px 0 48px; } }
</style>
