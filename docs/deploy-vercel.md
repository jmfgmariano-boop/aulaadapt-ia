# Despliegue publico en Vercel

## Objetivo

Publicar `apps/web` como demo publica de `AulaAdapt IA` usando el monorepo actual.

## Configuracion recomendada

1. Crear un proyecto nuevo en Vercel conectado al repositorio de GitHub.
2. Seleccionar `apps/web` como `Root Directory`.
3. Confirmar estos comandos en el dashboard:
   - Install Command: `corepack enable && pnpm install`
   - Build Command: `pnpm --filter web build`
   - Dev Command: `pnpm --filter web dev`
4. Agregar variable de entorno:
   - `NEXT_PUBLIC_APP_MODE=demo`
   - `NEXT_PUBLIC_SUPPORT_EMAIL=demo@aulaadaptia.edu`
   - `NEXT_PUBLIC_SCHOOL_NAME=Preparatoria Horizonte`
5. Mantener habilitada la opcion de incluir archivos fuente fuera del `Root Directory` si Vercel la muestra.

## Resultado esperado

- URL publica para compartir la demo institucional.
- Landing con metadatos sociales.
- Navegacion libre entre docente, estudiante y administracion.
- APIs mock funcionales solo para demostracion.
- Nuevas preview URLs en cada push posterior desde GitHub.
