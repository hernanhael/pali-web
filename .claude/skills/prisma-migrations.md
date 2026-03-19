# Skill: prisma-migrations

## Cuándo aplicar este skill
Cada vez que haya que modificar el schema de la base de datos — agregar campos, cambiar tipos, agregar modelos.

## Schema Actual del Proyecto

```prisma
// prisma/schema.prisma
model Turno {
  id             String   @id @default(cuid())
  nombre         String
  email          String
  telefono       String
  tipoConsulta   String
  fechaPreferida DateTime
  horario        String
  mensaje        String?
  estado         String   @default("pendiente")
  createdAt      DateTime @default(now())
}
```

## Flujo Seguro para Cambios de Schema

### En desarrollo (Supabase dev o local)
```bash
# 1. Modificar prisma/schema.prisma
# 2. Sincronizar con la DB de desarrollo (sin migraciones formales)
npx prisma db push

# 3. Regenerar el cliente TypeScript
npx prisma generate

# 4. Verificar en Prisma Studio
npx prisma studio
```

### En producción (Supabase production)
```bash
# Crear migración formal con nombre descriptivo
npx prisma migrate dev --name agregar-campo-confirmadoAt

# Aplicar en producción
npx prisma migrate deploy
```

⚠️ **Nunca** usar `db push` en producción — puede borrar datos. Siempre usar `migrate deploy`.

## Cambios Comunes y Cómo Hacerlos

### Agregar un campo opcional (seguro, no rompe nada)
```prisma
model Turno {
  // ... campos existentes
  confirmedAt DateTime?  // campo nuevo opcional
  cancelReason String?   // otro campo opcional
}
```
```bash
npx prisma migrate dev --name agregar-confirmedAt
```

### Agregar un campo requerido (requiere valor default o migración en dos pasos)
```prisma
// MAL — rompe la DB si hay registros existentes
model Turno {
  prioridad String  // requerido sin default = error
}

// BIEN — opción 1: con default
model Turno {
  prioridad String @default("normal")
}

// BIEN — opción 2: opcional primero, luego rellenar y hacer requerido
model Turno {
  prioridad String?  // paso 1
}
// Después de rellenar los datos existentes:
model Turno {
  prioridad String  // paso 2
}
```

### Agregar un nuevo modelo
```prisma
model Paciente {
  id        String   @id @default(cuid())
  nombre    String
  email     String   @unique
  turnos    Turno[]
  createdAt DateTime @default(now())
}

model Turno {
  // ... campos existentes
  pacienteId String?
  paciente   Paciente? @relation(fields: [pacienteId], references: [id])
}
```

## Comandos de Referencia

```bash
# Ver estado actual de migraciones
npx prisma migrate status

# Formatear schema.prisma
npx prisma format

# Abrir Prisma Studio (UI visual de la DB)
npx prisma studio

# Resetear DB de desarrollo (BORRA TODOS LOS DATOS)
npx prisma migrate reset  # solo en desarrollo

# Regenerar cliente después de cambios
npx prisma generate
```

## Checklist antes de Modificar el Schema
- [ ] ¿El cambio es compatible con los datos existentes?
- [ ] Si el campo es requerido, ¿tiene valor `@default`?
- [ ] ¿Se actualizaron los tipos TypeScript que usan este modelo?
- [ ] ¿Se actualizó el schema zod en `lib/validations.ts` si el campo es parte del formulario?
- [ ] ¿Se probó la migración en desarrollo antes de aplicar en producción?

## Configuración Supabase + Prisma

```env
# .env.local — desarrollo
DATABASE_URL="postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres"

# Producción en Vercel — usar connection pooler
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
