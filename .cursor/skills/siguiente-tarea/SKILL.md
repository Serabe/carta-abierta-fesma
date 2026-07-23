---
name: siguiente-tarea
description: >-
  Elige una tarea abierta del backlog editorial en tasks/ y la presenta
  para trabajarla de forma individual. Usar cuando el usuario pida la
  siguiente tarea, una tarea pendiente, qué punto abordar, next task,
  o quiera retomar el trabajo sobre un punto sin elegir cuál.
disable-model-invocation: true
---

# Siguiente tarea del backlog

## Objetivo

Mostrar **una sola** tarea `open` de `tasks/P*.md` lista para trabajar
en esta sesión (con su semilla, borrador si existe y siguientes pasos
sugeridos). No abrir varias a la vez.

## Cuándo usar

Solo cuando el usuario lo invoca explícitamente con `/siguiente-tarea`
(o lo adjunta con `@`). No aplicar de forma automática.

Casos típicos:

- «Dame una tarea pendiente»
- «Qué punto trabajamos ahora»
- Retomar el backlog sin elegir id a mano

## Instrucciones

1. **Inventariar** `tasks/P*.md` (ignorar `README.md`,
   `PROPUESTAS-AGRUPACION.md` y `tasks/borradores/`).
2. **Filtrar pendientes:** `status: open` (u omitido). Excluir
   `status: done`, `closed`, `archived` o equivalente.
3. **Elegir una sola** con este orden:
   1. `priority: alta` antes que `media` / `baja`
   2. Entre iguales, `madurez: casi-listo` → `usable` → `germen`
      (avanzar lo más cerca de publicable)
   3. Entre iguales, el `id` más bajo (`P001` antes que `P010`)
   4. Si el usuario pide otra («otra», «la siguiente», «no esa»),
      excluir la(s) ya mostrada(s) en esta conversación y repetir
4. **Leer** la tarea elegida y, si existe, su borrador
   `tasks/borradores/{mismo-stem}.md`.
5. **Presentar en el chat** (sin volcar el repo entero):

   ```markdown
   ## Tarea propuesta: {id} — {title}

   - **Archivo:** `tasks/…`
   - **Borrador:** `tasks/borradores/…` (o «sin borrador»)
   - **familia / madurez / priority:** …

   ### Semilla
   (1–2 frases del frontmatter/cuerpo)

   ### Por qué importa
   (resumen breve)

   ### Qué habría que desarrollar
   (viñetas del propio archivo)

   ### Siguiente paso sugerido
   Una acción concreta para esta sesión, p. ej.:
   - `/espiritu-y-letra` sobre esta tarea
   - `/suavizar-tono-resentimiento` sobre el borrador
   - contrastar con `/consultar-reglamentos-fesma`
   - reescribir el borrador
   ```

6. **Preguntar** si se trabaja esta o se pide otra. No editar archivos
   hasta que el usuario confirme o pida un cambio concreto.
7. **No** marcar la tarea como `done` salvo que el usuario lo pida.
8. **Idioma:** responder en el idioma del usuario.

## Fuera de alcance

- No crear tareas nuevas (eso es `/extraer-puntos-carta`).
- No promover a `src/content/` salvo petición explícita.
- No listar todo el backlog salvo que el usuario lo pida; el entregable
  es **una** tarea.
