import React from "react";
import styles from "./FilterButton.module.scss";
import { useResize } from "../../../../hooks/useResize";

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

  const { isMobile } = useResize()
  return (
    <button
      className={`${isMobile ? styles.mobileButton : styles.button} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default FilterButton;
