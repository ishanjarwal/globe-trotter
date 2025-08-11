// app/api/trip/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/config/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  try {
    const trip = await prisma.trip.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ id: trip.id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
