# Arquitectura funcional

## Capas

1. Captura docente
   - Texto, audio, puntos clave, tarea y archivo base.
2. Procesamiento IA
   - Transcripcion, resumen, extraccion de conceptos, simplificacion y adaptacion.
3. Revision humana
   - Edicion, aprobacion, versionado y programacion de entrega.
4. Distribucion
   - Feed del estudiante, correo opcional y trazabilidad.
5. Analitica basica
   - Uso agregado por materia, grupo y docente.

## Principios

- La IA sugiere; el docente decide.
- No se almacenan diagnosticos ni categorias clinicas.
- Las adaptaciones se expresan como apoyos pedagogicos neutrales.
- El diseno prioriza claridad, lectura simple y segmentacion del contenido.

## Stack objetivo

- Web: Next.js App Router
- Movil: Expo Router
- Persistencia futura: PostgreSQL + object storage
- IA futura: servicios desacoplados de transcripcion y generacion

## Evolucion prevista

- Multiinstitucion
- Mas canales de entrega
- Analitica academica basica
- Biblioteca de plantillas por materia
