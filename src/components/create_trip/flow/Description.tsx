"use client";

import React, { useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { TripFormData } from "../validation";
import { Mic, X } from "lucide-react";
import SurpriseMeButton from "@/components/SurpriseButton";

interface DescriptionProps {
  control: Control<TripFormData>;
  setValue: (name: keyof TripFormData, value: any) => void;
  errors: any;
}

const Description: React.FC<DescriptionProps> = ({
  control,
  errors,
  setValue,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Sync transcript with form value
  useEffect(() => {
    if (transcript.trim()) {
      setValue("description", transcript);
    }
  }, [transcript, control]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-red-500 text-center">
        Your browser does not support speech recognition.
      </p>
    );
  }

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
  };

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
          <div className="relative">
            <button
              type="button"
              onClick={toggleListening}
              className={`mb-4 ms-2 px-6 py-2 rounded-full font-semibold cursor-pointer absolute bottom-0 left-0 active:scale-90 duration-100  ${
                listening ? "bg-white text-black" : "bg-primary text-white "
              }`}
            >
              {listening ? <X /> : <Mic />}
            </button>
            <div className="absolute ms-22 bottom-0 mb-4">
              <SurpriseMeButton />
            </div>
            <textarea
              {...field}
              className="resize-none w-full h-[250px] p-6 outline-none placeholder:text-white/50 placeholder:italic text-white/75 text-xl bg-black/25 rounded-3xl"
              placeholder="How do you want your trip to be?"
              spellCheck={false}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Description;
