import clsx from "clsx";
import React from "react";

const types = [
  {
    name: "Historic Monuments",
    icon: null,
  },
  {
    name: "Artistic Escape",
    icon: null,
  },
  {
    name: "Cultural Festivals",
    icon: null,
  },
  {
    name: "Nature Hikes",
    icon: null,
  },
  {
    name: "Beach Resorts",
    icon: null,
  },
  {
    name: "Adventure Sports",
    icon: null,
  },
  {
    name: "Wildlife Safaris",
    icon: null,
  },
  {
    name: "Culinary Tours",
    icon: null,
  },
  {
    name: "City Tours",
    icon: null,
  },
  {
    name: "Mountain Climbing",
    icon: null,
  },
  {
    name: "Museums & Galleries",
    icon: null,
  },
  {
    name: "Botanical Gardens",
    icon: null,
  },
  {
    name: "Aquatic Exploration",
    icon: null,
  },
  {
    name: "Wine & Vineyard Tours",
    icon: null,
  },
  {
    name: "Photography Spots",
    icon: null,
  },
  {
    name: "Shopping Spree",
    icon: null,
  },
  {
    name: "Desert Expeditions",
    icon: null,
  },
  {
    name: "Spa & Wellness",
    icon: null,
  },
  {
    name: "Nightlife & Entertainment",
    icon: null,
  },
  {
    name: "Historical Reenactments",
    icon: null,
  },
];

const Activities = ({ data, setData }) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        What do you wanna explore ?
      </h2>
      <div className="flex justify-center gap-2 flex-wrap">
        {types.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (data.activities.includes(item.name)) {
                const deletableIdx = data.activities.indexOf(item.name);
                const newArr = data.activities.toSpliced(deletableIdx, 1);
                setData((prev) => ({ ...prev, activities: newArr }));
              } else {
                setData((prev) => ({
                  ...prev,
                  activities: [...prev.activities, item.name],
                }));
              }
            }}
            className={clsx(
              { "bg-white text-black": data.activities.includes(item.name) },
              {
                "bg-white/25 text-white": !data.activities.includes(item.name),
              },
              "w-max py-2 px-4 flex items-center justify-center  font-bold rounded-lg hover:bg-white hover:text-black duration-150"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Activities;
