# AulaAdapt IA

Monorepo base para el MVP escolar de `AulaAdapt IA`, una plataforma web y movil de apoyo docente postclase enfocada en accesibilidad educativa, claridad y revision humana antes de entregar materiales.

## Estructura

- `apps/web`: aplicacion web responsiva con panel docente, vista estudiante y administracion.
- `apps/mobile`: app hibrida con Expo Router para consumo movil y acciones rapidas.
- `packages/design-system`: tokens visuales y helpers de interfaz compartidos.
- `packages/domain`: tipos y contratos base del dominio.
- `packages/mocks`: datos de ejemplo y respuestas iniciales para prototipado.
- `docs`: arquitectura funcional y lineamientos de producto.

## Flujos implementados

- Landing institucional con mensajes eticos y accesos por rol.
- Dashboard docente con atajos, metricas, historial y generacion postclase.
- Flujo de nueva clase con entradas, salidas y adaptaciones neutrales.
- Revision editorial de materiales IA con aprobacion y entrega programada.
- Vista estudiante con materiales recientes, tarea, glosario y vistas adaptadas.
- Panel administrativo con docentes, grupos, materias y reportes agregados.
- Pantallas moviles alineadas con el sistema visual del producto.

## APIs mock incluidas

- `POST /api/sessions`
- `POST /api/sessions/[id]/inputs`
- `POST /api/sessions/[id]/generate`
- `PATCH /api/materials/[id]`
- `POST /api/materials/[id]/approve`
- `POST /api/deliveries`
- `GET /api/students/[id]/feed`
- `GET /api/admin/usage`

## Demo publica web

- La web de `apps/web` quedo preparada como demo publica para Vercel.
- El modo demo usa `NEXT_PUBLIC_APP_MODE=demo`.
- La configuracion publica tambien admite:
  - `NEXT_PUBLIC_SUPPORT_EMAIL`
  - `NEXT_PUBLIC_SCHOOL_NAME`
- Consulta [docs/deploy-vercel.md](/Users/marianofg/Documents/New%20project/docs/deploy-vercel.md) para la configuracion sugerida de despliegue.

## Preview URL en Vercel

- Publica primero este repo en GitHub.
- Importa el repositorio en Vercel.
- Selecciona `apps/web` como `Root Directory`.
- Fija `Node.js Version` a `20.x` en Vercel.
- De preferencia, deja `Install Command`, `Build Command` y `Dev Command` sin override para que Vercel detecte Next.js y use `packageManager`.
- Si necesitas forzarlos manualmente, usa:
  - Install Command: `corepack enable && pnpm install`
  - Build Command: `pnpm --filter web build`
  - Dev Command: `pnpm --filter web dev`
- Agrega las variables de entorno publicas del modo demo.
- La primera importacion genera una URL publica de preview; cada push posterior generara nuevas preview URLs.

## Nota del entorno

El workspace actual no tiene `node`, `npm`, `pnpm` ni `git` operativos, asi que el scaffold quedo implementado pero no fue posible instalar dependencias ni ejecutar la app localmente desde aqui.
