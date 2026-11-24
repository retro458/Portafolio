import { ref } from 'vue'

type Tema = 'claro' | 'oscuro'

// public/tema-inicial.js ya puso el atributo antes de cargar; aquí solo se lee y se cambia.
const tema = ref<Tema>((document.documentElement.getAttribute('data-tema') as Tema) || 'claro')

export function usarTema() {
  function alternar() {
    tema.value = tema.value === 'oscuro' ? 'claro' : 'oscuro'
    document.documentElement.setAttribute('data-tema', tema.value)
    try {
      localStorage.setItem('tema', tema.value)
    } catch {
      // Sin almacenamiento (ventana privada, bloqueado): el cambio dura solo esta visita.
    }
  }
  return { tema, alternar }
}
