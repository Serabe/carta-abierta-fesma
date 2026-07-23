---
name: consultar-reglamentos-fesma
description: >-
  Consulta y cita el texto vigente de estatutos, reglamentos y protocolos
  de FESMA guardados en reglamentos/. Usar siempre que se necesite el
  contenido real de normas (estatutos, régimen interno, reglamento del CMN,
  reglamento de concursos, plan de igualdad, protocolo de violencia sexual),
  citar artículos, contrastar una afirmación de la carta o de una tarea
  con la norma, o responder qué dice FESMA sobre avales, sanciones,
  supervisión, asociadas, concursos o congresos. Preferir estos archivos
  a la memoria o a resúmenes externos.
---

# Consultar estatutos y reglamentos FESMA

## Objetivo

Cuando haga falta el **contenido normativo** de FESMA, leer los archivos
de `reglamentos/` en el repo. Son la fuente de verdad local. No inventar
artículos, numeración ni redactados.

## Cuándo usar

Aplicar **siempre** que la tarea implique:

- qué dicen los estatutos o un reglamento;
- citar, parafrasear o contrastar un artículo;
- comprobar si un punto de `tasks/` o un borrador de la carta se apoya
  en la norma;
- preguntas sobre avales, sanciones, supervisión del CMN, asociadas,
  concursos, régimen interno, igualdad o prevención de violencia sexual.

También cuando el usuario invoque `/consultar-reglamentos-fesma` o
adjunte esta skill con `@`.

## Dónde están los textos

| Archivo | Contenido |
| --- | --- |
| `reglamentos/Estatutos_FESMA.txt` | Estatutos de la Federación |
| `reglamentos/REGIMEN_INTERNO_FESMA_2025.txt` | Reglamento de régimen interno |
| `reglamentos/Reglamento_CMN_2025.txt` | Reglamento de Congresos Mágicos Nacionales |
| `reglamentos/Reglamento_de_Concursos_A_2_REV_2026-06.txt` | Reglamento de concursos (CMN), rev. 2026-06 |
| `reglamentos/Plan_de_Igualdad.txt` | Plan de igualdad |
| `reglamentos/Protocolo_prevencion_violencia_sexual.txt` | Protocolo de prevención de la violencia sexual |

Estos archivos **no** los consume Astro. No moverlos a `src/content/`.

## Instrucciones

1. **Elegir el archivo** según el tema (tabla arriba). Si hay duda entre
   CMN y concursos, abrir ambos y contrastar.
2. **Buscar en el texto** (grep/read) el artículo o la sección relevante.
   No citar de memoria.
3. **Citar con precisión:** documento + artículo/apartado + fragmento
   breve entre comillas o bloque. Si el archivo no numerá igual que la
   web oficial, indicar la ubicación en el fichero local.
4. **Separar norma y opinión:** primero qué dice el texto; después, si
   procede, la lectura editorial para la carta.
5. **Si no está en estos ficheros,** decirlo explícitamente. No rellenar
   huecos con normas inventadas ni con versiones antiguas recordadas.
6. **No reescribir ni «actualizar»** los reglamentos salvo que el usuario
   pida sustituir el archivo por una versión nueva.

## Relación con el resto del repo

- Carta publicada: `src/content/sections/`
- Backlog editorial: `tasks/`
- Normas de referencia: `reglamentos/` (esta skill)
