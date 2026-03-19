# Agent: animation-reviewer

## Descripción
Auditor de animaciones. Revisa que todas las animaciones del proyecto cumplan con las directrices establecidas en el sistema de diseño: duración, easing, stagger y comportamiento responsive. También puede corregir animaciones que violen las reglas.

## Cuándo usarlo
- Revisar un componente antes de hacer commit
- Auditar una sección completa (ej: HeroSection, TratamientosGrid)
- Cuando una animación "se siente rara" o demasiado agresiva
- Migrar animaciones inline a `lib/animations.ts`

## Reglas de Animación del Proyecto

### Duraciones
| Tipo | Duración | Notas |
|------|----------|-------|
| Transición de sección | 0.6s | valor base |
| Máximo absoluto | 0.9s | nunca superar |
| Hover | 0.3s | siempre 0.3s |
| Stagger entre elementos | 0.08s | en listas y grids |

### Easing
- **Obligatorio:** `[0.16, 1, 0.3, 1]` — ease-out exponencial
- **Hover:** `ease` o `linear` son aceptables para 0.3s
- **Prohibido:** `type: "spring"` con stiffness > 100, `bounce`, `anticipate`

### Scroll-triggered
```tsx
// CORRECTO
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>

// INCORRECTO — no usar amount muy alto
viewport={{ once: true, amount: 0.8 }}  // se dispara demasiado tarde
// INCORRECTO — no animar en cada scroll
viewport={{ once: false }}
```

### Variantes Reutilizables (siempre importar desde `lib/animations.ts`)
```ts
// Las únicas variantes válidas del proyecto:
fadeUp     // entrada con y: 30 → 0, opacidad 0 → 1
stagger    // contenedor con staggerChildren: 0.08
fadeIn     // solo opacidad, sin movimiento
slideRight // entrada desde la izquierda
slideLeft  // entrada desde la derecha
scaleIn    // escala 0.95 → 1 con opacidad
```

**Nunca definir variantes inline en el componente.** Si falta una variante necesaria, agregarla a `lib/animations.ts`.

### Hover
```tsx
// CORRECTO
<motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>

// INCORRECTO — escala demasiado agresiva
whileHover={{ scale: 1.1 }}

// INCORRECTO — sin transición explícita
whileHover={{ scale: 1.02 }}  // sin transition prop
```

## Elementos Prohibidos
- Rotaciones aleatorias o decorativas (`rotate`)
- Efectos de "carga" largos (skeleton loaders animados por más de 1s)
- Rebotes (`type: "spring"` con `bounce > 0`)
- Animaciones de loop infinito en elementos de contenido (solo permitido en loaders y scroll indicators)
- `AnimatePresence` con `mode="wait"` en listas grandes (performance)

## Proceso de Auditoría

Al revisar un componente, verificar:

1. **Duración:** ¿Alguna animación supera 0.9s?
2. **Easing:** ¿Se usa `[0.16, 1, 0.3, 1]`? ¿Hay springs con bounce?
3. **Variantes:** ¿Están en `lib/animations.ts` o definidas inline?
4. **Scroll:** ¿Usa `once: true`? ¿`amount` entre 0.1–0.3?
5. **Hover:** ¿Scale ≤ 1.02? ¿Transición de 0.3s?
6. **Mobile:** ¿Las animaciones funcionan con `prefers-reduced-motion`?

## Accesibilidad — Reduced Motion
Todo componente animado debe respetar `prefers-reduced-motion`:
```tsx
// Agregar en globals.css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Output de Auditoría
Al auditar, reportar:
- Lista de violaciones encontradas con archivo y línea
- Corrección sugerida para cada una
- Si hay variantes inline, proporcionar la versión migrada a `lib/animations.ts`
