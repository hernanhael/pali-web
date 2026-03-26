import { NextResponse } from "next/server";
import { turnoSchema } from "@/lib/turno-schema";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendNotificationEmail } from "@/lib/resend";

// Rate limiting en memoria — suficiente para un sitio de bajo tráfico.
// En producción con múltiples instancias, reemplazar con Redis/Upstash.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;       // requests máximos
const RATE_LIMIT_WINDOW = 60_000; // ventana de 1 minuto (ms)

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

export async function POST(request: Request) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Demasiadas solicitudes. Por favor, esperá unos minutos." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const data = turnoSchema.parse(body);

    // Validar que la fecha preferida sea hoy o en el futuro
    const fechaElegida = new Date(data.fechaPreferida);
    fechaElegida.setHours(0, 0, 0, 0);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaElegida < hoy) {
      return NextResponse.json(
        { ok: false, message: "La fecha preferida debe ser hoy o una fecha futura." },
        { status: 422 }
      );
    }

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
      { ok: false, message: "Error al procesar la solicitud. Por favor, intentá de nuevo." },
      { status: 400 }
    );
  }
}
