"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Key, MapPin } from "lucide-react";
import { IoIosPeople } from "react-icons/io";
import { format } from "date-fns";
import { getGoogleMapsLink, getGooglePlacePhotoUrl } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function TripPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/${id}`;
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
          setData(res.data);
        } else {
          router.push("/error");
        }
      } catch (err) {
        console.error("Error fetching trip:", err);
        router.push("/error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  if (loading)
    return (
      <div className="p-10 bg-[#121212] text-[#bbbbbb] min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!data) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] px-6 py-10 text-[#e5e5e5]">
      <div className="max-w-5xl w-full bg-[#1a1a1a] rounded-2xl shadow-lg p-8 overflow-y-auto border border-[#2a2a2a]">
        <h1 className="text-5xl font-bold text-center text-primary">
          {data.title}
        </h1>
        <h3 className="mt-4 text-lg text-center text-[#aaaaaa]">
          {data.description}
        </h3>

        <div className="mt-8 rounded-lg overflow-hidden border border-[#2b2b2b]">
          {data.image && (
            <img
              className="w-full h-80 object-cover"
              src={getGooglePlacePhotoUrl(data.image)}
              alt=""
            />
          )}
        </div>

        {/* Trip Details */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold flex items-center text-[#f0f0f0]">
            <MapPin className="mr-2" size={25} /> Trip Details
          </h2>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="bg-[#1f1f1f] p-4 rounded-lg border border-[#2b2b2b]">
              <h3 className="text-xl font-medium">From</h3>
              <p className="text-[#aaaaaa]">
                {format(new Date(data.startDate), "dd/MM/yy")}
              </p>
            </div>
            <div className="bg-[#1f1f1f] p-4 rounded-lg border border-[#2b2b2b]">
              <h3 className="text-xl font-medium">To</h3>
              <p className="text-[#aaaaaa]">
                {format(new Date(data.endDate), "dd/MM/yy")}
              </p>
            </div>
          </div>
        </section>

        {/* People Info */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold flex items-center text-[#f0f0f0]">
            <IoIosPeople className="mr-2" size={25} /> People Information
          </h2>
          <div className="grid grid-cols-2 gap-6 mt-3">
            <div className="bg-[#1f1f1f] p-4 rounded-lg border border-[#2b2b2b]">
              <h3 className="text-xl font-medium">Adults</h3>
              <p className="text-[#aaaaaa]">{data.totalAdults}</p>
            </div>
            <div className="bg-[#1f1f1f] p-4 rounded-lg border border-[#2b2b2b]">
              <h3 className="text-xl font-medium">Children</h3>
              <p className="text-[#aaaaaa]">{data.totalChildren}</p>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold flex items-center text-[#f0f0f0]">
            <Key className="mr-3" /> Highlights
          </h2>
          <ul className="mt-4 list-disc pl-6 text-[#aaaaaa]">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="mt-2">
                This
              </li>
            ))}
          </ul>
        </section>

        {/* Itinerary */}
        <section className="mt-10">
          <h2 className="text-3xl font-bold text-[#f0f0f0]">
            Day Based Itinerary
          </h2>
          {data.days.map((day: any, index: number) => (
            <div key={index} className="mt-6">
              <h3 className="py-3 mb-2 text-2xl font-semibold bg-[#1f1f1f] rounded-lg px-4 border border-[#2b2b2b]">
                {day.name}
              </h3>
              {day.itineraryItems.map((e: any, idx: number) => (
                <div
                  key={idx}
                  className="mt-4 bg-[#2a2a2a] p-4 rounded-xl border border-[#3a3a3a]"
                >
                  <Link
                    className="text-primary/75"
                    href={getGoogleMapsLink(e.latitude, e.longitude)}
                  >
                    Open on Maps
                  </Link>
                  <h4 className="mt-2 text-xl font-semibold text-[#f5f5f5]">
                    {e.title}
                  </h4>
                  <div className="flex gap-4 mt-3">
                    <p className="flex-1 text-[#cccccc]">{e.description}</p>
                    {e.image && (
                      <img
                        className="h-28 w-40 object-cover rounded-md"
                        src={getGooglePlacePhotoUrl(e.image, 450)}
                        alt={e.title}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
