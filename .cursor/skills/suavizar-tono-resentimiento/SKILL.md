---
name: suavizar-tono-resentimiento
description: >-
  Reescribe texto eliminando resentimiento, sarcasmo o tono de ataque
  personal, sin diluir el fondo crítico ni las peticiones. Usar cuando el
  usuario pida suavizar tono, quitar rencor, evitar que suene a ataque
  personal, o alinear un borrador con el espíritu de diálogo de la carta
  abierta (soften tone, remove resentment, not a personal attack).
disable-model-invocation: true
---

# Suavizar resentimiento y ataque personal

## Objetivo

Preservar el **contenido crítico** (hechos, inquietudes, peticiones) y
eliminar lo que suena a **resentimiento**, **venganza**, **sarcasmo** o
**ataque a personas**, de modo que el texto invite al diálogo —como ya
declara la introducción de la carta— y no a un enfrentamiento personal.

## Cuándo usar

Solo cuando el usuario lo invoca explícitamente con
`/suavizar-tono-resentimiento` (o lo adjunta con `@`). No aplicar de
forma automática.

Casos típicos tras esa invocación:

- Pegar un borrador que “suena a ataque” o a rencor.
- Criticar decisiones o procesos sin señalar a individuos.
- Revisar el tono antes de volcar el texto en `src/content/sections/`.

## Principios editoriales

- Criticar **decisiones, procesos, omisiones e instituciones**, no a
  personas por su nombre, carácter o intenciones.
- Preferir **hechos observables** a juicios morales (“irresponsable”,
  “nos mentís”, “solo les importa…”).
- Sustituir ironía y sarcasmo por afirmación directa y sobria.
- Mantener la firmeza: suavizar tono no es suavizar la petición ni ocultar
  el problema.
- Hablar en primera persona del plural o en voz institucional cuando el
  texto represente a firmantes asociadas, no en voz de ajuste de cuentas.

## Instrucciones

1. **Leer el original** e identificar:
   - acusaciones de intención (“lo hacen a propósito”, “quieren…”);
   - insultos, descalificaciones o adjetivos morales;
   - sarcasmo, mayúsculas enfáticas, signos de exclamación acumulados;
   - señalamientos a personas concretas cuando el problema es estructural;
   - generalizaciones (“siempre”, “nunca”, “todos”).
2. **Separar en tres capas** (mentalmente o en notas breves):
   - **Hecho:** qué ocurrió o qué falta (comprobable).
   - **Impacto:** por qué importa para la federación / asociadas.
   - **Petición o pregunta:** qué se pide o qué se quiere aclarar.
3. **Reescribir** conservando hecho + impacto + petición, y aplicando
   estas transformaciones:

   | Evitar | Preferir |
   | --- | --- |
   | “X miente / engaña” | “La información publicada no coincide con…” / “No se ha respondido a…” |
   | “Solo les importa el poder” | “Las decisiones se han tomado sin el proceso de consulta previsto en…” |
   | “Estamos hartas de…” | “Tras reiteradas peticiones sin respuesta en plazo…” |
   | “Es un insulto a la inteligencia” | “Esta explicación no aclara el punto central: …” |
   | Culpa individual | Responsabilidad del órgano, el cargo o el procedimiento |

4. **Entregar siempre:**
   - el **texto revisado** (listo para pegar o para seguir editando);
   - una lista breve de **cambios de tono** (qué se quitó o reformuló y por qué);
   - si queda alguna frase ambigua, **1–2 alternativas** más firmes o más
     suaves, sin diluir el fondo.
5. **No inventar hechos** para “equilibrar” el tono. Si falta evidencia,
   señalarlo y proponer cómo documentarla, no rellenar con suavidad vacía.
6. **Idioma:** mantener el idioma del original (normalmente español).
   Conservar el registro serio y público de una carta abierta.

## Comprobación final

Antes de dar por buena la revisión, verificar:

- [ ] ¿Se podría leer sin que parezca un ataque a una persona concreta?
- [ ] ¿Sigue claro el problema y, si la había, la petición?
- [ ] ¿Ha desaparecido el sarcasmo sin volver el texto tibio o evasivo?
- [ ] ¿Encaja con “no pretende ser un ataque, sino una invitación al diálogo”?

## Relación con el repo

La carta en `src/content/sections/` debe mantener tono público, ordenado y
de diálogo. El backlog editorial está en `tasks/` y no es contenido web.
Esta skill no crea archivos de sección salvo que el usuario pida aplicar
el texto revisado a una sección concreta.
