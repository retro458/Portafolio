<script setup lang="ts">
import { computed } from 'vue'
import type { Proyecto } from '../datos'

const props = defineProps<{ proyecto: Proyecto }>()
const dominio = computed(() => props.proyecto.url.replace(/^https?:\/\//, ''))
</script>

<template>
  <article class="ventana">
    <div class="titulo">
      <span class="semaforo" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="direccion">{{ dominio }}</span>
    </div>
    <div class="vista">
      <img v-if="proyecto.captura" :src="proyecto.captura" :alt="`Captura de ${proyecto.nombre}`" loading="lazy" />
      <div v-else class="marcador" aria-hidden="true">
        <div class="lateral"><b></b><b></b><b></b></div>
        <div class="cuerpo">Captura de {{ proyecto.nombre }}</div>
      </div>
    </div>
    <div class="info">
      <div class="cabecera">
        <h3>{{ proyecto.nombre }}</h3>
        <span>{{ proyecto.anio }}</span>
      </div>
      <p>{{ proyecto.descripcion }}</p>
      <div class="chips"><span v-for="e in proyecto.etiquetas" :key="e">{{ e }}</span></div>
      <a :href="proyecto.url" class="boton boton-primario" target="_blank" rel="noopener">Abrir la demo</a>
    </div>
  </article>
</template>

<style scoped>
.ventana {
  flex: 1 1 440px; min-width: 0;
  background: var(--ventana); border: 1px solid var(--linea); border-radius: 14px; overflow: hidden;
  box-shadow: var(--sombra);
  transition: transform 0.2s ease;
}
.ventana:hover { transform: translateY(-3px); }
.titulo { height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: var(--barra); border-bottom: 1px solid var(--linea); }
.direccion { flex-grow: 1; text-align: center; font-size: 13px; color: var(--suave); margin-right: 52px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vista { aspect-ratio: 16 / 9; background: var(--fondo); }
.vista img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
.marcador { height: 100%; display: flex; gap: 12px; padding: 16px; }
.lateral { width: 22%; display: flex; flex-direction: column; gap: 8px; }
.lateral b { height: 10px; border-radius: 4px; background: var(--linea); }
.lateral b:nth-child(1) { width: 70%; } .lateral b:nth-child(3) { width: 55%; }
.cuerpo { flex-grow: 1; display: flex; align-items: center; justify-content: center; border: 1px dashed var(--linea); border-radius: 10px; color: var(--suave); font-size: 13px; }
.info { padding: 22px 24px 24px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.cabecera { width: 100%; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.cabecera span { font-size: 13px; color: var(--suave); }
h3 { margin: 0; font-size: 22px; }
p { margin: 0; color: var(--suave); }
.boton { margin-top: 4px; }
</style>
