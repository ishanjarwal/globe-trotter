"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getGooglePlacePhotoUrl } from "@/lib/utils";

export default function UserTripsPage() {
  const [trips, setTrips] = useState<
    { id: string; title: string; description: string; image: string | null }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get("/api/user/trips", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setTrips(res.data);
        }
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen p-10 text-white">
        Loading trips...
      </div>
    );

  if (trips.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen p-10 text-white">
        No trips found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24 bg-[#121212] min-h-screen text-white">
      <h1 className="text-6xl font-bold mb-8 text-accent">My Trips</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/trip/${trip.id}`}
            className="block rounded-lg overflow-hidden shadow-lg bg-[#1a1a1a] hover:bg-[#222222] transition-colors duration-200"
          >
            <div className="h-48 w-full relative bg-gray-700">
              {trip.image ? (
                <img
                  src={getGooglePlacePhotoUrl(trip.image)}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-primary">
                {trip.title}
              </h2>
              <p className="mt-2 text-gray-400 line-clamp-3">
                {trip.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
