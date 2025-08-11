"use client";
import React, { useEffect, useState } from "react";
import { Ripple } from "@/components/magicui/ripple";
import { motion } from "framer-motion";

const texts = [
  "Generating Trip",
  "Creating Itinerary",
  "Finding the best Hotels",
  "Finding the best Cuisines",
  "Finding best flight options",
  "Setting Up",
];

const Loader = () => {
  const [textIdx, setTextIdx] = useState(0);
  useEffect(() => {
    const textId = setInterval(() => {
      if (textIdx < texts.length) {
        setTextIdx((prev) => prev + 1);
      }
    }, 5000);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-[100]">
      <p className="text-center max-w-lg text-6xl font-bold  leading-snug text-pink-600">
        <motion.span
          className="block"
          key={textIdx}
          initial={{ y: "100px", opacity: 0 }}
          animate={{ y: "0px", opacity: 1 }}
        >
          {texts[textIdx]}
        </motion.span>
        <span className="flex mx-auto mt-4 justify-center gap-x-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <motion.span
              key={idx}
              animate={{ y: ["0px", "25px", "0px"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: idx * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-purple-500"
            />
          ))}
        </span>
      </p>
      <Ripple mainCircleSize={500} />
    </div>
  );
};

export default Loader;
