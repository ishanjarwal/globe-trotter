import FormProgression from "@/components/create_trip/FormProgression";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="py-24 relative min-h-screen">
      <Image
        alt="bg"
        fill
        className="absolute top-0 left-0 w-full h-full"
        src={"/create-bg.jpg"}
      />
      <h1 className="relative text-center text-balance text-foreground lg:text-8xl text-3xl font-bold">
        Create your Dream Trip
      </h1>
      <div className="py-8 flex justify-center items-center ">
        <div className="max-w-2xl">
          <FormProgression />
        </div>
      </div>
    </div>
  );
};

export default page;
