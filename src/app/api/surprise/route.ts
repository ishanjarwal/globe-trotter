// app/api/trip/generate/surprise/route.ts
import { NextResponse } from "next/server";
import prisma from "@/config/prisma";
import { TripSchema } from "@/components/create_trip/validation";
import axios from "axios";
import { OpenAI } from "openai";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: Request) => {
  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized Access" },
      { status: 401 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Step 1: Ask LLM to suggest a single popular travel destination (city or place name)
    // suitable for a 5-day, moderate budget trip for 1 adult with best activities.
    const destResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
You are a travel expert.
Please suggest ONE popular travel destination around the world that would be great for a 5-day trip,
for a single adult traveler with a moderate budget (~$1500),
including sightseeing, local food, museums, nature, and cultural events.
Respond with only the name of the destination (city or place name).
          `.trim(),
        },
      ],
      temperature: 0.7,
    });

    const rawDestination = destResponse.choices?.[0]?.message?.content ?? "";
    const destination = rawDestination.trim();

    // Step 2: Define the trip request body dynamically
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 4); // 5 days total

    const tripRequestBody = {
      description: `A trip to ${destination}, full of the best activities and experiences.`,
      dates: [startDate.toISOString(), endDate.toISOString()],
      activities: [
        "sightseeing",
        "local food",
        "museums",
        "nature",
        "cultural events",
      ],
      budget: { name: "moderate", value: "$1500" },
      adults: 1,
      children: 0,
    };

    // Step 3: Validate input with TripSchema

    const { description, dates, activities, budget, adults, children } =
      tripRequestBody;

    const totalDays = 5;
    const startDateObj = new Date(dates[0]);
    const endDateObj = new Date(dates[1]);

    // Step 4: Extract place (destination) from description (extra safety)
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
    const rawPlace = placeResponse.choices?.[0]?.message?.content ?? "";
    const place = rawPlace.trim();

    // Step 5: Generate detailed trip plan JSON prompt
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
- Use ${totalDays} days starting ${startDateObj.toDateString()} and ending ${endDateObj.toDateString()}.
- Budget: ${budget.value}
- Adults: ${adults}, Children: ${children}
- Activities: ${activities.join(", ")}
- If description is too vague, unrelated, or inappropriate, respond ONLY with: {"isVague": true}.
- Do not include extra fields.
Description: ${description}
`.trim();

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

    // Step 6: Fetch main trip image from Google Places API
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

    // Step 7: Fetch images for itinerary items
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

    // Step 8: Save trip in DB
    const newTrip = await prisma.trip.create({
      data: {
        userId,
        title: jsonResponse.title,
        description: jsonResponse.description,
        highlights: jsonResponse.highlights,
        startDate: startDateObj,
        endDate: endDateObj,
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

    return NextResponse.json({ id: newTrip.id }, { status: 200 });
  } catch (err) {
    console.error("Error generating surprise trip:", err);
    return NextResponse.json(
      { message: "Something went wrong", error: String(err) },
      { status: 500 }
    );
  }
};
