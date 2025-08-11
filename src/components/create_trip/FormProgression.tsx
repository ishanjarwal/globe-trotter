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

interface BudgetType {
  name: string;
  value: string;
}

interface TripData {
  description: string;
  activities: string[];
  adults: number;
  children: number;
  budget: BudgetType;
  dates: Date | null;
}

interface FlowStep {
  element: React.ComponentType<any>;
  button: string;
}

const flow: FlowStep[] = [
  { element: Description, button: "Next" },
  { element: DatePicker, button: "Next" },
  { element: Activities, button: "Next" },
  { element: Budget, button: "Next" },
  { element: NumberOfPeople, button: "Next" },
  { element: Generate, button: "Next" },
];

const FormProgression: React.FC = () => {
  const router = useRouter();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const initData: TripData = {
    description: "",
    activities: [],
    adults: 1,
    children: 0,
    budget: { name: "", value: "" },
    dates: null,
  };
  const [data, setData] = useState<TripData>(initData);

  const sliderRef = useRef<SwiperType | null>(null);
  const [activeTabs, setActiveTabs] = useState<number>(1);
  const [deactiveTabs, setDeactiveTabs] = useState<number>(flow.length - 1);

  const swiperOptions = {
    spaceBetween: 16,
    slidesPerView: 1,
    loop: false,
    autoHeight: true,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    onSlideChange(this: SwiperType) {
      setActiveTabs(this.activeIndex + 1);
      setDeactiveTabs(this.slides.length - (this.activeIndex + 1));
    },
  };

  // const checkDesc = async (description: string): Promise<boolean> => {
  //   try {
  //     setValidationError(null);
  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_ROOT}/api/create/checkDesc`,
  //       { description },
  //       { withCredentials: true }
  //     );
  //     return true;
  //   } catch (error: any) {
  //     if (error?.response?.status === 400) {
  //       setValidationError(
  //         JSON.parse(error.response.data.validationError).reply
  //       );
  //     }
  //     return false;
  //   }
  // };

  // const createTrip = async (tripData: TripData) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post("/api/create", tripData);
  //     if (response.status === 200) {
  //       const { id } = response.data;
  //       router.push(`/trip/${id}`);
  //     }
  //   } catch {
  //     router.push("/error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  }, [data, activeTabs, deactiveTabs]);

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
                  data,
                  setData,
                  // createTrip,
                  setLoading,
                  loading,
                  validationError,
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
                // onClick={async () => {
                //   if (sliderRef.current?.activeIndex === 0) {
                //     const valid = await checkDesc(data.description);
                //     if (valid) sliderRef.current?.slideNext();
                //   } else {
                //     sliderRef.current?.slideNext();
                //   }
                // }}
                onClick={() => sliderRef.current?.slideNext()}
                className="group w-max flex justify-center items-center gap-x-2 py-6 text-white font-bold text-lg"
              >
                <span>Next</span>
                <span className="group-hover:ms-4 duration-150 text-white">
                  <IoArrowForwardOutline />
                </span>
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FormProgression;
