import { NextResponse } from "next/server";
import { turnoSchema } from "@/lib/turno-schema";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = turnoSchema.parse(body);

    // Guardar en DB
    const turno = await prisma.turno.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        tipoConsulta: data.tipoConsulta,
        fechaPreferida: new Date(data.fechaPreferida),
        horario: data.horario,
        mensaje: data.mensaje ?? null,
      },
    });

    // Enviar emails en paralelo (silencioso si fallan — no bloquea la respuesta)
    await Promise.allSettled([
      sendConfirmationEmail(data),
      sendNotificationEmail(data),
    ]);

    return NextResponse.json(
      { ok: true, id: turno.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al procesar turno:", error);
    return NextResponse.json(
      { ok: false, message: "Error al procesar la solicitud" },
      { status: 400 }
    );
  }
}
