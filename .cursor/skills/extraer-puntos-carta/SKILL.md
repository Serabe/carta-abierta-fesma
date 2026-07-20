---
name: extraer-puntos-carta
description: >-
  Extrae de un texto bruto los puntos susceptibles de desarrollarse en la
  carta abierta a FESMA y los guarda en disco como tareas bajo tasks/
  (nunca como contenido web). Usar cuando el usuario pegue notas, borradores,
  mensajes, actas o material crudo y pida puntos, ideas, ejes, ángulos o
  material para desarrollar más adelante en la carta (extract points,
  outline ideas, develop later).
disable-model-invocation: true
---

# Extraer puntos para la carta abierta

## Objetivo

Convertir texto crudo en **tareas de trabajo** en disco: puntos
desarrollables para la carta que **aún no son contenido del sitio**. Cada
punto se guarda como un archivo de tarea bajo `tasks/`, fuera de
`src/content/`.

## Cuándo usar

Solo cuando el usuario lo invoca explícitamente con `/extraer-puntos-carta`
(o lo adjunta con `@`). No aplicar de forma automática.

Casos típicos tras esa invocación:

- Pegar notas, chats, correos, actas o borradores y pedir puntos.
- Querer un backlog de trabajo editorial antes de tocar la carta.
- Pedir un inventario de ideas sin redactar todavía secciones públicas.

## Dónde guardar (obligatorio)

| Ubicación | Rol |
| --- | --- |
| `tasks/` | **Única** salida de esta skill: backlog de tareas |
| `src/content/sections/` | **Prohibido** en esta skill: es contenido web |

- Nunca crear ni editar archivos bajo `src/content/` al ejecutar esta skill.
- Las tareas no se publican ni las consume Astro hasta que, en otro paso,
  alguien las desarrolle y las escriba como secciones.
- Plantilla de referencia: `assets/task-template.md`.

## Instrucciones

1. **Leer el texto completo** sin reescribirlo todavía. Identificar hechos,
   inquietudes, peticiones implícitas, contradicciones y silencios relevantes.
2. **Extraer solo lo desarrollable.** Un punto vale la pena si:
   - se puede ampliar con evidencia, contexto o una petición concreta;
   - aporta algo a la carta (no es solo desahogo o detalle anecdótico);
   - encaja, aunque sea de forma provisional, en una de estas familias:
     - **Contexto / antecedentes** → `familia: contexto`
     - **Situación actual** → `familia: situacion`
     - **Petición** → `familia: peticion`
     - **Cierre / llamado al diálogo** → `familia: cierre`
3. **Descartar o aparcar** lo que sea solo resentimiento personal, rumor sin
   ancla, o ataque a personas concretas sin vínculo con el problema
   institucional. Si hay algo útil debajo, reformularlo como punto
   institucional (hecho + impacto + posible petición). El material aparcado
   se menciona en el resumen del chat; **no** se guarda como tarea salvo
   que el usuario lo pida.
4. **Asignar IDs.** Listar `tasks/P*.md` (ignorar `README.md`). El siguiente
   id es `P` + número entero siguiente (p. ej. si existe `P003-…`, el
   siguiente es `P004`). Si no hay ninguno, empezar en `P001`.
5. **Escribir una tarea por punto** en `tasks/{id}-{slug}.md`, donde
   `{slug}` es un kebab-case corto del título (ascii, sin acentos si complica
   el path). Usar este formato exacto:

   ```markdown
   ---
   id: P001
   title: Título corto
   status: open
   familia: contexto
   madurez: germen
   priority: alta
   created: YYYY-MM-DD
   source: breve nota sobre el origen del material
   ---

   ## Semilla

   1–2 frases con la idea central (sin tono acusatorio).

   ## Por qué importa

   Impacto en la federación / asociadas / actividad.

   ## Qué habría que desarrollar

   Evidencia, cifras, plazos, ejemplos, o el tipo de petición que podría
   salir de aquí.
   ```

   Valores permitidos:
   - `status`: `open` (siempre al crear)
   - `familia`: `contexto` | `situacion` | `peticion` | `cierre`
   - `madurez`: `germen` | `usable` | `casi-listo`
   - `priority`: `alta` | `media` | `baja` (alta = prioritario)
6. **Confirmar en el chat** con un resumen breve:
   - rutas de los archivos creados;
   - lista `id — título — priority`;
   - material descartado o aparcado (una línea de motivo cada uno).
   No hace falta volcar de nuevo el cuerpo completo de cada tarea si ya
   está en disco.
7. **No redactar la carta** ni promover texto a `src/content/`. El
   entregable es el backlog en `tasks/`.
8. **Idioma:** responder en el idioma del usuario; títulos y cuerpos de
   tarea suelen ir en español.

## Criterios de calidad

- Preferir pocos puntos fuertes a una lista larga y difusa.
- Separar **hecho** de **interpretación** y de **petición**.
- Si dos fragmentos dicen lo mismo, fusionarlos en una sola tarea.
- Si el texto mezcla varias voces, etiquetar de quién viene cada punto
  solo cuando aporte claridad; no inventar atribuciones.
- Un archivo = una tarea = un punto. No agrupar varios puntos en un solo
  Markdown de `tasks/`.

## Relación con el repo

- Contenido público: `src/content/sections/` (introducción, contexto,
  peticiones, cierre). Esta skill **no** lo toca.
- Backlog: `tasks/` (ver `tasks/README.md`).
- Después: `/espiritu-y-letra` y `/suavizar-tono-resentimiento` sobre una
  tarea concreta, y solo entonces redactar sección web si el usuario lo pide.
