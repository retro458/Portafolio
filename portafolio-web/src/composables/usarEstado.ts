import { ref } from 'vue'
import { terminalDeEjemplo } from '../datos'

export interface Estado {
  generado?: string
  encendidoDesde?: string // texto como "3 días"
  mssql: string
  contenedores: { nombre: string; estado: string }[]
  memoria: { total: string; usada: string; disponible: string }
}

// Estado real del servidor: lo escribe deploy/estado/generar-estado.py cada pocos minutos.
// Si no existe (por ejemplo en desarrollo), se usa el ejemplo de datos.ts.
const estado = ref<Estado>(terminalDeEjemplo)
const esReal = ref(false)
let pedido: Promise<void> | null = null

export function usarEstado() {
  if (!pedido) {
    pedido = fetch('/estado/estado.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((datos: Estado) => {
        if (datos && Array.isArray(datos.contenedores) && datos.memoria) {
          estado.value = datos
          esReal.value = true
        }
      })
      .catch(() => {
        // Sin estado publicado: queda el ejemplo.
      })
  }
  return { estado, esReal }
}
