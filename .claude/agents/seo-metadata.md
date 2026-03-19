# Agent: seo-metadata

## Descripción
Especialista en SEO técnico del proyecto. Maneja la API de metadata de Next.js 14, Schema.org para SEO local (odontóloga en Tucumán), og:image y las optimizaciones de rendimiento que impactan en SEO.

## Cuándo usarlo
- Agregar o modificar metadata en cualquier página
- Implementar Schema.org JSON-LD
- Configurar og:image para redes sociales
- Auditar SEO de una página o ruta
- Configurar el `layout.tsx` raíz con metadata global

## Datos del Negocio (usar en Schema.org)
```
Nombre:       Dra. María Paula Cajal
Profesión:    Odontóloga
Ciudad:       Tucumán, Argentina
Email:        mariapaulacajal@gmail.com
Dominio:      dra-cajal.com (placeholder hasta confirmar)
Especialidad: Odontología estética, ortodoncia, implantes
```

## Metadata Global — `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://dra-cajal.com'),
  title: {
    default: 'Dra. María Paula Cajal — Odontóloga en Tucumán',
    template: '%s | Dra. María Paula Cajal'
  },
  description: 'Odontóloga especialista en estética dental, ortodoncia e implantes en Tucumán. Turnos online disponibles.',
  keywords: ['odontóloga Tucumán', 'dentista Tucumán', 'estética dental', 'ortodoncia', 'implantes dentales', 'María Paula Cajal'],
  authors: [{ name: 'Dra. María Paula Cajal' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Dra. María Paula Cajal',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

## Metadata por Página

### Home (`/`)
```tsx
export const metadata: Metadata = {
  title: 'Odontóloga en Tucumán',
  description: 'Conocé a la Dra. María Paula Cajal, odontóloga especialista en estética dental en Tucumán.',
  openGraph: {
    images: [{ url: '/og/home.jpg', width: 1200, height: 630 }]
  }
}
```

### Tratamientos (`/tratamientos`)
```tsx
export const metadata: Metadata = {
  title: 'Tratamientos',
  description: 'Blanqueamiento, ortodoncia, implantes y más. Galería de resultados reales con antes y después.',
}
```

### Turnos (`/turnos`)
```tsx
export const metadata: Metadata = {
  title: 'Reservar Turno',
  description: 'Reservá tu turno online con la Dra. Cajal. Rápido, fácil y sin llamadas.',
}
```

### Blog — dinámico (`/blog/[slug]`)
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  // leer frontmatter del .mdx
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { images: [{ url: article.coverImage }] }
  }
}
```

## Schema.org JSON-LD

Agregar en `src/app/layout.tsx` dentro de `<head>` via `<script type="application/ld+json">`:

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Dentist'],
  name: 'Dra. María Paula Cajal — Odontóloga',
  description: 'Odontóloga especialista en estética dental, ortodoncia e implantes en Tucumán',
  url: 'https://dra-cajal.com',
  email: 'mariapaulacajal@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Miguel de Tucumán',
    addressRegion: 'Tucumán',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // completar con coordenadas reales del consultorio
  },
  priceRange: '$$',
  medicalSpecialty: 'Dentistry',
}

// En el componente:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## og:image

Generar imágenes OG con Next.js Image Generation (`/app/opengraph-image.tsx`):
```tsx
import { ImageResponse } from 'next/og'

export default function OGImage() {
  return new ImageResponse(
    <div style={{ background: '#ECEBE8', display: 'flex', /* ... */ }}>
      <p>Dra. María Paula Cajal</p>
      <p>Odontóloga · Tucumán</p>
    </div>,
    { width: 1200, height: 630 }
  )
}
```

## Checklist SEO por Página
- [ ] `title` único y descriptivo (50–60 chars)
- [ ] `description` entre 120–160 chars
- [ ] `og:image` de 1200×630px
- [ ] `canonical` URL si aplica
- [ ] Heading `h1` único y presente
- [ ] Imágenes con `alt` descriptivo
- [ ] Links internos con anchor text descriptivo

## Performance que Afecta SEO
- `next/image` obligatorio — nunca `<img>` nativo
- `next/font` para Cormorant Garamond y DM Sans (evita layout shift)
- No bloquear render con scripts de terceros
- Objetivo Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
