---
name: grillar-punto
description: >-
  Interroga sin descanso sobre un punto del backlog (tasks/P*.md) para
  stress-testear hechos, decisiones y redacción. Usar cuando el usuario
  quiera grillar, interrogar o someter a prueba un punto, plan o idea
  de la carta, o diga «gríllame», «grill this point», o similares.
disable-model-invocation: true
---

# Grillar un punto

## Objetivo

Entrevistar al usuario **sin tregua** sobre **un solo** punto hasta
llegar a un entendimiento compartido. El punto lo elige el usuario o
se elige antes con `/siguiente-tarea`. Bajar cada rama del árbol de
decisiones, resolviendo dependencias una a una. En cada pregunta,
ofrecer **tu respuesta recomendada**.

Comprobar coherencia con el resto de puntos ya desarrollados en
`src/content/` y señalar cualquier contradicción.

## Instrucciones (grilling)

Interview me relentlessly about every aspect of this point until we
reach a shared understanding. Walk down each branch of the decision
tree, resolving dependencies between decisions one-by-one. For each
question, provide your recommended answer.

Ask the questions **one at a time**, waiting for feedback on each
question before continuing. Asking multiple questions at once is
bewildering.

If a *fact* can be found by exploring the environment (filesystem,
`reglamentos/`, tarea, borrador, carta en `src/content/`), look it up
rather than asking me. The *decisions*, though, are mine — put each
one to me and wait for my answer.

Do not edit files or act on conclusions until I confirm we have
reached a shared understanding.

### Arranque

Abrir con un marco mínimo (id, título, ancla de la semilla) y **una**
primera pregunta + recomendación. Luego esperar.

### Cierre

Cuando el usuario confirme el entendimiento compartido, resumir
decisiones en viñetas y preguntar si se actualiza tarea/borrador o se
pasa a otra skill (`/espiritu-y-letra`, `/suavizar-tono-resentimiento`).

## Fuera de alcance

- No grillar varios puntos en paralelo.
- No crear puntos nuevos (`/extraer-puntos-carta`).
- No promover a `src/content/` sin petición explícita tras el acuerdo.
- No elegir el punto aquí: lo aporta el usuario o `/siguiente-tarea`.
