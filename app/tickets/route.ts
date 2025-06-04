import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({ 
      orderBy: { createdAt: "desc" } 
    });
    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Error al obtener tickets" }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" }, 
        { status: 401 }
      );
    }

    const body = await req.json();
    
    const ticket = await prisma.ticket.create({
      data: {
        ...body,
        ownerId: session.user.id,
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Error al crear ticket" }, 
      { status: 500 }
    );
  }
}