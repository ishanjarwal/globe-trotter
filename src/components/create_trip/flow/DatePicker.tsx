"use client";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import { Control, Controller } from "react-hook-form";
import { TripFormData } from "../validation";

interface DatePickerProps {
  control: Control<TripFormData>;
  errors: any;
}

const DatePicker = ({ control, errors }: DatePickerProps) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center my-4">
        Pick the Dates
      </h2>
      {errors.dates && (
        <p className="text-white/75 text-lg mb-2 ms-1 text-center w-full">
          {errors.dates.message}
        </p>
      )}

      <Controller
        name="dates"
        control={control}
        render={({ field }) => {
          return (
            <DateRangePicker
              onChange={(value) => {
                if (Array.isArray(value) && value.length === 2) {
                  field.onChange(value as [Date, Date]);
                } else {
                  field.onChange([]);
                }
              }}
              value={
                Array.isArray(field.value) && field.value.length === 2
                  ? (field.value as [Date, Date])
                  : null
              }
              isOpen={true}
              minDate={new Date()}
            />
          );
        }}
      />
    </div>
  );
};

export default DatePicker;
