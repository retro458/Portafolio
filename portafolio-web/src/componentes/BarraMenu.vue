<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usarTema } from '../composables/usarTema'
import { perfil } from '../datos'

const { tema, alternar } = usarTema()

const secciones = [
  { id: 'proyectos', nombre: 'Proyectos' },
  { id: 'homelab', nombre: 'Homelab' },
  { id: 'experiencia', nombre: 'Experiencia' },
  { id: 'contacto', nombre: 'Contacto' },
]

// Reloj de la barra, como en macOS: "mar 24 nov · 14:58"
const ahora = ref('')
const formatoFecha = new Intl.DateTimeFormat('es-SV', { weekday: 'short', day: 'numeric', month: 'short' })
const formatoHora = new Intl.DateTimeFormat('es-SV', { hour: '2-digit', minute: '2-digit', hour12: false })
function actualizar() {
  const d = new Date()
  ahora.value = `${formatoFecha.format(d).replace(/[,.]/g, '')} · ${formatoHora.format(d)}`
}
let temporizador: number | undefined
onMounted(() => {
  actualizar()
  temporizador = window.setInterval(actualizar, 15_000)
})
onBeforeUnmount(() => window.clearInterval(temporizador))
</script>

<template>
  <header class="barra">
    <nav class="contenedor fila" aria-label="Secciones">
      <a href="#inicio" class="marca">{{ perfil.nombre }}</a>
      <a v-for="s in secciones" :key="s.id" :href="`#${s.id}`" class="enlace">{{ s.nombre }}</a>
      <span class="espacio"></span>
      <button type="button" class="tema" :aria-label="tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'" @click="alternar">
        <svg v-if="tema === 'oscuro'" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        <svg v-else aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      </button>
      <span class="reloj">{{ ahora }}</span>
    </nav>
  </header>
</template>

<style scoped>
.barra {
  position: sticky; top: 0; z-index: 10;
  background: var(--menu);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--linea);
}
.fila { min-height: 44px; display: flex; align-items: center; gap: 22px; font-size: 14px; flex-wrap: wrap; }
.marca { font-weight: 700; }
.enlace { color: var(--suave); }
.enlace:hover { color: var(--texto); }
.espacio { flex-grow: 1; }
.tema {
  width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: 8px; border: 1px solid var(--linea); background: transparent; color: var(--texto); cursor: pointer;
}
.tema:hover { background: var(--ventana); }
.reloj { color: var(--suave); font-size: 13px; font-variant-numeric: tabular-nums; }

@media (max-width: 720px) {
  .fila { gap: 14px; padding-top: 8px; padding-bottom: 8px; }
  .reloj { display: none; }
  .marca { flex: 1 1 auto; }
  .espacio { display: none; }
  .tema { order: 1; }
  .enlace { order: 2; }
  .fila::after { content: ''; order: 1; width: 100%; }
}
</style>
