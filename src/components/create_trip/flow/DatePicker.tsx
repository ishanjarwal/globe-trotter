import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TripFormData } from "../validation";
import "react-calendar/dist/Calendar.css";
import "./style.css";

interface DatePickerProps {
  control: Control<TripFormData>;
  errors: FieldErrors<TripFormData>;
}

const DatePicker: React.FC<DatePickerProps> = ({ control, errors }) => {
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
        render={({ field }) => (
          <DateRangePicker
            onChange={(value: any) => field.onChange(value)}
            value={field.value as any} // ✅ cast to correct type
            minDate={new Date()}
            calendarIcon={null}
            clearIcon={null}
          />
        )}
      />
    </div>
  );
};

export default DatePicker;
