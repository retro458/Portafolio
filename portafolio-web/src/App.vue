<script setup lang="ts">
import BarraMenu from './componentes/BarraMenu.vue'
import SeccionInicio from './componentes/SeccionInicio.vue'
import VentanaProyecto from './componentes/VentanaProyecto.vue'
import TerminalHomelab from './componentes/TerminalHomelab.vue'
import DockEnlaces from './componentes/DockEnlaces.vue'
import { empleos, perfil, proyectos, stack } from './datos'
</script>

<template>
  <a href="#contenido" class="saltar">Saltar al contenido</a>
  <BarraMenu />

  <main id="contenido" class="contenedor">
    <SeccionInicio />

    <section id="proyectos" class="seccion">
      <h2>Proyectos</h2>
      <div class="proyectos">
        <VentanaProyecto v-for="p in proyectos" :key="p.nombre" :proyecto="p" />
      </div>
    </section>

    <section id="homelab" class="seccion homelab">
      <div class="texto">
        <h2>Homelab</h2>
        <p>
          Esta página y las dos demos corren en una laptop con Red Hat Enterprise Linux 9: contenedores sin root con
          Podman, servicios de systemd con Quadlet, SQL Server Express con límite de memoria, SELinux activo y
          publicación por Cloudflare Tunnel, sin puertos abiertos.
        </p>
        <div class="chips"><span v-for="t in stack" :key="t">{{ t }}</span></div>
      </div>
      <TerminalHomelab />
    </section>

    <section id="experiencia" class="seccion">
      <h2>Experiencia</h2>
      <ul class="lista">
        <li v-for="e in empleos" :key="e.rol + e.fecha">
          <span class="rol">{{ e.rol }}</span>
          <span class="lugar">{{ e.lugar }}</span>
          <span class="fecha">{{ e.fecha }}</span>
        </li>
      </ul>
    </section>

    <section id="contacto" class="seccion contacto">
      <h2>Hablemos</h2>
      <p v-if="perfil.correo">
        Busco un puesto en infraestructura y administración de servidores. Escribime a
        <a :href="`mailto:${perfil.correo}`" class="correo">{{ perfil.correo }}</a> o por LinkedIn.
      </p>
      <p v-else>Busco un puesto en infraestructura y administración de servidores. Escribime por LinkedIn.</p>
    </section>

    <DockEnlaces />
  </main>
</template>

<style scoped>
main { padding-bottom: 40px; }
.seccion { display: flex; flex-direction: column; gap: 28px; padding-bottom: 88px; }
.proyectos { display: flex; flex-wrap: wrap; gap: 28px; }
.homelab { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 40px; }
.texto { flex: 1 1 300px; min-width: 0; display: flex; flex-direction: column; gap: 14px; }
.texto p { margin: 0; color: var(--suave); }
.lista { list-style: none; margin: 0; padding: 0; background: var(--ventana); border: 1px solid var(--linea); border-radius: 14px; overflow: hidden; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07); }
.lista li { display: flex; flex-wrap: wrap; gap: 4px 24px; padding: 16px 24px; border-bottom: 1px solid var(--linea); }
.lista li:last-child { border-bottom: 0; }
.lista li:hover { background: var(--fondo); }
.rol { flex: 2 1 300px; font-weight: 600; }
.lugar { flex: 1 1 160px; color: var(--suave); }
.fecha { color: var(--suave); font-size: 14px; font-variant-numeric: tabular-nums; }
.contacto { align-items: center; text-align: center; gap: 12px; padding-bottom: 48px; }
.contacto p { margin: 0; max-width: 560px; color: var(--suave); }
.correo { color: var(--acento-texto); font-weight: 600; }
@media (max-width: 720px) { .seccion { padding-bottom: 64px; } }
</style>
