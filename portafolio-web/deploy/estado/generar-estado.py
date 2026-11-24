#!/usr/bin/python3
"""Escribe ~/estado/estado.json con el estado del servidor para la terminal del portafolio.

Corre como el usuario `demos` (lo lanza estado.timer). Solo publica datos inofensivos:
nombres y estado de los contenedores, memoria, tiempo encendido y si SQL Server está activo.
Nada de IPs, rutas, variables de entorno ni procesos.
"""
import json
import os
import subprocess
import tempfile
from datetime import datetime, timezone

DESTINO = os.path.expanduser('~/estado/estado.json')


def comando(*args: str) -> str:
    try:
        return subprocess.run(args, capture_output=True, text=True, timeout=20).stdout.strip()
    except (OSError, subprocess.TimeoutExpired):
        return ''


def gib(kib: int) -> str:
    return f'{kib / 1024 / 1024:.1f}Gi'


def memoria() -> dict:
    datos = {}
    with open('/proc/meminfo') as f:
        for linea in f:
            clave, valor = linea.split(':', 1)
            datos[clave] = int(valor.split()[0])  # en kB
    total, disponible = datos['MemTotal'], datos['MemAvailable']
    return {'total': gib(total), 'usada': gib(total - disponible), 'disponible': gib(disponible)}


def encendido_desde() -> str:
    with open('/proc/uptime') as f:
        segundos = int(float(f.read().split()[0]))
    dias, horas = segundos // 86400, (segundos % 86400) // 3600
    if dias >= 1:
        return f'{dias} día' + ('s' if dias != 1 else '')
    return f'{horas} hora' + ('s' if horas != 1 else '') if horas else 'unos minutos'


def contenedores() -> list:
    try:
        lista = json.loads(comando('podman', 'ps', '--format', 'json') or '[]')
    except json.JSONDecodeError:
        return []
    return sorted(
        ({'nombre': c['Names'][0], 'estado': c.get('Status', '')} for c in lista if c.get('Names')),
        key=lambda c: c['nombre'],
    )


def main() -> None:
    estado_mssql = comando('systemctl', '--user', 'is-active', 'mssql') or 'unknown'
    estado = {
        'generado': datetime.now(timezone.utc).isoformat(timespec='seconds'),
        'encendidoDesde': encendido_desde(),
        'mssql': 'active (running)' if estado_mssql == 'active' else estado_mssql,
        'contenedores': contenedores(),
        'memoria': memoria(),
    }
    carpeta = os.path.dirname(DESTINO)
    os.makedirs(carpeta, exist_ok=True)
    # Escritura atómica: nginx nunca sirve un archivo a medio escribir.
    with tempfile.NamedTemporaryFile('w', dir=carpeta, delete=False, suffix='.tmp') as tmp:
        json.dump(estado, tmp, ensure_ascii=False)
    os.chmod(tmp.name, 0o644)
    os.replace(tmp.name, DESTINO)


if __name__ == '__main__':
    main()
