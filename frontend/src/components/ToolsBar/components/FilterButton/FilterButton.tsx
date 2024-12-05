import React from "react";
import styles from "./FilterButton.module.scss";

interface FilterButton {
  title: string;
  isActive: boolean;
  handleClick: () => void;
}

const FilterButton: React.FC<FilterButton> = ({
  title,
  isActive,
  handleClick,
}) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default FilterButton;
