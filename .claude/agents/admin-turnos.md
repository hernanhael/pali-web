# Agent: admin-turnos

## Descripción
Especialista en el panel de administración de turnos. Maneja la API protegida, la visualización y gestión de reservas, y los cambios de estado (pendiente → confirmado / cancelado).

## Cuándo usarlo
- Construir o modificar el panel admin de turnos
- Implementar la ruta `GET /api/admin/turnos`
- Agregar acciones de confirmar/cancelar turnos
- Enviar emails de confirmación desde el panel

## Autenticación del Panel

El panel usa autenticación simple con `ADMIN_SECRET` (no OAuth, no usuarios). Adecuado para una sola persona (la doctora o asistente):

```ts
// Verificación en API routes
const authHeader = req.headers.get('authorization')
if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
  return Response.json({ error: 'No autorizado' }, { status: 401 })
}
```

En el frontend del panel, el token se guarda en `sessionStorage` (no localStorage) y se envía en cada request.

**Variable de entorno requerida:**
```env
ADMIN_SECRET="tu-clave-secreta-larga-y-random"
```

## API Routes del Panel

### `GET /api/admin/turnos`
Lista todos los turnos, con filtros opcionales:
```ts
// Query params soportados:
// ?estado=pendiente|confirmado|cancelado
// ?fecha=2024-03-15  (fecha específica)
// ?limit=50&offset=0 (paginación)

// Response
{
  turnos: Turno[],
  total: number
}
```

### `PATCH /api/admin/turnos/[id]`
Cambiar estado de un turno:
```ts
// Body
{ estado: 'confirmado' | 'cancelado' }

// Al confirmar: enviar email de confirmación al paciente
// Al cancelar: enviar email de cancelación al paciente
```

### `DELETE /api/admin/turnos/[id]`
Eliminar turno (solo para borrar registros de prueba en desarrollo).

## Emails desde el Panel

Al cambiar estado desde el panel, Resend envía el email correspondiente:

### Email de confirmación (estado → confirmado)
```
Asunto: Tu turno está confirmado — Dra. Cajal
Cuerpo: Hola {nombre}, tu turno del {fecha} a la {horario} está confirmado.
        Ante cualquier consulta respondé este email.
```

### Email de cancelación (estado → cancelado)
```
Asunto: Turno cancelado — Dra. Cajal
Cuerpo: Hola {nombre}, lamentamos informarte que tu turno del {fecha}
        fue cancelado. Por favor contactanos para reagendar.
```

## Vista del Panel Admin

Ruta: `/admin/turnos` (no indexada por SEO — agregar `noindex` en metadata)

Componentes del panel:
- Tabla de turnos con columnas: Nombre, Email, Teléfono, Tipo, Fecha, Horario, Estado, Acciones
- Filtro por estado (tabs o select)
- Acciones por fila: Confirmar / Cancelar (con confirmación)
- Badge de estado con color: pendiente → amarillo, confirmado → verde, cancelado → rojo

```tsx
// Estilos de badges de estado (fuera del sistema de diseño principal — funcional)
const estadoStyles = {
  pendiente:   'bg-amber-100 text-amber-800',
  confirmado:  'bg-green-100 text-green-800',
  cancelado:   'bg-red-100 text-red-800',
}
```

## Schema Prisma — Referencia
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
  estado         String   @default("pendiente")
  createdAt      DateTime @default(now())
}
```

## Seguridad
- La ruta `/admin` NO debe tener link en el navbar público
- El `ADMIN_SECRET` nunca se expone al cliente — solo en server-side y API routes
- Las API routes del admin siempre verifican el header `Authorization` primero
- En producción, considerar agregar rate limiting a `/api/admin/*`

## Queries Prisma Útiles
```ts
// Turnos de hoy
const hoy = new Date()
hoy.setHours(0,0,0,0)
const mañana = new Date(hoy)
mañana.setDate(mañana.getDate() + 1)

await prisma.turno.findMany({
  where: {
    fechaPreferida: { gte: hoy, lt: mañana },
    estado: 'confirmado'
  },
  orderBy: { horario: 'asc' }
})

// Turnos pendientes sin respuesta (más de 24hs)
await prisma.turno.findMany({
  where: {
    estado: 'pendiente',
    createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
  }
})
```
