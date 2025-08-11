import axios from "axios";
import { Key, MapPin } from "lucide-react";
import { IoIosPeople } from "react-icons/io";
import { format } from "date-fns/format";
import { getGoogleMapsLink, getGooglePlacePhotoUrl } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const data = [
  {
    day: 1,
    locations: [
      {
        time: "09:00 AM",
        title: "Eiffel Tower",
        description:
          "Start your trip with Paris' most iconic landmark. Enjoy panoramic views of the city from the top.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Seine River Cruise",
        description:
          "Relax with a scenic boat cruise along the Seine River, passing by historical monuments.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "04:00 PM",
        title: "Champs-Élysées",
        description:
          "Stroll along one of the most famous avenues in the world, lined with shops, cafés, and theaters.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
  {
    day: 2,
    locations: [
      {
        time: "09:00 AM",
        title: "Louvre Museum",
        description:
          "Explore the world's largest art museum and home to masterpieces like the Mona Lisa.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Tuileries Garden",
        description:
          "Relax in this beautiful public garden located between the Louvre and Place de la Concorde.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "04:00 PM",
        title: "Montmartre",
        description:
          "Discover the charming bohemian district known for the Sacré-Cœur Basilica and artistic vibe.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
  {
    day: 3,
    locations: [
      {
        time: "09:00 AM",
        title: "Musée d’Orsay",
        description:
          "Admire impressionist and post-impressionist masterpieces in this former railway station.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Latin Quarter",
        description:
          "Wander through lively streets filled with bookstores, cafés, and historical landmarks.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "04:00 PM",
        title: "Luxembourg Gardens",
        description:
          "Enjoy a peaceful walk in these lush gardens, home to fountains, statues, and the French Senate.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
  {
    day: 4,
    locations: [
      {
        time: "09:00 AM",
        title: "Versailles Palace",
        description:
          "Take a day trip to explore the lavish palace, its gardens, and the Hall of Mirrors.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Versailles Gardens",
        description:
          "Stroll through the vast landscaped gardens, fountains, and sculptures.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "04:00 PM",
        title: "Petit Trianon",
        description:
          "Visit Marie Antoinette's private retreat within the Versailles estate.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
  {
    day: 5,
    locations: [
      {
        time: "09:00 AM",
        title: "Notre-Dame Cathedral",
        description:
          "Admire the stunning Gothic architecture of this famous cathedral.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Sainte-Chapelle",
        description:
          "Marvel at the breathtaking stained glass windows in this Gothic chapel.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "04:00 PM",
        title: "Le Marais",
        description:
          "Explore the historic Jewish quarter with trendy shops, museums, and cafés.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
  {
    day: 6,
    locations: [
      {
        time: "09:00 AM",
        title: "Rodin Museum",
        description:
          "Admire works by Auguste Rodin in a beautiful mansion and sculpture garden.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Champ de Mars",
        description:
          "Relax in the park offering perfect views of the Eiffel Tower.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "07:00 PM",
        title: "Moulin Rouge",
        description:
          "End the day with a dazzling cabaret performance at the famous Moulin Rouge.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
  {
    day: 7,
    locations: [
      {
        time: "09:00 AM",
        title: "Père Lachaise Cemetery",
        description:
          "Visit the resting place of famous figures like Jim Morrison and Oscar Wilde.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "01:00 PM",
        title: "Galeries Lafayette",
        description:
          "Shop at the grand department store with its beautiful glass dome.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        time: "06:00 PM",
        title: "Seine Sunset",
        description:
          "End your trip watching a beautiful sunset along the Seine River.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
    ],
  },
];

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trip/${id}`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );
  console.log(res);
  if (!res.ok) {
    return redirect("/error");
  }

  const data = await res.json();

  return (
    <div className="parent flex w-full min-h-screen relative">
      <div className="left w-[50%]  px-12 pt-14 overflow-hidden overflow-y-auto">
        <h1 className="text-7xl   max-w-3/4 sticky leading-20 text-foreground">
          {data.title}
        </h1>
        <h3 className="mt-8 text-xl max-w-4/5 text-muted-foreground">
          {data.description}
        </h3>
        <div className="image bg-orange-500 w-full mt-10 rounded-lg h-[40vh] aspect-video">
          <img
            className="size-full object-cover aspect-video rounded-lg"
            src="https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg"
            alt=""
          />
        </div>
        <div className="trip-details">
          <h1 className="text-2xl mt-10 flex items-center text-foreground">
            <span className="mr-2">
              <MapPin size={"25px"}></MapPin>
            </span>
            Trip Details
          </h1>
          <div className="detail flex w-full h-fit items-center gap-x-10  mt-5">
            <div className="date flex justify-between w-1/2">
              <div className="from">
                <h1 className="mb-2 text-2xl text-foreground">From</h1>
                <span className="text-xl text-muted-foreground">
                  {" "}
                  {format(data.startDate, "ddmmyy")}
                </span>
              </div>
              <div className="to">
                <h1 className="mb-2 text-2xl text-foreground">To</h1>
                <span className="text-xl text-muted-foreground">
                  {" "}
                  {format(data.endDate, "ddmmyy")}
                </span>
              </div>
            </div>
            <div className="budget  w-1/2">
              <h1 className="text-2xl mb-2 text-foreground">Est Price</h1>
              <h2 className="text-xl text-muted-foreground">{data.budget}</h2>
            </div>
          </div>
          <div className="wrap mt-7">
            <h1 className="text-2xl flex items-center">
              <span className="mr-2">
                <IoIosPeople size={"25px"}></IoIosPeople>
              </span>
              People Information
            </h1>
            <div className="detail flex w-full h-fit items-center gap-x-10  mt-3">
              <div className="date flex  justify-between w-1/2">
                <div className="from">
                  <h1 className="mb-2 text-2xl text-foreground">Adult</h1>
                  <span className="text-xl text-muted-foreground">
                    {data.totalAdults}
                  </span>
                </div>
              </div>
              <div className="budget w-1/2">
                <h1 className="text-2xl mb-2 text-foreground">Children</h1>
                <h2 className="text-xl text-muted-foreground">
                  {data.totalChildren}
                </h2>
              </div>
            </div>
          </div>
          <div className="highlights mt-10">
            <h1 className="text-2xl flex items-center">
              <span className="mr-3">
                <Key></Key>
              </span>
              <h1 className="text-foreground">Highlishts</h1>
            </h1>
            <ul className="wrappper mt-5">
              {Array.from({ length: 5 }).map((_, id) => (
                <li key={id} className="mt-2 text-xl text-muted-foreground">
                  This
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="itenary bg  w-full mt-20">
          <h1 className="text-4xl">Day Based Itenary</h1>
          <div className="wrapper w-full bg">
            {data.days.map((day: any, index: number) => (
              <div className="date bg mt-10">
                <div className="title w-full py-5  mb-2 text-3xl shadow-xl rounded-tr-2xl rounded-br-2xl px-2">
                  {day.name}
                </div>
                {day.itineraryItems.map((e: any, id: number) => (
                  <div className="locations mt-10 bg-gray-300/60 py-4 px-3 rounded-2xl">
                    <div className="time font-semibold">
                      <Link
                        className="text-blue-500 underline"
                        href={getGoogleMapsLink(e.latitude, e.longitude)}
                      >
                        Open on Maps
                      </Link>
                    </div>
                    <div className="title text-xl font-semibold mt-2">
                      {e.title}
                    </div>
                    <div className="desc-img flex w-full bg justify-between">
                      <div className="desc w-1/2 text-lg mt-3 flex items-center">
                        {e.description}
                      </div>
                      <div className="image h-32 w-2/6">
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
      </div>
      <div className="right w-[50%] h-screen sticky top-0 right-0"></div>
    </div>
  );
};

export default page;
