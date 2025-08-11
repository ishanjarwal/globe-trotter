import { useRouter } from "next/navigation";
import React from "react";
import { BsStars } from "react-icons/bs";

const Generate = ({ data, createTrip, setLoading }) => {
  const router = useRouter();
  return (
    <div className="mt-8 p-16 relative">
      <button
        onClick={() => {
          createTrip(data, setLoading);
        }}
        className="w-full flex justify-center items-center gap-x-4 rounded-3xl bg-gradient-to-t from-primary to-blue-600 py-8 px-6 text-white shadow-glowBtn hover:shadow-HighGlowBtn hover:scale-105 duration-150"
      >
        <span className="text-4xl">
          <BsStars />
        </span>
        <span className="text-2xl uppercase">Generate Trip</span>
      </button>
    </div>
  );
};

export default Generate;
