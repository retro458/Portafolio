// Todo el contenido del portafolio vive aquí: para cambiar textos, enlaces o imágenes no hace falta tocar los componentes.

export interface Proyecto {
  nombre: string
  url: string // demo pública
  anio: string
  descripcion: string
  etiquetas: string[]
  captura?: string // ruta en /public, por ejemplo '/capturas/taskflow.png'; sin captura se muestra un marcador
}

export interface Empleo {
  rol: string
  lugar: string
  fecha: string
}

export interface Enlace {
  nombre: string
  url: string
  icono: string // imagen cuadrada en /public/iconos (se muestra a 52×52; ideal 104×104 o SVG)
  externo?: boolean
}

export const perfil = {
  nombre: 'Erick Baudriz',
  rol: 'Desarrollador de Software e Infraestructura',
  resumen:
    'Diseño, despliego y administro sistemas web en servidores Windows y Linux: de la base de datos al túnel que los publica. Abajo están dos sistemas reales que hice para clientes, en versión demo con datos ficticios.',
  // Dejalo vacío hasta tener el correo definitivo: la sección de contacto se adapta sola.
  correo: '',
  cv: '/Erick_Baudriz_CV.pdf',
}

export const proyectos: Proyecto[] = [
  {
    nombre: 'TaskFlow',
    url: 'https://taskflow-demo.nodesv.com',
    anio: '2026',
    descripcion:
      'Gestión de tareas por roles con notificaciones en tiempo real. Hecho para un despacho contable y desplegado en su Windows Server con Docker y Cloudflare Tunnel.',
    etiquetas: ['ASP.NET Core 9', 'Vue 3', 'SignalR', 'SQL Server', 'Docker'],
  },
  {
    nombre: 'Lector de DTE',
    url: 'https://lectordte-demo.nodesv.com',
    anio: '2026',
    descripcion:
      'Reúne las facturas electrónicas de varias empresas desde sus buzones de correo y genera libros de IVA, anexos del F07 y archivos para el sistema contable.',
    etiquetas: ['ASP.NET Core 9', 'Vue 3', 'IMAP', 'SQL Server', 'Windows Server'],
  },
]

export const stack = ['RHEL 9', 'Podman', 'Quadlet', 'systemd', 'SELinux', 'SQL Server', 'Nginx', 'Cloudflare Tunnel', 'Tailscale', 'Cockpit']

export const empleos: Empleo[] = [
  { rol: 'Desarrollador de Software — Lector de DTE', lugar: 'Freelance', fecha: 'Oct 2026 – hoy' },
  { rol: 'Desarrollador de Software — TaskFlow', lugar: 'Freelance', fecha: 'Ago – Sep 2026' },
  { rol: 'Gestión de Activos Fijos', lugar: 'GRUPO EJJE', fecha: 'Jun – Dic 2026' },
  { rol: 'Auditoría de Inventario', lugar: 'GRUPO EJJE', fecha: 'Ago – Nov 2025' },
  { rol: 'Soporte Técnico', lugar: 'Blackhawk', fecha: '2021 – 2022' },
]

export const enlaces: Enlace[] = [
  { nombre: 'GitHub', url: 'https://github.com/retro458', icono: '/iconos/github.png', externo: true },
  { nombre: 'LinkedIn', url: 'https://www.linkedin.com/in/erick-baudriz-bb9977253', icono: '/iconos/linkedin.png', externo: true },
  { nombre: 'Correo', url: '#contacto', icono: '/iconos/correo.png' },
  { nombre: 'Descargar CV', url: '/Erick_Baudriz_CV.pdf', icono: '/iconos/cv.svg' },
  { nombre: 'Homelab', url: '#homelab', icono: '/iconos/terminal.svg' },
]

// Lo que muestra la terminal si el servidor todavía no publica /estado/estado.json.
export const terminalDeEjemplo = {
  mssql: 'active (running)',
  contenedores: [
    { nombre: 'mssql', estado: 'Up 3 days' },
    { nombre: 'taskflow', estado: 'Up 3 days (healthy)' },
    { nombre: 'lectordte', estado: 'Up 3 days (healthy)' },
    { nombre: 'portafolio', estado: 'Up 3 days' },
  ],
  memoria: { total: '3.5Gi', usada: '1.5Gi', disponible: '2.0Gi' },
}
