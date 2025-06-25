import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

interface IDateRangePicker {
  [key: string]: any;
}

const DateRangePicker: React.FC<IDateRangePicker> = (props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(props.value || [null, null]);
  const [startDate, endDate] = dateRange;
  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    props?.onStartEndChanges && props.onStartEndChanges(update);
    if (update[0] && update[1]) {
      const start = update[0].toLocaleDateString();
      const end = update[1].toLocaleDateString();
      props?.onChange({ start, end });
    }
    if (!update[0] && !update[1]) {
      props?.onChange({ start: null, end: null });
    }
  };

  return (
    <DatePicker
      {...props}
      selectsRange={true}
      className="h-10 min-w-[250px] px-4 py-2 text-sm font-medium border bg-white border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150 placeholder-gray-500 text-gray-700"
      startDate={startDate}
      endDate={endDate}
      dateFormat="dd/MM/yyyy"
      onChange={handleDateChange}
      isClearable={true}
      placeholderText="Select date range"
      popperClassName="!z-4"
      wrapperClassName="w-full"
      calendarClassName="rounded-md shadow-lg"
      dayClassName={() => "px-2 py-1 hover:bg-gray-100 rounded-md"}
    />
  );
};

export default DateRangePicker;
