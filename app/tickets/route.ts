import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
//import { auth } from "@/lib/auth";
import { auth } from "next-auth";


export async function GET() {
  const tickets = await prisma.ticket.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const ticket = await prisma.ticket.create({
    data: {
      ...body,
      ownerId: session.user.id,
    },
  });

  return NextResponse.json(ticket, { status: 201 });
}
