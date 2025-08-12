import React from "react";
import { Control, Controller } from "react-hook-form";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { TripFormData } from "../validation";

interface NumberOfPeopleProps {
  control: Control<TripFormData>;
  errors: any;
}

const NumberOfPeople = ({ control, errors }: NumberOfPeopleProps) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        How many people are travelling?
      </h2>

      {errors.adults && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {errors.adults.message}
        </p>
      )}

      {errors.children && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {errors.children.message}
        </p>
      )}

      <div className="flex justify-center items-center gap-x-16">
        {/* Adults */}
        <div className="rounded-xl p-4 bg-black/50 backdrop-blue-sm">
          <h3 className="text-xl text-center text-white font-bold">Adults</h3>
          <Controller
            control={control}
            name="adults"
            render={({ field }) => (
              <div className="flex justify-center items-center gap-x-8">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (field.value > 1) {
                      field.onChange(field.value - 1);
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white hover:bg-white hover:text-black duration-150"
                >
                  <IoMdRemove className="text-xl" />
                </button>

                <span className="text-2xl font-bold text-white">
                  {field.value}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (field.value < 15) {
                      field.onChange(field.value + 1);
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white hover:bg-white hover:text-black duration-150"
                >
                  <IoMdAdd className="text-xl" />
                </button>
              </div>
            )}
          />
        </div>

        {/* Children */}
        <div className="rounded-xl p-4 bg-black/50 backdrop-blue-sm">
          <h3 className="text-xl text-center text-white font-bold">Children</h3>
          <Controller
            control={control}
            name="children"
            render={({ field }) => (
              <div className="flex justify-center items-center gap-x-8">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (field.value > 0) {
                      field.onChange(field.value - 1);
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white hover:bg-white hover:text-black duration-150"
                >
                  <IoMdRemove className="text-xl" />
                </button>

                <span className="text-2xl font-bold text-white">
                  {field.value}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (field.value < 15) {
                      field.onChange(field.value + 1);
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white hover:bg-white hover:text-black duration-150"
                >
                  <IoMdAdd className="text-xl" />
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberOfPeople;
