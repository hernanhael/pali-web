import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuthorized(request: Request): boolean {
  const auth = request.headers.get("authorization");
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");

  const turnos = await prisma.turno.findMany({
    where: estado ? { estado } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ turnos });
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { id, estado } = await request.json();

  if (!["pendiente", "confirmado", "cancelado"].includes(estado)) {
    return NextResponse.json({ message: "Estado inválido" }, { status: 400 });
  }

  const turno = await prisma.turno.update({
    where: { id },
    data: { estado },
  });

  return NextResponse.json({ turno });
}
