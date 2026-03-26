---
name: nextjs-app-router
description: Patrones y convenciones para Next.js 14 App Router: cuándo usar Server vs Client Components, metadata por página, fetch de datos y Framer Motion.
---

# Skill: nextjs-app-router

## Cuándo aplicar este skill
Cada vez que se crea o modifica un archivo en `src/app/` — páginas, layouts, API routes, o componentes que necesiten decidir entre Server y Client Component.

## Regla Principal: Server Components por Defecto

En Next.js 14 App Router, **todos los componentes son Server Components por defecto**. Solo agregar `'use client'` cuando sea estrictamente necesario.

### Agregar `'use client'` únicamente si el componente usa:
- Hooks de React (`useState`, `useEffect`, `useRef`, `useContext`)
- Event handlers (`onClick`, `onChange`, `onSubmit`)
- APIs del browser (`window`, `localStorage`, `document`)
- Librerías que requieren el cliente (Framer Motion, react-hook-form)

### Nunca agregar `'use client'` en:
- Páginas que solo muestran datos (`page.tsx` estáticas)
- Layouts (`layout.tsx`)
- Componentes que solo reciben props y renderizan JSX
- Componentes que hacen fetch de datos

## Estructura de Archivos — Convenciones

```
src/app/
├── layout.tsx           # Server Component — nunca 'use client'
├── page.tsx             # Server Component por defecto
├── tratamientos/
│   └── page.tsx         # Server Component
├── turnos/
│   └── page.tsx         # Server Component (wrapper)
│       # TurnoForm.tsx será Client Component
└── api/
    └── turnos/
        └── route.ts     # Route Handler — no es un componente
```

## Patrones del Proyecto

### Página con componente interactivo (patrón más común)
```tsx
// src/app/turnos/page.tsx — Server Component
import { TurnoForm } from '@/components/turnos/TurnoForm'

export default function TurnosPage() {
  return (
    <main>
      <TurnoForm />  {/* TurnoForm tiene 'use client' */}
    </main>
  )
}
```

```tsx
// src/components/turnos/TurnoForm.tsx — Client Component
'use client'
import { useForm } from 'react-hook-form'
// ...
```

### Fetch de datos en Server Component
```tsx
// src/app/blog/page.tsx
export default async function BlogPage() {
  // Fetch directo, sin useEffect, sin useState
  const articles = await getArticles()
  return <ArticleGrid articles={articles} />
}
```

### API Route
```ts
// src/app/api/turnos/route.ts
// No es un componente — no tiene 'use client' ni 'use server'
export async function POST(req: Request): Promise<Response> {
  // ...
}
```

## Metadata por Página
```tsx
// En cualquier page.tsx o layout.tsx (Server Component)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reservar Turno',
  description: '...',
}

export default function Page() { ... }
```

Para metadata dinámica (blog/[slug]):
```tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  return { title: article.title }
}
```

## Generación Estática

```tsx
// src/app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}
```

## Errores Comunes a Evitar

```tsx
// MAL — 'use client' innecesario
'use client'
export default function AboutSection({ bio }: { bio: string }) {
  return <p>{bio}</p>  // no usa ningún hook ni evento
}

// BIEN — Server Component
export default function AboutSection({ bio }: { bio: string }) {
  return <p>{bio}</p>
}
```

```tsx
// MAL — fetch en Client Component con useEffect
'use client'
export default function TratamientosPage() {
  const [data, setData] = useState([])
  useEffect(() => { fetch('/api/tratamientos').then(...) }, [])
  // ...
}

// BIEN — fetch en Server Component
export default async function TratamientosPage() {
  const data = await getTratamientos()
  return <TratamientosGrid data={data} />
}
```

## Framer Motion en Server Components

Framer Motion requiere el cliente. Patrón correcto:
```tsx
// Wrapper client component para animaciones
'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.div>
  )
}
```
