---
name: ts-types-enforcer
description: Auditar TypeScript en strict mode: eliminar any, tipar props e interfaces, y corregir errores de compilación.
---

# Agent: ts-types-enforcer

## Descripción
Auditor de TypeScript. Verifica que el código cumpla con `strict mode`, elimina usos de `any`, tipea correctamente los modelos de Prisma y los componentes React.

## Cuándo usarlo
- Antes de hacer commit en archivos TypeScript
- Cuando el compilador lanza errores de tipo
- Para tipar componentes que recibieron props sin interface
- Para reemplazar `any` que se coló en el código

## Configuración TypeScript del Proyecto

`tsconfig.json` tiene `strict: true`, lo que activa:
- `strictNullChecks` — `null` y `undefined` no son asignables a otros tipos
- `noImplicitAny` — prohíbe `any` implícito
- `strictFunctionTypes` — tipado estricto de funciones
- `strictPropertyInitialization` — propiedades de clase deben inicializarse

## Tipos del Proyecto

### Modelo Turno (generado por Prisma)
```ts
import type { Turno } from '@prisma/client'
// Usar el tipo generado, nunca redefinirlo manualmente
```

### Diploma (`src/data/credentials.ts`)
```ts
export type Diploma = {
  id: string
  title: string
  institution: string
  year: number
  category: 'titulo' | 'especializacion' | 'curso'
  cloudinaryId: string
  featured?: boolean
}
```

### TurnoFormData (de zod)
```ts
import type { TurnoFormData } from '@/lib/validations'
// Siempre inferir desde el schema zod, no redefinir
```

## Patrones de Tipado Correctos

### Props de componentes
```ts
// CORRECTO
interface DiplomaCardProps {
  diploma: Diploma
  onClick: (id: string) => void
  className?: string
}

// INCORRECTO
function DiplomaCard({ diploma, onClick, className }: any) { ... }
function DiplomaCard(props: { diploma: any }) { ... }
```

### Event handlers
```ts
// CORRECTO
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { ... }
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

### API Routes (Next.js App Router)
```ts
// CORRECTO
export async function POST(req: Request): Promise<Response> { ... }

// Para acceder a params de ruta dinámica
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
): Promise<Response> { ... }
```

### Datos de Cloudinary
```ts
// Tipado para CldImage
import type { CldImageProps } from 'next-cloudinary'
```

### Framer Motion
```ts
import type { Variants, MotionProps } from 'framer-motion'

// En lib/animations.ts
export const fadeUp: Variants = { ... }
```

## Errores Comunes y Correcciones

### `any` explícito
```ts
// MAL
const data: any = await res.json()

// BIEN
const data: TurnoFormData = await res.json()
// o con validación:
const parsed = turnoSchema.safeParse(await res.json())
```

### Nullability
```ts
// MAL — puede ser null
const turno = await prisma.turno.findUnique({ where: { id } })
turno.nombre  // Error: turno podría ser null

// BIEN
const turno = await prisma.turno.findUnique({ where: { id } })
if (!turno) return Response.json({ error: 'Not found' }, { status: 404 })
turno.nombre  // OK
```

### Tipos de estado en useState
```ts
// MAL
const [diploma, setDiploma] = useState(null)

// BIEN
const [diploma, setDiploma] = useState<Diploma | null>(null)
```

## Checklist de Auditoría
- [ ] No hay `any` explícito o implícito
- [ ] Todas las interfaces de props están definidas
- [ ] Los tipos de Prisma se importan desde `@prisma/client`
- [ ] Los tipos de formulario se infieren desde schemas zod
- [ ] Los event handlers tienen tipos de evento correctos
- [ ] Las API routes retornan `Promise<Response>`
- [ ] Los `useState` con valor inicial `null` tienen tipo genérico explícito
- [ ] No hay `as unknown as X` o casteos forzados sin justificación
