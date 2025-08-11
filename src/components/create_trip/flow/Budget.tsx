import { GiReceiveMoney } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { ImSpades } from "react-icons/im";
import React from "react";
import clsx from "clsx";
import { Controller, Control } from "react-hook-form";
import { TripFormData } from "../validation";

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

interface BudgetProps {
  control: Control<TripFormData>;
  errors: any;
}

const Budget: React.FC<BudgetProps> = ({ control, errors }) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        What is the Budget for this Trip ?
      </h2>
      {errors.budget?.name && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {errors.budget.name.message}
        </p>
      )}
      <Controller
        name="budget"
        control={control}
        render={({ field }) => {
          const selectedBudgetName = field.value?.name || "";
          const onSelectBudget = (budget: (typeof budgets)[0]) => {
            field.onChange({ name: budget.name, value: budget.value });
          };

          return (
            <div className="flex flex-col justify-center gap-4">
              {budgets.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => onSelectBudget(item)}
                  className={clsx(
                    selectedBudgetName === item.name
                      ? "bg-white text-black"
                      : "bg-white/10 text-white",
                    "w-full py-4 px-6 flex flex-col items-center justify-center gap-y-1 font-bold rounded-2xl hover:bg-white hover:text-black duration-150"
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
          );
        }}
      />
    </div>
  );
};

export default Budget;
