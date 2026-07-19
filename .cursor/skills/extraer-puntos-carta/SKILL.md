---
name: extraer-puntos-carta
description: >-
  Extrae de un texto bruto los puntos susceptibles de desarrollarse en la
  carta abierta a FESMA. Usar cuando el usuario pegue notas, borradores,
  mensajes, actas o material crudo y pida puntos, ideas, ejes, ángulos o
  material para desarrollar más adelante en la carta (extract points,
  outline ideas, develop later).
---

# Extraer puntos para la carta abierta

## Objetivo

Convertir texto crudo en una lista de **puntos desarrollables** para la carta
abierta: ideas que aún no son secciones acabadas, pero sí semilla de
argumento, contexto o petición.

## Cuándo usar

- El usuario pega notas, chats, correos, actas o borradores y pide puntos.
- Quiere material para ampliar `src/content/sections/` más adelante.
- Pide un inventario de ideas sin redactar todavía la carta.

## Instrucciones

1. **Leer el texto completo** sin reescribirlo todavía. Identificar hechos,
   inquietudes, peticiones implícitas, contradicciones y silencios relevantes.
2. **Extraer solo lo desarrollable.** Un punto vale la pena si:
   - se puede ampliar con evidencia, contexto o una petición concreta;
   - aporta algo a la carta (no es solo desahogo o detalle anecdótico);
   - encaja, aunque sea de forma provisional, en una de estas familias:
     - **Contexto / antecedentes**
     - **Situación actual**
     - **Petición** (transparencia, participación, rendición de cuentas u otra)
     - **Cierre / llamado al diálogo**
3. **Descartar o aparcar** lo que sea solo resentimiento personal, rumor sin
   ancla, o ataque a personas concretas sin vínculo con el problema
   institucional. Si hay algo útil debajo, reformularlo como punto
   institucional (hecho + impacto + posible petición).
4. **Presentar cada punto** con este formato:

   ```markdown
   ### P[n]. Título corto
   - **Familia:** contexto | situación | petición | cierre
   - **Semilla:** 1–2 frases con la idea central (sin tono acusatorio)
   - **Por qué importa:** impacto en la federación / asociadas / actividad
   - **Qué habría que desarrollar:** evidencia, cifras, plazos, ejemplos,
     o el tipo de petición que podría salir de aquí
   - **Madurez:** germen | usable | casi listo
   ```

5. **Agrupar** al final un resumen:
   - puntos prioritarios (los más fuertes o urgentes);
   - puntos secundarios (útiles pero no centrales);
   - material descartado o a aparcar (con una línea de motivo).
6. **No redactar la carta** salvo que el usuario lo pida. El entregable de
   esta skill es el inventario de puntos, no secciones Markdown nuevas.
7. **Idioma:** responder en el idioma del usuario; los títulos de puntos
   pueden seguir el idioma del material fuente (normalmente español).

## Criterios de calidad

- Preferir pocos puntos fuertes a una lista larga y difusa.
- Separar **hecho** de **interpretación** y de **petición**.
- Si dos fragmentos dicen lo mismo, fusionarlos en un solo punto.
- Si el texto mezcla varias voces, etiquetar de quién viene cada punto
  solo cuando aporte claridad; no inventar atribuciones.

## Relación con el repo

La carta vive en `src/content/sections/` (introducción, contexto, peticiones,
cierre). Al sugerir familia, alinear con esa estructura cuando sea razonable,
sin forzar un encaje artificial.
