import React from "react";
import styles from "../styles/InputStyles.module.scss";

interface DateInputProps {
  label: string;
  placeholder: string;
  value: string;
  errorMessage?: string;
  onValueChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  placeholder,
  value,
  errorMessage,
  onValueChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Remove all non-numeric and non-slash characters
    const cleanedInput = inputValue.replace(/[^0-9]/g, "");

    // Apply the DD/MM/YYYY format
    let formattedValue = cleanedInput;

    if (cleanedInput.length > 2) {
      formattedValue = `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(2)}`;
    }

    if (cleanedInput.length > 4) {
      formattedValue = `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(
        2,
        4
      )}/${cleanedInput.slice(4)}`;
    }

    // Limit to 10 characters (DD/MM/YYYY)
    formattedValue = formattedValue.slice(0, 10);

    onValueChange(formattedValue);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor="date">{label}</label>
      <input
        id="date"
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={10} // Limit input to 10 characters
      />
      <span className={styles.errorMessage}>
        {errorMessage && errorMessage}
      </span>
    </div>
  );
};

export default DateInput;
