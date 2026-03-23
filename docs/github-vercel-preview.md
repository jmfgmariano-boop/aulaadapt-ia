# GitHub + Vercel: obtener una preview URL

## 1. Publicar el repo en GitHub

Desde una maquina con Git funcionando:

```bash
git init
git add .
git commit -m "Prepare AulaAdapt IA demo for Vercel preview"
git branch -M main
git remote add origin <TU_REPO_GITHUB>
git push -u origin main
```

## 2. Importar en Vercel

1. Entra a Vercel.
2. Usa `Add New -> Project`.
3. Importa el repositorio de GitHub.
4. En `Root Directory`, selecciona `apps/web`.

## 3. Confirmar configuracion

- Framework: `Next.js`
- Install Command: `corepack enable && pnpm install`
- Build Command: `pnpm --filter web build`
- Dev Command: `pnpm --filter web dev`

## 4. Variables de entorno

- `NEXT_PUBLIC_APP_MODE=demo`
- `NEXT_PUBLIC_SUPPORT_EMAIL=demo@aulaadaptia.edu`
- `NEXT_PUBLIC_SCHOOL_NAME=Preparatoria Horizonte`

## 5. Ajustes importantes de monorepo

- Si Vercel lo solicita, deja activada la opcion para incluir archivos fuente fuera del `Root Directory`.
- Mantiene `apps/web` como aplicacion publicada y `packages/*` como dependencias internas del workspace.

## 6. Resultado esperado

- Primera importacion: una URL publica de preview.
- Cada push a GitHub: una nueva preview URL automatica.
- Navegacion valida en:
  - `/`
  - `/docente`
  - `/docente/nueva-clase`
  - `/docente/materiales`
  - `/estudiante`
  - `/admin`
  - `/configuracion`

## 7. Validacion minima

- Confirmar banner de demo y selector de rol.
- Confirmar que la home comparte metadatos correctos.
- Confirmar que las rutas API mock responden:
  - `POST /api/sessions`
  - `POST /api/deliveries`
  - `GET /api/admin/usage`
