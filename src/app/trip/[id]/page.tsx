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
        console.log("Fetching:", url);
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

  if (loading) return <div className="p-10">Loading...</div>;
  if (!data) return null;

  return (
    <div className="parent flex w-full min-h-screen relative">
      <div className="left w-[50%] px-12 pt-14 overflow-hidden overflow-y-auto">
        <h1 className="text-7xl leading-20 text-foreground">{data.title}</h1>
        <h3 className="mt-8 text-xl text-muted-foreground">
          {data.description}
        </h3>

        <div className="image bg-orange-500 w-full mt-10 rounded-lg h-[40vh]">
          <img
            className="size-full object-cover rounded-lg"
            src="https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg"
            alt=""
          />
        </div>

        <div className="trip-details mt-10">
          <h1 className="text-2xl flex items-center text-foreground">
            <MapPin className="mr-2" size={25} />
            Trip Details
          </h1>
          <div className="flex gap-x-10 mt-5">
            <div className="w-1/2">
              <h1 className="mb-2 text-2xl">From</h1>
              <span className="text-xl text-muted-foreground">
                {format(new Date(data.startDate), "dd/MM/yy")}
              </span>
            </div>
            <div className="w-1/2">
              <h1 className="mb-2 text-2xl">To</h1>
              <span className="text-xl text-muted-foreground">
                {format(new Date(data.endDate), "dd/MM/yy")}
              </span>
            </div>
          </div>
          <div className="mt-7">
            <h1 className="text-2xl flex items-center">
              <IoIosPeople className="mr-2" size={25} />
              People Information
            </h1>
            <div className="flex gap-x-10 mt-3">
              <div>
                <h1 className="mb-2 text-2xl">Adults</h1>
                <span className="text-xl text-muted-foreground">
                  {data.totalAdults}
                </span>
              </div>
              <div>
                <h1 className="mb-2 text-2xl">Children</h1>
                <span className="text-xl text-muted-foreground">
                  {data.totalChildren}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="highlights mt-10">
          <h1 className="text-2xl flex items-center">
            <Key className="mr-3" /> Highlights
          </h1>
          <ul className="mt-5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="mt-2 text-xl text-muted-foreground">
                This
              </li>
            ))}
          </ul>
        </div>

        <div className="itenary mt-20">
          <h1 className="text-4xl">Day Based Itinerary</h1>
          {data.days.map((day: any, index: number) => (
            <div key={index} className="mt-10">
              <div className="py-5 mb-2 text-3xl shadow-xl rounded-tr-2xl rounded-br-2xl px-2">
                {day.name}
              </div>
              {day.itineraryItems.map((e: any, idx: number) => (
                <div
                  key={idx}
                  className="mt-10 bg-gray-300/60 py-4 px-3 rounded-2xl"
                >
                  <Link
                    className="text-blue-500 underline"
                    href={getGoogleMapsLink(e.latitude, e.longitude)}
                  >
                    Open on Maps
                  </Link>
                  <div className="title text-xl font-semibold mt-2">
                    {e.title}
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="w-1/2 text-lg">{e.description}</div>
                    <div className="h-32 w-2/6">
                      <img
                        className="size-full"
                        src={getGooglePlacePhotoUrl(e.image, 450)}
                        alt={e.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="right w-[50%] h-screen sticky top-0 right-0"></div>
    </div>
  );
}
