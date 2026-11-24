(function () {
  var tema = null
  try { tema = localStorage.getItem('tema') } catch (e) { /* almacenamiento bloqueado */ }
  if (tema !== 'claro' && tema !== 'oscuro') {
    tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
  }
  document.documentElement.setAttribute('data-tema', tema)
})()
