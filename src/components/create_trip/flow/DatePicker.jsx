"use client";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./style.css";

const DatePicker = ({ data, setData }) => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold text-center my-4">
        Pick the Dates
      </h2>
      <DateRangePicker
        onChange={(v) => {
          setData((prev) => ({ ...prev, dates: v }));
        }}
        value={data.dates}
        isOpen={1}
        minDate={new Date()}
      />
    </div>
  );
};

export default DatePicker;
