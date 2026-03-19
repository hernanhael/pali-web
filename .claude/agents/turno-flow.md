# Agent: turno-flow

## Descripción
Especialista en el flujo completo de reserva de turnos: formulario, validación, API route, persistencia en base de datos y envío de emails. Conoce el schema Prisma, la configuración de Resend y las reglas de negocio del sistema de turnos.

## Cuándo usarlo
- Crear o modificar `TurnoForm.tsx` y `ConfirmationModal.tsx`
- Trabajar en `src/app/api/turnos/route.ts`
- Modificar el schema Prisma del modelo `Turno`
- Configurar o ajustar emails con Resend
- Implementar lógica de validación con zod

## Schema de Base de Datos

```prisma
model Turno {
  id             String   @id @default(cuid())
  nombre         String
  email          String
  telefono       String
  tipoConsulta   String
  fechaPreferida DateTime
  horario        String
  mensaje        String?
  estado         String   @default("pendiente") // pendiente | confirmado | cancelado
  createdAt      DateTime @default(now())
}
```

## Variables de Entorno Requeridas
```env
DATABASE_URL="postgresql://..."
RESEND_API_KEY="re_..."
EMAIL_FROM="turnos@dra-cajal.com"
EMAIL_DOCTORA="mariapaulacajal@gmail.com"
```

## Flujo Completo del Turno

1. Usuario completa `TurnoForm` (react-hook-form + zod)
2. Submit → `POST /api/turnos`
3. API route: valida con zod → guarda en PostgreSQL via Prisma → envía 2 emails via Resend
4. Email 1: confirmación al paciente (a su email)
5. Email 2: aviso a la doctora (a `EMAIL_DOCTORA`)
6. Response exitosa → muestra `ConfirmationModal` con animación suave

## Campos del Formulario
- `nombre` — string, requerido
- `email` — email válido, requerido
- `telefono` — string, requerido
- `tipoConsulta` — enum: 'consulta-general' | 'estetica' | 'ortodoncia' | 'implantes' | 'urgencia'
- `fechaPreferida` — Date, requerida, no puede ser en el pasado
- `horario` — enum: 'manana' | 'tarde' (o franjas horarias específicas)
- `mensaje` — string, opcional

## Schema Zod (usar en cliente Y servidor)
```ts
import { z } from 'zod'

export const turnoSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(8, 'Teléfono inválido'),
  tipoConsulta: z.enum(['consulta-general', 'estetica', 'ortodoncia', 'implantes', 'urgencia']),
  fechaPreferida: z.coerce.date().min(new Date(), 'La fecha debe ser futura'),
  horario: z.enum(['manana', 'tarde']),
  mensaje: z.string().optional(),
})

export type TurnoFormData = z.infer<typeof turnoSchema>
```

## Estilo del Formulario
El formulario vive en una `GlassCard` centrada en la página:
```tsx
<div className="backdrop-blur-md bg-glass border border-white/50 rounded-3xl p-8 max-w-xl mx-auto">
```
Inputs con estilo coherente al sistema de diseño: `bg-surface border-warm/50 rounded-xl focus:border-blue-mid`

## Patrones de Código

### API Route (`src/app/api/turnos/route.ts`)
```ts
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { turnoSchema } from '@/lib/validations'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = turnoSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error }, { status: 400 })

  const turno = await prisma.turno.create({ data: parsed.data })

  await Promise.all([
    resend.emails.send({ /* email al paciente */ }),
    resend.emails.send({ /* aviso a la doctora */ }),
  ])

  return Response.json({ turno }, { status: 201 })
}
```

### Hook personalizado
Usar `useTurnoForm.ts` para encapsular lógica de react-hook-form + submit + estado del modal.

## Estados del Turno
- `pendiente` — recién creado, default
- `confirmado` — doctora confirmó via panel admin
- `cancelado` — cancelado por cualquier parte

## Errores Comunes a Evitar
- No usar `any` en tipos de Prisma — usar los tipos generados automáticamente
- No enviar emails en paralelo si alguno depende del resultado del otro
- Validar fecha en servidor también, no solo en cliente
- El cliente Prisma es singleton (`lib/prisma.ts`), no instanciar en cada request
