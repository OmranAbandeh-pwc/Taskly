import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateSelector.css";
import styles from "../common/styles/InputStyles.module.scss";
import { formatDateTypeTwo } from "../../functions/date";

interface DateSelectorProps {
  label?: string;
  placeholder: string;
  inputContainerClass?: string;
  value: any; // Single date or range
  onChange?: (value: string | [string, string]) => void; // Single date or range
}

const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  placeholder,
  inputContainerClass,
  value,
  onChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const today = new Date();

  const handleDateChange = (newDate: any) => {
    setShowCalendar(false);

    if (Array.isArray(newDate)) {
      // Date range selected
      const [start, end] = newDate;

      if (end && end < start) {
        // Prevent endDate from being before startDate
        return;
      }

      const formattedStart = formatDateTypeTwo(start, "en");
      const formattedEnd = formatDateTypeTwo(end, "en");
      onChange?.([formattedStart, formattedEnd]); // Pass formatted date range
    } else {
      // Single date selected
      const formattedDate = formatDateTypeTwo(newDate as Date, "en");
      onChange?.(formattedDate); // Pass formatted date string
    }
  };

  const parseDate = (dateString: string): Date => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? today : date;
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const getDisplayValue = (): string => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      return `${start} - ${end}`;
    }
    return value ? formatDateTypeTwo(new Date(value), "en") : placeholder;
  };

  return (
    <div
      className={`input-container ${styles.inputContainer} ${inputContainerClass}`}
    >
      {label && <label>{label}</label>}
      <div className={`${styles.input} input`} onClick={toggleCalendar}>
        {getDisplayValue()}
      </div>
      {showCalendar && (
        <div className="calendar">
          <Calendar
            locale={"en"}
            value={
              Array.isArray(value)
                ? [parseDate(value[0]), parseDate(value[1])]
                : value
                ? parseDate(value)
                : today
            }
            onChange={handleDateChange}
            selectRange={true}
            minDate={today} // Disable end date before start date
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
