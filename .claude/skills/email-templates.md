---
name: email-templates
description: Templates HTML para emails enviados con Resend: confirmación de turno al paciente, aviso a la doctora y cambios de estado desde el panel admin.
---

# Skill: email-templates

## Cuándo aplicar este skill
Al crear o modificar cualquier email enviado por Resend — confirmación de turno al paciente, aviso a la doctora, o email de cambio de estado desde el panel admin.

## Configuración de Resend

```ts
// src/lib/resend.ts
import { Resend } from 'resend'
export const resend = new Resend(process.env.RESEND_API_KEY)
```

```env
RESEND_API_KEY="re_..."
EMAIL_FROM="turnos@dra-cajal.com"
EMAIL_DOCTORA="mariapaulacajal@gmail.com"
```

## Los 4 Emails del Proyecto

### 1. Confirmación al paciente (turno recibido)
Se envía automáticamente cuando el paciente completa el formulario.

```ts
await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: turno.email,
  subject: 'Recibimos tu solicitud de turno — Dra. Cajal',
  html: emailTurnoRecibido(turno),
})
```

### 2. Aviso a la doctora (turno nuevo)
Se envía junto con el anterior, al email de la doctora.

```ts
await resend.emails.send({
  from: process.env.EMAIL_FROM!,
  to: process.env.EMAIL_DOCTORA!,
  subject: `Nuevo turno: ${turno.nombre} — ${formatFecha(turno.fechaPreferida)}`,
  html: emailAvisoDoctora(turno),
})
```

### 3. Turno confirmado (desde el panel admin)
Se envía cuando la doctora confirma el turno.

### 4. Turno cancelado (desde el panel admin)
Se envía cuando el turno es cancelado.

## Templates HTML

Usar HTML inline simple — los clientes de email no soportan CSS externo ni clases de Tailwind.

### Paleta para emails (inline, no variables CSS)
```
Fondo:        #ECEBE8
Superficie:   #FFFFFF
Texto:        #2B2B2B
Secundario:   #768B9A
Dorado:       #C8A96E
Separador:    #C6C0B6
```

### Template base (copiar para cada email)
```ts
export function emailBase(contenido: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#ECEBE8;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#FFFFFF;border-radius:16px 16px 0 0;padding:32px 40px 24px;border-bottom:1px solid #C6C0B6;">
              <p style="margin:0;font-size:13px;color:#768B9A;letter-spacing:0.1em;text-transform:uppercase;">Dra. María Paula Cajal</p>
              <h1 style="margin:8px 0 0;font-size:24px;color:#2B2B2B;font-weight:400;">Odontología</h1>
            </td>
          </tr>

          <!-- Contenido -->
          <tr>
            <td style="background:#FFFFFF;padding:32px 40px;">
              ${contenido}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FFFFFF;border-radius:0 0 16px 16px;padding:24px 40px 32px;border-top:1px solid #C6C0B6;">
              <p style="margin:0;font-size:13px;color:#768B9A;line-height:1.6;">
                Este mensaje fue enviado automáticamente desde el sitio de la Dra. Cajal.<br>
                Ante cualquier consulta, respondé este email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
```

### Template: turno recibido (al paciente)
```ts
export function emailTurnoRecibido(turno: Turno): string {
  const contenido = `
    <p style="margin:0 0 24px;font-size:16px;color:#2B2B2B;line-height:1.6;">
      Hola <strong>${turno.nombre}</strong>,
    </p>
    <p style="margin:0 0 24px;font-size:16px;color:#2B2B2B;line-height:1.6;">
      Recibimos tu solicitud de turno. Te contactaremos a la brevedad para confirmar la fecha.
    </p>

    <!-- Detalle del turno -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#ECEBE8;border-radius:12px;padding:24px;margin-bottom:24px;">
      <tr><td style="padding:6px 0;">
        <span style="font-size:13px;color:#768B9A;">Tipo de consulta</span><br>
        <span style="font-size:15px;color:#2B2B2B;">${turno.tipoConsulta}</span>
      </td></tr>
      <tr><td style="padding:6px 0;border-top:1px solid #C6C0B6;">
        <span style="font-size:13px;color:#768B9A;">Fecha preferida</span><br>
        <span style="font-size:15px;color:#2B2B2B;">${formatFecha(turno.fechaPreferida)}</span>
      </td></tr>
      <tr><td style="padding:6px 0;border-top:1px solid #C6C0B6;">
        <span style="font-size:13px;color:#768B9A;">Horario preferido</span><br>
        <span style="font-size:15px;color:#2B2B2B;">${turno.horario === 'manana' ? 'Mañana' : 'Tarde'}</span>
      </td></tr>
    </table>

    <p style="margin:0;font-size:15px;color:#768B9A;line-height:1.6;">
      Gracias por confiar en nosotros.
    </p>
  `
  return emailBase(contenido)
}
```

### Template: aviso a la doctora
```ts
export function emailAvisoDoctora(turno: Turno): string {
  const contenido = `
    <p style="margin:0 0 16px;font-size:16px;color:#2B2B2B;">
      Nuevo turno recibido:
    </p>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#ECEBE8;border-radius:12px;padding:24px;margin-bottom:24px;">
      <tr><td style="padding:5px 0;">
        <span style="color:#768B9A;font-size:13px;">Paciente</span><br>
        <strong style="color:#2B2B2B;">${turno.nombre}</strong>
      </td></tr>
      <tr><td style="padding:5px 0;border-top:1px solid #C6C0B6;">
        <span style="color:#768B9A;font-size:13px;">Contacto</span><br>
        <span style="color:#2B2B2B;">${turno.email} · ${turno.telefono}</span>
      </td></tr>
      <tr><td style="padding:5px 0;border-top:1px solid #C6C0B6;">
        <span style="color:#768B9A;font-size:13px;">Consulta</span><br>
        <span style="color:#2B2B2B;">${turno.tipoConsulta} — ${formatFecha(turno.fechaPreferida)} (${turno.horario})</span>
      </td></tr>
      ${turno.mensaje ? `
      <tr><td style="padding:5px 0;border-top:1px solid #C6C0B6;">
        <span style="color:#768B9A;font-size:13px;">Mensaje</span><br>
        <span style="color:#2B2B2B;">${turno.mensaje}</span>
      </td></tr>` : ''}
    </table>
  `
  return emailBase(contenido)
}
```

## Helper de Fecha
```ts
export function formatFecha(fecha: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(fecha))
}
```

## Organización de Archivos
```
src/lib/
├── resend.ts          # cliente Resend
├── email-templates.ts # todos los templates y helpers
└── validations.ts
```
