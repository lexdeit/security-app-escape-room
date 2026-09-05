# Acme Employee Portal

Portal interno de empleados de **Acme Corporation** (empresa ficticia): dashboard,
directorio de empleados, documentos, reportes, tickets de soporte, notificaciones,
búsqueda global, ajustes, administración, bóveda de cumplimiento (*Compliance Vault*)
y SSO corporativo.

> **Aviso importante:** este repositorio debe permanecer **privado**: los
> participantes solo deben tener acceso a la aplicación desplegada, nunca al
> código ni a esta documentación.

## Requisitos

- [Bun](https://bun.sh/) 1.x (gestor de paquetes y runtime del proyecto)
- Node.js compatible (lo provee Bun para Next.js)

## Puesta en marcha

```bash
bun install
bun run dev      # desarrollo en http://localhost:3000
# o
bun run build && bun run start   # producción
```

## Variables de entorno (opcionales)

Si no se definen, la aplicación usa los valores de desarrollo incluidos en el
código (ver `lib/secrets.ts`). Para un despliegue del ejercicio basta con los
valores por defecto.

| Variable              | Por defecto (desarrollo)       | Uso                                      |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `BETTER_AUTH_SECRET`  | `acme-dev-secret-2024`         | Firma de sesiones SSO y del portal       |
| `BETTER_AUTH_URL`     | `http://localhost:3000`        | URL pública del SSO                      |
| `INTERNAL_API_TOKEN`  | `acme-int-7f3a9c2e-token`      | Token de servicio de recursos internos   |
| `VAULT_PART_1`        | *(ver guía de organizadores)*  | Fragmento del primer custodio            |
| `VAULT_PART_2`        | *(ver guía de organizadores)*  | Fragmento del segundo custodio           |
| `FLAG_FINAL`          | *(ver guía de organizadores)*  | Referencia de divulgación de la bóveda   |
| `NOTIFY_CONTACT`      | `soc@gcs-2026.example`         | Contacto mostrado al abrir la bóveda     |

## Estructura

- `app/` — páginas del portal (`dashboard`, `profile`, `employees`, `documents`,
  `reports`, `tickets`, `notifications`, `search`, `settings`, `admin`,
  `analyst`, `vault`, `help`, `login`, `onboarding` — esta última pública, sin
  sesión) y rutas API bajo `app/api/`.
- `components/` — layout empresarial, formularios y primitivas de marca
  reutilizables (`ui.tsx`: botones, campos, chips, alertas, encabezados con la
  paleta de la empresa y contraste verificado) sobre
  [@heroui/react](https://heroui.com).
- `lib/` — autenticación (`auth.ts`, con Better Auth + sesión del portal),
  datos ficticios (`data.ts`, `users.ts`), configuración solo-servidor
  (`secrets.ts`) y utilidades de fetching (`ssrf.ts`).
- `public/robots.txt` — fichero de rastreo con secciones internas.

## Reset del ejercicio

Todo el estado mutable (comentarios de tickets, bios, tickets creados, base de
datos del SSO) vive **en memoria**: basta con **reiniciar el servidor** para
volver al estado inicial. No hay base de datos que migrar ni ficheros que
borrar.

## Documentación interna

Guía de organizadores (privada, solo organizadores): [`GUIA-ORGANIZADORES.md`](./GUIA-ORGANIZADORES.md).
