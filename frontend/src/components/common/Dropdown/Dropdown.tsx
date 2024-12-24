import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.scss";

interface Option {
  title: string;
  value: string;
}

interface DropdownProps {
  label?: string; // Label for the dropdown
  placeholder: string; // Placeholder text
  className?: string; // Additional class name for styling
  value: string; // Controlled value
  options: Option[]; // List of options
  errorMessage?: string; // Error message to display
  onValueChange: (value: string) => void; // Callback when the value changes
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  className,
  value,
  options,
  errorMessage,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    const matchedOption = options.find((option) => option.value === value);
    setSelectedOption(matchedOption || null);
  }, [value, options]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onValueChange(option.value);
  };

  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      {label && <label>{label}</label>}
      <div className={styles.dropdownWrapper}>
        {/* Dropdown header */}
        <div className={styles.dropdownHeader} onClick={handleToggle}>
          {selectedOption?.title || placeholder}
          <span className={styles.dropdownArrow}>{isOpen ? "▲" : "▼"}</span>
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <ul className={styles.dropdownList}>
            {options.map((option, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelect(option)}
              >
                {option.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={styles.errorMessage}>
        {errorMessage && errorMessage}
      </span>
    </div>
  );
};

export default Dropdown;
