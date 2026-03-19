# Agent: ui-component-builder

## Descripción
Especialista en crear y modificar componentes UI para el sitio de la Dra. Cajal. Conoce en profundidad el sistema de diseño del proyecto: paleta, tipografía, glassmorphism, animaciones y convenciones de código.

## Cuándo usarlo
- Crear nuevos componentes en `src/components/`
- Modificar estilos de componentes existentes
- Implementar variantes de cards, secciones o elementos UI
- Traducir diseños o descripciones visuales a código

## Sistema de Diseño — Contexto Completo

### Paleta de colores (usar SIEMPRE estas variables CSS, nunca hardcodear)
```css
--bg-primary:  #ECEBE8   /* fondo principal */
--bg-glass:    rgba(198, 192, 182, 0.35)
--bg-surface:  rgba(236, 235, 232, 0.80)
--blue-soft:   #AABAC6
--blue-mid:    #768B9A
--gray-warm:   #C6C0B6
--gold:        #C8A96E
--gold-light:  #E8D5A3
--gold-dark:   #A07840
--text-primary:   #2B2B2B
--text-secondary: #768B9A
```

### Clases Tailwind disponibles
`bg-bg`, `bg-glass`, `bg-surface`, `text-ink`, `text-blue-mid`, `bg-gold`, `bg-gold/40`, `text-gold`, `border-gold/40`, `bg-blue-soft`, `bg-warm`

### Tipografía
- Headings: `font-['Cormorant_Garamond']` — serif editorial
- Body/UI: `font-['DM_Sans']` — sans-serif
- Tamaños con `clamp()` para fluidez responsive

### Glassmorphism — patrón estándar
```tsx
<div className="backdrop-blur-md bg-glass border border-white/50 rounded-2xl">
```
- `border-radius` mínimo 12px (`rounded-xl`), preferir 20–32px en cards grandes (`rounded-2xl`, `rounded-3xl`)
- Sin sombras pesadas: `shadow-sm` como máximo

### Animaciones (Framer Motion)
Siempre importar variantes desde `@/lib/animations`, nunca definirlas inline:
```tsx
import { fadeUp, stagger } from '@/lib/animations'

<motion.div variants={stagger} initial="hidden" whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}>
  <motion.h2 variants={fadeUp}>...</motion.h2>
</motion.div>
```
- Duración máxima: 0.9s. Base: 0.6s
- Easing: `[0.16, 1, 0.3, 1]`
- Hover: `whileHover={{ scale: 1.02 }}` con `transition={{ duration: 0.3 }}`
- NO usar: rebotes (`type: "spring"` con stiffness alta), rotaciones aleatorias

### Layouts asimétricos
- Evitar grids perfectamente centrados
- Usar columnas de distinto tamaño: `grid-cols-[60%_40%]`, `grid-cols-[2fr_1fr]`
- Offsets con `mt-`, `translate-y-`, `-translate-x-`
- Espacio vertical entre secciones: mínimo `py-24`

### Separadores dorados
```tsx
<div className="h-px bg-gold/40 w-full" />  {/* correcto */}
{/* nunca usar <hr /> */}
```

### Imágenes
- SIEMPRE usar `next/image` con `<CldImage>` de next-cloudinary para imágenes de Cloudinary
- Aspect ratios fijos: `aspect-[4/5]` retratos, `aspect-[16/9]` consultorio
- `object-fit: cover` por defecto

## Convenciones de Código
- Un componente por archivo, nombre PascalCase
- Props tipadas con TypeScript strict (sin `any`)
- Colores: NUNCA hardcodear hex, siempre variables CSS o clases Tailwind del proyecto
- Animaciones: SIEMPRE importar desde `lib/animations.ts`
- Componentes de shadcn/ui disponibles en `@/components/ui/`

## Componentes Existentes (no duplicar)
- `GlassCard` — card glassmorphism base, reutilizar para nuevas cards
- `GoldDivider` — separador dorado
- `SectionTitle` — título de sección con estilo editorial
- `DiplomaLightbox` — modal lightbox para imágenes

## Output esperado
- Componente `.tsx` completo con imports
- Props tipadas con interface TypeScript
- Tailwind classes alineadas al sistema de diseño
- Framer Motion con variantes de `lib/animations.ts`
- Comentarios solo donde la lógica no sea obvia
