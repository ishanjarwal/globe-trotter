// app/api/trip/generate/route.ts
import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { TripSchema } from "@/components/create_trip/validation";
import axios from "axios";
import { OpenAI } from "openai";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
  // Get Clerk userId (a string like "user_xxx")
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    // Parse dates from strings to Date objects
    body.dates = body.dates.map((d: string) => new Date(d));

    // Validate request body
    const parsed = TripSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { isVague: true, errors: parsed.error },
        { status: 400 }
      );
    }

    const { description, dates, activities, budget, adults, children } =
      parsed.data;

    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[1]);
    const totalDays =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Extract main place name from description
    const placeResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Extract the main travel destination (city or place name) from this description: "${description}". Respond with only the place name.`,
        },
      ],
      temperature: 0,
    });
    const rawPlace = placeResponse.choices?.[0]?.message?.content;
    const place = typeof rawPlace === "string" ? rawPlace.trim() : "";
    console.log("Extracted place:", place);

    // Prompt to generate detailed trip plan JSON
    const prompt = `
You are a travel planner.
Generate a trip plan in the following strict JSON schema:
{
  "title": string,
  "description": string,
  "highlights": array of strings,
  "days": [
    {
      "name": string,
      "itineraryItems": [
        {
          "day": number,
          "title": string,
          "latitude": float number,
          "longitude": float number,
          "description": string,
          "expense": number
        }
      ]
    }
  ]
}
Rules:
- Use ${totalDays} days starting ${startDate.toDateString()} and ending ${endDate.toDateString()}.
- Budget: ${budget.value}
- Adults: ${adults}, Children: ${children}
- Activities: ${activities.join(", ")}
- If description is too vague, unrelated, or inappropriate, respond ONLY with: {"isVague": true}.
- Do not include extra fields.
Description: ${description}
`;

    const tripResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const text = tripResponse.choices[0].message?.content || "";

    let jsonResponse: {
      title: string;
      description: string;
      highlights: string[];
      days: Array<{
        name: string;
        itineraryItems: Array<{
          day: number;
          title: string;
          latitude: number;
          longitude: number;
          description: string;
          expense: number;
          image?: string | null;
        }>;
      }>;
      isVague?: boolean;
    };

    try {
      jsonResponse = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { isVague: true, error: "Invalid JSON from model" },
        { status: 500 }
      );
    }

    if (jsonResponse?.isVague) {
      return NextResponse.json({ isVague: true }, { status: 200 });
    }

    // Fetch a main image for the trip from Google Places API
    let tripImage: string | null = null;
    try {
      const {
        data: { results },
      } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          place
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const placeId = results?.[0]?.place_id;
      if (placeId) {
        const {
          data: { result },
        } = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        tripImage = result?.photos?.[0]?.photo_reference || null;
      }
    } catch (err) {
      console.error("Error fetching trip image:", err);
    }

    // Fetch images for itinerary items similarly
    for (const day of jsonResponse.days) {
      for (const item of day.itineraryItems) {
        try {
          const query = `${item.title} ${place}`;
          const {
            data: { results },
          } = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
              query
            )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
          );
          const photoRef = results?.[0]?.photos?.[0]?.photo_reference || null;
          item.image = photoRef;
        } catch (err) {
          console.error(`Error fetching image for item "${item.title}":`, err);
          item.image = null;
        }
      }
    }

    console.log(JSON.stringify(jsonResponse, null, 2));

    // Create Trip with nested Days and ItineraryItems using Clerk userId string
    const newTrip = await prisma.trip.create({
      data: {
        userId, // Clerk user ID string (not ObjectId)
        title: jsonResponse.title,
        description: jsonResponse.description,
        highlights: jsonResponse.highlights,
        startDate,
        endDate,
        budget: budget.value,
        totalAdults: adults,
        totalChildren: children,
        image: tripImage,
        days: {
          create: jsonResponse.days.map((day) => ({
            name: day.name,
            itineraryItems: {
              create: day.itineraryItems.map((item) => ({
                dayNumber: item.day,
                title: item.title,
                latitude: item.latitude,
                longitude: item.longitude,
                description: item.description,
                expense: item.expense,
                image: item.image,
              })),
            },
          })),
        },
      },
      select: { id: true },
    });

    console.log("Trip saved:", newTrip.id);

    return NextResponse.json({ id: newTrip.id }, { status: 200 });
  } catch (err) {
    console.error("Error generating trip:", err);
    return NextResponse.json(
      { message: "Something went wrong", error: String(err) },
      { status: 500 }
    );
  }
};
