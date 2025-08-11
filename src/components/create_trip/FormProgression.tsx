"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import Budget from "./flow/Budget";
import NumberOfPeople from "./flow/NumberOfPeople";
import Generate from "./flow/Generate";
import Activities from "./flow/Activities";
import { motion } from "framer-motion";
import DatePicker from "./flow/DatePicker";
import Description from "./flow/Description";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../loader/Loader";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripSchema, TripFormData } from "./validation";

interface FlowStep {
  element: React.ComponentType<any>;
  button: string;
}

// Map your components and pass needed props
const flow: FlowStep[] = [
  { element: Description, button: "Next" },
  { element: DatePicker, button: "Next" },
  { element: Activities, button: "Next" },
  { element: Budget, button: "Next" },
  { element: NumberOfPeople, button: "Next" },
  { element: Generate, button: "Generate" },
];

const FormProgression: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTabs, setActiveTabs] = useState<number>(1);
  const [deactiveTabs, setDeactiveTabs] = useState<number>(flow.length - 1);
  const sliderRef = useRef<SwiperType | null>(null);

  // React Hook Form with Zod
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<TripFormData>({
    resolver: zodResolver(TripSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
      dates: undefined,
      activities: [],
      budget: { name: "", value: "" },
      adults: 1,
      children: 0,
    },
  });

  // On final submit
  const createTrip = async (formData: TripFormData) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/create", formData);
      if (response.status === 200) {
        const { id } = response.data;
        router.push(`/trip/${id}`);
      }
    } catch (e) {
      router.push("/error");
    } finally {
      setLoading(false);
    }
  };

  // Move to next slide after validating current step fields
  const handleNext = async () => {
    // Validate only current step fields (define fields per step)
    let fieldsToValidate: (keyof TripFormData)[] = [];

    switch (activeTabs) {
      case 1:
        fieldsToValidate = ["description"];
        break;
      case 2:
        fieldsToValidate = ["dates"];
        break;
      case 3:
        fieldsToValidate = ["activities"];
        break;
      case 4:
        fieldsToValidate = ["budget"];
        break;
      case 5:
        fieldsToValidate = ["adults", "children"];
        break;
      default:
        fieldsToValidate = [];
    }

    const valid = await trigger(fieldsToValidate);
    if (valid) {
      sliderRef.current?.slideNext();
    }
  };

  const swiperOptions = {
    spaceBetween: 16,
    slidesPerView: 1,
    loop: false,
    autoHeight: true,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    onSlideChange(swiper: SwiperType) {
      setActiveTabs(swiper.activeIndex + 1);
      setDeactiveTabs(swiper.slides.length - (swiper.activeIndex + 1));
    },
  };

  useEffect(() => {
    if (sliderRef.current) {
      setActiveTabs(sliderRef.current.activeIndex + 1);
      setDeactiveTabs(
        sliderRef.current.slides.length - (sliderRef.current.activeIndex + 1)
      );
    }
  }, []);

  useEffect(() => {
    sliderRef.current?.update();
  }, [activeTabs, deactiveTabs]);

  return (
    <>
      {loading && <Loader />}
      <motion.div
        style={{ transformPerspective: "1000px" }}
        initial={{ y: "250px", rotateX: "75deg" }}
        animate={{ y: "0%", rotateX: "0deg" }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md">
          <div className="flex space-x-2 justify-center items-center mb-6">
            {Array.from({ length: activeTabs }).map((_, idx) => (
              <span
                key={`active-${idx}`}
                className="w-full max-w-24 h-2 rounded-full bg-primary"
              ></span>
            ))}
            {deactiveTabs > 0 &&
              Array.from({ length: deactiveTabs }).map((_, idx) => (
                <span
                  key={`inactive-${idx}`}
                  className="w-full max-w-24 h-2 rounded-full bg-white"
                ></span>
              ))}
          </div>

          <Swiper
            {...swiperOptions}
            onSwiper={(swiper) => (sliderRef.current = swiper)}
            className="mb-4"
          >
            {flow.map((item, idx) => (
              <SwiperSlide key={`flow-${idx}`}>
                {React.createElement(item.element, {
                  control,
                  register: undefined,
                  errors,
                  getValues,
                  setValue: undefined,
                  data: getValues(), // Current form values, optional
                  setData: undefined,
                })}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between items-center">
            {!sliderRef.current?.isBeginning ? (
              <button
                onClick={() => sliderRef.current?.slidePrev()}
                className="group w-max flex justify-center items-center gap-x-2 py-6 text-white font-bold text-lg"
              >
                <span className="group-hover:ms-4 duration-150 text-white">
                  <IoArrowBackOutline />
                </span>
                <span>Back</span>
              </button>
            ) : (
              <span></span>
            )}

            {!sliderRef.current?.isEnd ? (
              <button
                onClick={handleNext}
                className="group w-max flex justify-center items-center gap-x-2 py-6 text-white font-bold text-lg"
              >
                <span>Next</span>
                <span className="group-hover:ms-4 duration-150 text-white">
                  <IoArrowForwardOutline />
                </span>
              </button>
            ) : (
              <button
                onClick={handleSubmit(createTrip)}
                className="group w-max flex justify-center items-center gap-x-2 py-6 text-white font-bold text-lg"
              >
                <span>Generate</span>
                <span className="group-hover:ms-4 duration-150 text-white">
                  <IoArrowForwardOutline />
                </span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FormProgression;
