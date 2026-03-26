---
name: blog-mdx
description: Crear artículos MDX, modificar MDXComponents o configurar el renderizado en blog/[slug]/page.tsx.
---

# Agent: blog-mdx

## Descripción
Especialista en el sistema de blog del proyecto. Maneja la creación de artículos MDX, los componentes custom y la configuración de next-mdx-remote.

## Cuándo usarlo
- Crear nuevos artículos en `src/content/blog/`
- Agregar o modificar componentes custom de MDX (`MDXComponents.tsx`)
- Configurar el renderizado de MDX en `blog/[slug]/page.tsx`
- Problemas con el parsing o renderizado de MDX

## Estructura de un Artículo MDX

Todos los artículos en `src/content/blog/{slug}.mdx`:

```mdx
---
title: "Cómo cuidar tu sonrisa después de un blanqueamiento"
excerpt: "Los primeros 48 horas son clave. Te cuento qué podés comer y qué hábitos mantener para que el resultado dure."
date: "2024-03-15"
category: "Cuidados"
coverImage: "dra-cajal/blog/blanqueamiento-cuidados"  # public_id Cloudinary
author: "Dra. María Paula Cajal"
readingTime: 4
---

Introducción en texto normal...

<Callout>
  Tip importante destacado en un recuadro.
</Callout>

## Subtítulo de sección

Más texto...

<ImageCaption
  src="dra-cajal/blog/blanqueamiento-resultado"
  alt="Resultado de blanqueamiento"
  caption="Resultado a las 48hs del tratamiento"
/>
```

## Tipo Frontmatter
```ts
export type ArticleFrontmatter = {
  title: string
  excerpt: string
  date: string          // ISO: "2024-03-15"
  category: string
  coverImage: string    // public_id Cloudinary
  author: string
  readingTime: number   // minutos
}
```

## Componentes Custom MDX (`src/components/blog/MDXComponents.tsx`)

### `<Callout>` — cita o tip destacado
```tsx
// Uso en MDX:
<Callout type="tip">Texto del tip</Callout>
<Callout type="warning">Advertencia importante</Callout>
<Callout type="info">Dato informativo</Callout>

// Estilos: glassmorphism con acento de color según type
// tip → border-gold/40, bg-gold/5
// warning → border-blue-mid/40, bg-blue-soft/10
// info → border-warm/40, bg-surface
```

### `<ImageCaption>` — imagen con pie de foto
```tsx
// Uso en MDX:
<ImageCaption
  src="cloudinary-public-id"
  alt="Descripción de la imagen"
  caption="Texto del pie de foto"
/>

// Implementación: CldImage + <figcaption> con text-blue-mid italic
```

### `<Quote>` — cita destacada editorial
```tsx
// Uso en MDX:
<Quote author="Dra. Cajal">
  La salud bucal es la puerta a la salud general.
</Quote>

// Estilos: Cormorant Garamond italic, tamaño grande, línea dorada a la izquierda
```

## Configuración next-mdx-remote

### `blog/[slug]/page.tsx`
```tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/blog/MDXComponents'

// Leer el archivo .mdx desde el filesystem
// Parsear frontmatter con gray-matter
// Renderizar con:
<MDXRemote source={content} components={MDXComponents} />
```

### `blog/page.tsx` — listado de artículos
- Leer todos los `.mdx` de `src/content/blog/`
- Extraer frontmatter con `gray-matter`
- Ordenar por fecha descendente
- Renderizar con `ArticleCard` en grid asimétrico

## Estilos de Prosa

El contenido MDX necesita estilos de tipografía. Usar Tailwind Typography (`@tailwindcss/typography`) con customización del proyecto:

```tsx
<article className="prose prose-lg max-w-none
  prose-headings:font-['Cormorant_Garamond']
  prose-headings:text-ink
  prose-p:font-['DM_Sans'] prose-p:text-ink/80
  prose-a:text-gold prose-a:no-underline hover:prose-a:underline
  prose-strong:text-ink
">
  <MDXRemote ... />
</article>
```

## Categorías de Blog
- `Cuidados` — tips post-tratamiento, higiene bucal
- `Tratamientos` — explicaciones de procedimientos
- `Noticias` — novedades del consultorio
- `Consejos` — recomendaciones generales

## SEO de Artículos
Cada artículo genera su propia metadata dinámica con `generateMetadata`. Ver agente `seo-metadata` para el patrón.

## Generación Estática
Usar `generateStaticParams` en `blog/[slug]/page.tsx` para pre-renderizar todos los artículos en build:
```ts
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs() // leer archivos .mdx
  return slugs.map(slug => ({ slug }))
}
```
