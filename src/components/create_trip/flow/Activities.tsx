import React from "react";
import clsx from "clsx";
import { Controller, Control } from "react-hook-form";
import { TripFormData } from "../validation";

const types = [
  "Historic Monuments",
  "Artistic Escape",
  "Cultural Festivals",
  "Nature Hikes",
  "Beach Resorts",
  "Adventure Sports",
  "Wildlife Safaris",
  "Culinary Tours",
  "City Tours",
  "Mountain Climbing",
  "Museums & Galleries",
  "Botanical Gardens",
  "Aquatic Exploration",
  "Wine & Vineyard Tours",
  "Photography Spots",
  "Shopping Spree",
  "Desert Expeditions",
  "Spa & Wellness",
  "Nightlife & Entertainment",
  "Historical Reenactments",
];

interface ActivitiesProps {
  control: Control<TripFormData>;
  errors: any;
}

const Activities: React.FC<ActivitiesProps> = ({ control, errors }) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        What do you wanna explore ?
      </h2>
      {errors.activities && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {errors.activities.message}
        </p>
      )}
      <Controller
        name="activities"
        control={control}
        render={({ field }) => {
          const selected = field.value || [];
          const toggleActivity = (activity: string) => {
            if (selected.includes(activity)) {
              field.onChange(selected.filter((a: string) => a !== activity));
            } else {
              field.onChange([...selected, activity]);
            }
          };

          return (
            <div className="flex justify-center gap-2 flex-wrap">
              {types.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleActivity(item)}
                  className={clsx(
                    selected.includes(item)
                      ? "bg-white text-black"
                      : "bg-white/25 text-white",
                    "w-max py-2 px-4 flex items-center justify-center font-bold rounded-lg hover:bg-white hover:text-black duration-150"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Activities;
