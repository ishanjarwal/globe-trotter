import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const trips = await prisma.trip.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(trips, { status: 200 });
  } catch (err) {
    console.error("Error fetching user trips:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
