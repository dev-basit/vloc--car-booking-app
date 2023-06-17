import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

function AppDatePicker({ dateCallback, className }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
    const currentDate = moment(date, "YYYY-MM-DD");
    const formattedDate = currentDate.format("YYYY-MM-DD");
    dateCallback(formattedDate);
  };

  return (
    <section className={className}>
      <DatePicker selected={date} isClearable onChange={(date) => handleDateChange(date)} />
    </section>
  );
}

export default AppDatePicker;
