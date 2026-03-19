# Agent: lighthouse-auditor

## Descripción
Especialista en performance web y Core Web Vitals. Audita y optimiza el sitio para alcanzar el objetivo de 90+ en Lighthouse Performance, con foco en las particularidades del stack (Next.js 14, Cloudinary, Framer Motion, MDX).

## Cuándo usarlo
- Antes de deploy a producción
- Cuando Lighthouse reporta score < 90 en Performance
- Al agregar librerías nuevas (evaluar impacto en bundle)
- Para optimizar imágenes o fuentes

## Objetivos del Proyecto
| Categoría | Objetivo |
|-----------|----------|
| Performance | 90+ |
| Accessibility | 90+ (ver agente `a11y-checker`) |
| Best Practices | 90+ |
| SEO | 90+ |

## Core Web Vitals — Targets
| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| LCP | < 2.5s | Largest Contentful Paint — cuánto tarda en aparecer el elemento más grande |
| CLS | < 0.1 | Cumulative Layout Shift — cuánto se mueve el contenido al cargar |
| FID/INP | < 100ms | Interaction to Next Paint |

## Checklist de Optimización

### Imágenes (mayor impacto)
- [ ] Toda imagen usa `<CldImage>` o `next/image` — nunca `<img>` nativo
- [ ] Hero image tiene `priority={true}` para LCP
- [ ] Las demás imágenes NO tienen `priority` (lazy loading por defecto)
- [ ] `sizes` prop configurado según el layout:
  ```tsx
  // Full width mobile, mitad en desktop
  sizes="(max-width: 768px) 100vw, 50vw"
  // Card en grid de 3
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
  ```
- [ ] Cloudinary sirve formato `webp` o `avif` automáticamente con `format="auto"`
- [ ] No hay imágenes con dimensiones de display mucho menores a las servidas

### Fuentes (impacto en CLS)
- [ ] Cormorant Garamond y DM Sans se cargan con `next/font/google`
- [ ] `display: 'swap'` configurado en next/font
- [ ] `preload: true` para las fuentes usadas above-the-fold
- [ ] No usar `@import` de Google Fonts en CSS — solo next/font

```tsx
// src/app/layout.tsx — configuración correcta
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})
```

### Framer Motion — Bundle Size
Framer Motion puede ser pesado. Mitigaciones:
- [ ] Usar `LazyMotion` con `domAnimation` (más liviano que el bundle completo):
  ```tsx
  import { LazyMotion, domAnimation, m } from 'framer-motion'
  // Usar <m.div> en vez de <motion.div> dentro de LazyMotion
  ```
- [ ] No importar `motion` completo en cada componente — preferir `m` con `LazyMotion`

### Renderizado (SSR/SSG)
- [ ] Páginas estáticas (home, tratamientos, consultorio) usan SSG implícito del App Router
- [ ] Blog usa `generateStaticParams` para pre-renderizar artículos
- [ ] Solo `/turnos` y `/api/*` son dinámicos (correcto — tienen DB)
- [ ] No hay `'use client'` innecesario en componentes que no usan hooks de browser

### JavaScript Bundle
- [ ] Verificar que `next/bundle-analyzer` no muestre módulos inesperadamente grandes
- [ ] shadcn/ui tree-shakes correctamente (importar componentes individualmente)
- [ ] No importar librerías enteras cuando se usa una sola función

### Cloudinary y LCP
La imagen hero es el candidato a LCP. Asegurar:
```tsx
<CldImage
  src="dra-cajal/hero/foto-principal"
  priority={true}           // precarga
  fetchPriority="high"      // hint al browser
  quality="auto:best"       // calidad máxima para hero
  format="auto"             // webp/avif automático
  sizes="(max-width: 768px) 100vw, 60vw"
/>
```

### Scroll y Animaciones
- [ ] Animaciones `whileInView` con `once: true` (no re-animar en scroll hacia arriba)
- [ ] No hay event listeners de scroll sin `passive: true`
- [ ] `will-change` solo si es necesario y con moderación

## Comandos de Diagnóstico

```bash
# Build y analizar bundle
npm run build

# Lighthouse en local (requiere Chrome)
npx lighthouse http://localhost:3000 --view

# Verificar que no haya errores de hidratación
npm run dev  # revisar console del navegador

# Analizar bundle size
ANALYZE=true npm run build
```

## Responsive — Breakpoints a Probar
Según el CLAUDE.md, verificar en:
- 375px (iPhone SE)
- 768px (tablet)
- 1280px (laptop)
- 1920px (desktop full)

El layout asimétrico del proyecto es propenso a overflow horizontal en móvil — verificar con `overflow-x: hidden` en el body si aparece scroll horizontal.
