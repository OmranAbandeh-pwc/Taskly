import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

interface Option {
  title: string;
  value: string;
}

interface DropdownProps {
  options: Option[]; // Array of options with title and value
  placeholder?: string; // Optional placeholder
  className?: string;
  onSelect: (selected: string) => void; // Callback when an option is selected
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  className,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
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
  );
};

export default Dropdown;
