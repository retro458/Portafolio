<script setup lang="ts">
import { enlaces } from '../datos'
</script>

<template>
  <nav class="dock" aria-label="Enlaces">
    <a
      v-for="e in enlaces"
      :key="e.nombre"
      :href="e.url"
      :aria-label="e.nombre"
      :target="e.externo ? '_blank' : undefined"
      :rel="e.externo ? 'noopener' : undefined"
      :download="e.url.endsWith('.pdf') ? '' : undefined"
    >
      <img :src="e.icono" alt="" width="52" height="52" />
      <span class="globo">{{ e.nombre }}</span>
    </a>
  </nav>
</template>

<style scoped>
.dock {
  position: sticky; bottom: 18px; z-index: 10;
  margin: 0 auto; width: max-content; max-width: calc(100% - 32px);
  display: flex; gap: 12px; padding: 10px 14px; border-radius: 22px;
  background: var(--menu);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--linea);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
a { position: relative; display: block; width: 52px; height: 52px; transition: transform 0.18s ease; transform-origin: bottom center; }
a:hover, a:focus-visible { transform: translateY(-6px) scale(1.15); }
img { width: 52px; height: 52px; border-radius: 12px; display: block; object-fit: cover; }
.globo {
  position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%);
  padding: 4px 10px; border-radius: 7px; white-space: nowrap; font-size: 12px;
  background: var(--ventana); color: var(--texto); border: 1px solid var(--linea);
  opacity: 0; pointer-events: none; transition: opacity 0.15s ease;
}
a:hover .globo, a:focus-visible .globo { opacity: 1; }
@media (max-width: 480px) {
  .dock { gap: 8px; padding: 8px 10px; }
  a, img { width: 44px; height: 44px; }
}
</style>
