---
name: design-system
description: Referencia rápida del sistema de diseño del proyecto: paleta de colores, tipografía, glassmorphism, border radius, espaciado y animaciones.
---

# Skill: design-system

## Cuándo aplicar este skill
Referencia rápida al crear o modificar cualquier componente visual. Consultar antes de elegir colores, tipografía, espaciado o animaciones.

## Paleta de Colores

### Variables CSS (definidas en `globals.css`)
```css
--bg-primary:     #ECEBE8   /* SW 9542 Natural White — fondo principal */
--bg-glass:       rgba(198, 192, 182, 0.35)  /* glassmorphism */
--bg-surface:     rgba(236, 235, 232, 0.80)  /* superficies semi-opacas */
--blue-soft:      #AABAC6   /* SW 6240 Windy Blue — acento suave */
--blue-mid:       #768B9A   /* SW 6242 Bracing Blue — texto secundario */
--gray-warm:      #C6C0B6   /* SW 7641 Colonnade Gray — separadores */
--gold:           #C8A96E   /* acento editorial */
--gold-light:     #E8D5A3
--gold-dark:      #A07840
--text-primary:   #2B2B2B   /* texto principal */
--text-secondary: #768B9A   /* texto secundario */
```

### Clases Tailwind del Proyecto
| Propósito | Clase |
|-----------|-------|
| Fondo principal | `bg-bg` |
| Glassmorphism | `bg-glass` |
| Superficie | `bg-surface` |
| Acento azul suave | `bg-blue-soft` / `text-blue-soft` |
| Azul medio | `bg-blue-mid` / `text-blue-mid` |
| Gris cálido | `bg-warm` |
| Dorado | `bg-gold` / `text-gold` / `border-gold` |
| Texto principal | `text-ink` |

### Regla de Oro
- **Nunca** hardcodear hex en componentes
- **Nunca** usar dorado (`--gold`) para texto funcional — solo decoración
- Texto `--text-secondary` sobre fondo claro: cumple WCAG AA solo en tamaños >= 16px

## Tipografía

| Uso | Fuente | Clase Tailwind |
|-----|--------|----------------|
| Títulos y headings | Cormorant Garamond | `font-['Cormorant_Garamond']` |
| Body, UI, labels | DM Sans | `font-['DM_Sans']` |

### Tamaños con clamp (copiar tal cual)
```css
h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-size: clamp(2rem, 4vw, 3.5rem); }
p  { font-size: clamp(0.95rem, 1.5vw, 1.1rem); }
```

## Glassmorphism — Patrón Estándar
```tsx
<div className="backdrop-blur-md bg-glass border border-white/50 rounded-2xl">
```
Variante con más opacidad (formularios):
```tsx
<div className="backdrop-blur-md bg-surface border border-white/50 rounded-3xl">
```

## Border Radius
| Contexto | Valor | Clase |
|----------|-------|-------|
| Mínimo absoluto | 12px | `rounded-xl` |
| Cards medianas | 20px | `rounded-[20px]` |
| Cards grandes, modales | 24–32px | `rounded-2xl` / `rounded-3xl` |
| Inputs, badges | 8–12px | `rounded-lg` / `rounded-xl` |

**Nunca** usar `rounded-none` o `rounded-sm` — bordes cuadrados están prohibidos.

## Espaciado

- Padding vertical entre secciones: mínimo `py-24`
- Padding interno de cards grandes: `p-8` o `p-10`
- Espacio en blanco generoso — preferir más espacio a menos

## Separadores
```tsx
// Correcto — separador dorado
<div className="h-px bg-gold/40 w-full" />

// Nunca usar
<hr />
```

## Sombras
- Máximo permitido: `shadow-sm`
- Sombra custom suave: `shadow-[0_4px_24px_rgba(0,0,0,0.06)]`
- **Nunca** `shadow-md`, `shadow-lg`, `shadow-xl`

## Imágenes
```tsx
// Retratos
<CldImage className="aspect-[4/5] object-cover rounded-2xl" />

// Consultorio / paisajes
<CldImage className="aspect-[16/9] object-cover rounded-2xl" />

// Diplomas
<CldImage className="aspect-[3/4] object-cover" />
```

## Layouts Asimétricos
```tsx
// Bio — texto 60% / visual 40%
<div className="grid grid-cols-[3fr_2fr] gap-12">

// Grid con offset visual
<div className="grid grid-cols-2 gap-8">
  <div className="mt-12">...</div>  {/* offset */}
  <div>...</div>
</div>

// Nunca: grid simétrico perfectamente centrado para contenido editorial
```

## Animaciones — Referencia Rápida
```tsx
import { fadeUp, stagger } from '@/lib/animations'

// Sección con stagger
<motion.div variants={stagger} initial="hidden" whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}>
  <motion.h2 variants={fadeUp}>Título</motion.h2>
  <motion.p variants={fadeUp}>Texto</motion.p>
</motion.div>

// Hover en cards
<motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
```

Reglas rápidas: duración base 0.6s, máximo 0.9s, easing `[0.16, 1, 0.3, 1]`, hover siempre 0.3s.

## Checklist Visual Rápido
- [ ] Colores desde variables CSS o clases Tailwind del proyecto
- [ ] Border radius >= 12px en todos los elementos
- [ ] Separadores con `bg-gold/40`, no `<hr>`
- [ ] Sombras máximo `shadow-sm`
- [ ] Imágenes con aspect-ratio fijo y `object-cover`
- [ ] Layout asimétrico en secciones editoriales
- [ ] Animaciones importadas desde `lib/animations.ts`
