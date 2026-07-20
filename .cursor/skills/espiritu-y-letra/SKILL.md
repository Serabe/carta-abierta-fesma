---
name: espiritu-y-letra
description: >-
  Separa cada punto de la carta abierta en espíritu (intención, objetivo,
  qué se busca lograr) y letra (el texto concreto, la implementación
  escrita — “actual” en inglés). Usar cuando el usuario pida distinguir
  intención vs redacción, spirit vs letter, espíritu y letra, o revisar
  si el texto cumple el objetivo del punto.
disable-model-invocation: true
---

# Espíritu y letra de cada punto

## Objetivo

Para cada punto (o fragmento) de la carta, separar con nitidez:

- **Espíritu** — la intención: qué se quiere lograr, por qué importa, qué
  cambio o claridad se busca.
- **Letra** — el texto concreto tal como se escribiría o ya está escrito
  en la carta (la implementación textual; *actual* en inglés: el wording
  real, no “actual” como “vigente”).

Así se puede criticar o mejorar la redacción sin perder el objetivo, y
comprobar si la letra cumple el espíritu.

## Cuándo usar

Solo cuando el usuario lo invoca explícitamente con `/espiritu-y-letra`
(o lo adjunta con `@`). No aplicar de forma automática.

Casos típicos tras esa invocación:

- Separar intención vs texto en puntos, borradores o secciones.
- Comprobar si un párrafo cumple lo que pretendía decir.
- Reescribir la letra manteniendo el mismo espíritu (o ajustar el
  espíritu sin fingir que el texto ya lo expresa).

## Instrucciones

1. **Identificar las unidades.** Trabajar punto a punto (o párrafo a
   párrafo si el usuario pega prosa seguida). No mezclar varios puntos
   en un solo bloque espíritu/letra.
2. **Para cada punto, rellenar:**

   ```markdown
   ### P[n]. Título corto

   #### Espíritu
   - **Objetivo:** qué se pretende lograr con este punto
   - **Intención:** tono y efecto deseados (p. ej. documentar un hecho,
     pedir una medida, invitar al diálogo, acotar un riesgo)
   - **Éxito si…:** criterio breve de que el punto ha cumplido su función
     (sin citar aún el wording)

   #### Letra
   - **Texto:** la redacción concreta (existente o propuesta), lista para
     la carta
   - **Encaje:** sección probable en `src/content/sections/` si se conoce
   ```

3. **Reglas de separación**
   - El **espíritu** no cita el wording final como si fuera el objetivo;
     describe el *para qué*.
   - La **letra** no añade nuevas intenciones: implementa solo el espíritu
     declarado (o marca explícitamente si el texto actual se desvía).
   - Si el material fuente mezcla ambas capas, desenredarlas: primero
     espíritu limpio, después letra.
4. **Diagnóstico de alineación** (obligatorio por punto):

   | Estado | Significado |
   | --- | --- |
   | Alineados | La letra expresa el espíritu sin sobrar ni faltar lo esencial |
   | Letra corta | El espíritu es más amplio; falta desarrollar o concretar |
   | Letra se pasa | El texto añade ataque, detalle o petición que el espíritu no pide |
   | Espíritu difuso | Aún no está claro el objetivo; no forzar una letra pulida |

   Añadir una línea `**Alineación:** …` con el estado y un motivo breve.
5. **Si piden solo una capa:** entregar solo espíritu o solo letra, pero
   dejar constancia de la otra en una frase (“espíritu asumido: …”) para
   no perder el ancla.
6. **No suavizar ni endurecer** el tono salvo que lo pidan (para eso está
   `suavizar-tono-resentimiento`). Aquí el foco es separar y alinear.
7. **Idioma:** responder en el idioma del usuario; espíritu y letra
   suelen ir en español, como el resto de la carta.

## Criterios de calidad

- Un espíritu vago (“mejorar las cosas”) no sirve: exigir objetivo
  comprobable en una frase.
- Una letra que solo repite el espíritu en abstracto no sirve: debe
  leerse como prosa de carta (hecho, impacto, petición o cierre).
- Si hay tensión entre espíritu y letra, mostrarla; no ocultarla
  reescribiendo en silencio.

## Relación con otras skills

- Tras `/extraer-puntos-carta`, las unidades de trabajo viven en `tasks/`
  (archivos `P*.md`), no en `src/content/`. Preferir abrir o citar esa
  tarea al separar espíritu y letra.
- Si la letra suena a resentimiento o ataque personal, pasar el texto
  por `/suavizar-tono-resentimiento` **sin cambiar el espíritu**, salvo
  que el espíritu mismo fuera el problema.
- No promover la letra a `src/content/sections/` salvo que el usuario lo
  pida de forma explícita.
