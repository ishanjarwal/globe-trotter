import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { ImSpades } from "react-icons/im";
import clsx from "clsx";

const budgets = [
  {
    icon: <GiReceiveMoney />,
    name: "Budgeted",
    value: "under ₹50K",
  },
  {
    icon: <RiMoneyRupeeCircleLine />,
    name: "Moderate",
    value: "₹50K - ₹100K",
  },
  {
    icon: <IoDiamondOutline />,
    name: "Luxurious",
    value: "₹100K - ₹500K",
  },
  {
    icon: <ImSpades />,
    name: "Ultra Luxurious",
    value: "₹500K - ₹1M",
  },
];

const Budget = ({ data, setData }) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        What is the Budget for this Trip ?
      </h2>
      <div className="flex flex-col justify-center gap-4">
        {budgets.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setData((prev) => ({
                ...prev,
                budget: { name: item.name, value: item.value },
              }));
            }}
            className={clsx(
              { "bg-white text-black": data.budget.name == item.name },
              { "bg-white/10 text-white": !(data.budget.name == item.name) },
              "w-full py-4 px-6 flex flex-col items-center justify-center gap-y-1  font-bold rounded-2xl hover:bg-white hover:text-black duration-150"
            )}
          >
            <span className="flex justify-center items-center gap-x-1">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-lg">{item.name}</span>
            </span>
            {/* <span className='text-sm opacity-50 '>({item.value})</span> */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Budget;
