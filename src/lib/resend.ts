import { Resend } from "resend";
import type { TurnoFormData } from "./turno-schema";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendConfirmationEmail(data: TurnoFormData) {
  const resend = getResend();
  if (!resend) return; // No configurado aún

  const fecha = new Date(data.fechaPreferida).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "turnos@dra-cajal.com",
    to: data.email,
    subject: "Solicitud de turno recibida — Dra. Paula Cajal",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2B2B2B;">
        <div style="border-bottom: 1px solid #C8A96E; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="font-size: 24px; margin: 0;">Dra. María Paula Cajal</h1>
          <p style="font-size: 12px; color: #768B9A; margin: 4px 0 0;">Odontología · Buenos Aires</p>
        </div>

        <p style="font-size: 16px;">Hola <strong>${data.nombre.split(" ")[0]}</strong>,</p>
        <p style="font-size: 15px; color: #4A5568; line-height: 1.6;">
          Recibimos tu solicitud de turno. Nos pondremos en contacto dentro de las
          <strong>24 horas hábiles</strong> para confirmarte la cita.
        </p>

        <div style="background: #F5F4F1; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <table style="width: 100%; font-size: 14px;">
            <tr><td style="color: #768B9A; padding: 4px 0;">Consulta</td><td><strong>${data.tipoConsulta}</strong></td></tr>
            <tr><td style="color: #768B9A; padding: 4px 0;">Fecha preferida</td><td><strong>${fecha}</strong></td></tr>
            <tr><td style="color: #768B9A; padding: 4px 0;">Horario</td><td><strong>${data.horario} hs</strong></td></tr>
          </table>
        </div>

        <p style="font-size: 14px; color: #4A5568;">
          Si tenés alguna consulta urgente, podés escribirnos por WhatsApp o responder a este email.
        </p>

        <div style="border-top: 1px solid #C6C0B6; margin-top: 32px; padding-top: 16px;">
          <p style="font-size: 12px; color: #768B9A; margin: 0;">
            Dra. María Paula Cajal · Odontóloga · Buenos Aires, Argentina
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendNotificationEmail(data: TurnoFormData) {
  const resend = getResend();
  if (!resend) return;

  const fecha = new Date(data.fechaPreferida).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "turnos@dra-cajal.com",
    to: process.env.EMAIL_DOCTORA ?? "mariapaulacajal@gmail.com",
    subject: `Nuevo turno: ${data.nombre} — ${data.tipoConsulta}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #2B2B2B;">
        <h2 style="color: #C8A96E;">Nueva solicitud de turno</h2>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #768B9A;">Nombre</td><td style="padding: 8px;"><strong>${data.nombre}</strong></td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #768B9A;">Email</td><td style="padding: 8px;">${data.email}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #768B9A;">Teléfono</td><td style="padding: 8px;">${data.telefono}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #768B9A;">Tipo de consulta</td><td style="padding: 8px;">${data.tipoConsulta}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #768B9A;">Fecha preferida</td><td style="padding: 8px;">${fecha}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; color: #768B9A;">Horario</td><td style="padding: 8px;">${data.horario} hs</td></tr>
          ${data.mensaje ? `<tr><td style="padding: 8px; color: #768B9A;">Mensaje</td><td style="padding: 8px;">${data.mensaje}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}
