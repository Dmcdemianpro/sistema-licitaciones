import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "next-auth"; // Importa el helper oficial (NextAuth v5)

/** GET /api/tickets/[id] – devuelve un ticket por su id */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const ticket = await prisma.ticket.findUnique({ where: { id: Number(params.id) } });
  return ticket
    ? NextResponse.json(ticket)
    : new NextResponse("Not found", { status: 404 });
}

/** PUT /api/tickets/[id] – actualiza un ticket (requiere auth) */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const ticket = await prisma.ticket.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(ticket);
}

/** DELETE /api/tickets/[id] – elimina un ticket (requiere auth) */
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  await prisma.ticket.delete({ where: { id: Number(params.id) } });
  return new NextResponse(null, { status: 204 });
}
