<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { usarEstado } from '../composables/usarEstado'

const { estado } = usarEstado()

interface Linea { tipo: 'comando' | 'salida' | 'activo' | 'vacia'; texto: string }

// Las líneas se arman con el estado real del servidor (o el ejemplo, si no hay).
const lineas = computed<Linea[]>(() => {
  const e = estado.value
  const ancho = Math.max(...e.contenedores.map((c) => c.nombre.length), 5) + 3
  return [
    { tipo: 'comando', texto: 'systemctl --user status mssql' },
    { tipo: 'activo', texto: e.mssql },
    { tipo: 'vacia', texto: '' },
    { tipo: 'comando', texto: 'podman ps --format "table {{.Names}} {{.Status}}"' },
    { tipo: 'salida', texto: 'NAMES'.padEnd(ancho) + 'STATUS' },
    ...e.contenedores.map((c) => ({ tipo: 'salida' as const, texto: c.nombre.padEnd(ancho) + c.estado })),
    { tipo: 'vacia', texto: '' },
    { tipo: 'comando', texto: 'free -h' },
    { tipo: 'salida', texto: '        total   used    available' },
    { tipo: 'salida', texto: `Mem:    ${e.memoria.total.padEnd(8)}${e.memoria.usada.padEnd(8)}${e.memoria.disponible}` },
  ]
})

// Aparece línea por línea la primera vez que la terminal entra en pantalla.
const visibles = ref(0)
const raiz = ref<HTMLElement | null>(null)
let observador: IntersectionObserver | undefined
let temporizador: number | undefined

function mostrarTodo() { visibles.value = Number.POSITIVE_INFINITY }

onMounted(() => {
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (sinMovimiento || !('IntersectionObserver' in window) || !raiz.value) return mostrarTodo()
  observador = new IntersectionObserver((entradas) => {
    if (!entradas.some((e) => e.isIntersecting)) return
    observador?.disconnect()
    temporizador = window.setInterval(() => {
      visibles.value++
      if (visibles.value >= lineas.value.length) window.clearInterval(temporizador)
    }, 140)
  }, { threshold: 0.3 })
  observador.observe(raiz.value)
})
onBeforeUnmount(() => { observador?.disconnect(); window.clearInterval(temporizador) })
</script>

<template>
  <div ref="raiz" class="terminal">
    <div class="titulo">
      <span class="semaforo" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="nombre">demos@casa — ssh</span>
    </div>
    <pre :aria-label="'Estado del servidor'"><template v-for="(l, i) in lineas" :key="i"><span v-if="i < visibles" class="linea"><template v-if="l.tipo === 'comando'"><span class="prompt">demos@casa</span>:~$ {{ l.texto }}</template><template v-else-if="l.tipo === 'activo'"><span class="verde">●</span> mssql.service - SQL Server 2022 Express
     Active: <span class="verde">{{ l.texto }}</span></template><template v-else>{{ l.texto }}</template>
</span></template><span class="prompt">demos@casa</span>:~$ <span class="cursor" aria-hidden="true"></span></pre>
  </div>
</template>

<style scoped>
.terminal { flex: 1 1 560px; min-width: 0; border-radius: 12px; overflow: hidden; background: #1e1e1e; border: 1px solid #333; box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25); }
.titulo { height: 36px; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: #2a2a2a; }
.nombre { flex-grow: 1; text-align: center; font-size: 12px; color: #a8a8a8; margin-right: 52px; }
pre { margin: 0; padding: 18px 20px; min-height: 380px; font-family: var(--mono); font-size: 13px; line-height: 1.6; color: #d4d4d4; white-space: pre; overflow-x: auto; }
.prompt, .verde { color: #5fd068; }
.cursor { display: inline-block; width: 8px; height: 15px; background: #d4d4d4; vertical-align: -2px; animation: parpadeo 1.1s steps(1) infinite; }
@keyframes parpadeo { 50% { opacity: 0; } }
@media (max-width: 720px) { pre { font-size: 12px; min-height: 0; } }
</style>
