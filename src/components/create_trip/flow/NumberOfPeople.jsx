import React from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const NumberOfPeople = ({ data, setData }) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        How many people are travelling ?
      </h2>
      <div className="flex justify-center items-center gap-x-16">
        <div className="rounded-xl p-4 bg-black/50 backdrop-blue-sm">
          <h3 className="text-xl text-center text-white font-bold">Adults</h3>
          <div className="flex justify-center items-center gap-x-8">
            <button
              onClick={() => {
                if (data.adults > 1) {
                  setData((prev) => ({ ...data, adults: prev.adults - 1 }));
                }
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-white hover:text-black duration-150"
            >
              <span className="text-xl">
                <IoMdRemove />
              </span>
            </button>
            <span className="text-2xl font-bold text-white">{data.adults}</span>
            <button
              onClick={() => {
                if (data.adults < 15) {
                  setData((prev) => ({ ...data, adults: prev.adults + 1 }));
                }
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-white hover:text-black duration-150"
            >
              <span className="text-xl">
                <IoMdAdd />
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-black/50 backdrop-blue-sm">
          <h3 className="text-xl text-center text-white font-bold">Children</h3>
          <div className="flex justify-center items-center gap-x-8">
            <button
              onClick={() => {
                if (data.children > 0) {
                  setData((prev) => ({ ...prev, children: prev.children - 1 }));
                }
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-white hover:text-black duration-150"
            >
              <span className="text-xl">
                <IoMdRemove />
              </span>
            </button>
            <span className="text-2xl font-bold text-white">
              {data.children}
            </span>
            <button
              onClick={() => {
                if (data.children < 15) {
                  setData((prev) => ({ ...prev, children: prev.children + 1 }));
                }
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white hover:bg-white hover:text-black duration-150"
            >
              <span className="text-xl">
                <IoMdAdd />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberOfPeople;
