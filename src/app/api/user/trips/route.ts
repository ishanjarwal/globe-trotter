// app/api/trip/list/route.ts
import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        days: {
          include: {
            itineraryItems: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(trips, { status: 200 });
  } catch (error) {
    console.error("Error fetching user trips:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
