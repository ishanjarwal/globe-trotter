"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberOfPeopleProps {
  initialValue?: number;
  onChange?: (value: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const NumberOfPeople: React.FC<NumberOfPeopleProps> = ({
  initialValue = 1,
  onChange,
  onNext,
  onPrev,
}) => {
  const [count, setCount] = useState<number>(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCount(value);
      onChange?.(value);
    } else if (e.target.value === "") {
      setCount(NaN); // empty state
    }
  };

  const increase = () => {
    setCount((prev) => {
      const newValue = prev + 1;
      onChange?.(newValue);
      return newValue;
    });
  };

  const decrease = () => {
    setCount((prev) => {
      if (prev > 1) {
        const newValue = prev - 1;
        onChange?.(newValue);
        return newValue;
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Number of People</h2>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={decrease} disabled={count <= 1}>
          –
        </Button>
        <Input
          type="number"
          value={Number.isNaN(count) ? "" : count}
          onChange={handleInputChange}
          className="w-20 text-center"
          min={1}
        />
        <Button variant="outline" onClick={increase}>
          +
        </Button>
      </div>

      <div className="flex gap-4 mt-6">
        {onPrev && (
          <Button variant="secondary" onClick={onPrev}>
            Back
          </Button>
        )}
        {onNext && (
          <Button onClick={onNext} disabled={Number.isNaN(count) || count <= 0}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default NumberOfPeople;
