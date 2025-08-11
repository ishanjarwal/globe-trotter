"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Description = ({ data, setData, validationError }) => {
  return (
    <div className="relative">
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        Describe your Dream Trip ?
      </h2>
      {validationError && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {validationError}
        </p>
      )}
      {/* <MagicCard gradientSize={300} className="rounded-lg bg-transparent"> */}
      <div className="relative w-full h-[250px] overflow-hidden rounded-3xl bg-transparent">
        <BorderBeam borderWidth={3} colorFrom="purple" colorTo="hotpink" />
        <textarea
          value={data.description}
          onChange={(e) => {
            setData((prev) => ({ ...prev, description: e.target.value }));
          }}
          className="resize-none w-full h-full p-6 outline-none  placeholder:text-white/50 placeholder:italic text-white/75 text-xl bg-black/25"
          placeholder="How do want your trip to be ?"
          spellCheck={false}
        />
      </div>
      {/* </MagicCard> */}
    </div>
  );
};

export default Description;
