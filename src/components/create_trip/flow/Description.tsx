import React from "react";
import { Controller, Control } from "react-hook-form";
import { TripFormData } from "../validation";

interface DescriptionProps {
  control: Control<TripFormData>;
  errors: any;
}

const Description: React.FC<DescriptionProps> = ({ control, errors }) => {
  return (
    <div className="relative">
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        Describe your Dream Trip ?
      </h2>
      {errors.description && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {errors.description.message}
        </p>
      )}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            className="resize-none w-full h-[250px] p-6 outline-none placeholder:text-white/50 placeholder:italic text-white/75 text-xl bg-black/25 rounded-3xl"
            placeholder="How do you want your trip to be?"
            spellCheck={false}
          />
        )}
      />
    </div>
  );
};

export default Description;
