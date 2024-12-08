import React, { useState } from "react";
import styles from "./ToolsBar.module.scss";
import FilterButton from "./components/FilterButton/FilterButton";
import { filterButtons } from "../../json/filtersStatic";
import Button from "../common/Button/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoAddCircleSharp } from "react-icons/io5";
import { useResize } from "../../hooks/useResize";
import { useNavigate } from "react-router-dom";
interface ToolsBarProps {
  className?: string;
}

const ToolsBar: React.FC<ToolsBarProps> = ({ className }) => {

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(filterButtons[0].title); // Initial active button
  const { isMobile } = useResize();

  const handleButtonClick = (title: string) => {
    setActiveButton(title);
  };

  return (
    <div className={`${styles.toolsBar} ${className}`}>
      <div className={styles.filterButtonsContainer}>
        {filterButtons.map((button, index) => (
          <FilterButton
            key={index}
            title={button.title}
            isActive={activeButton === button.title}
            handleClick={() => handleButtonClick(button.title)}
          />
        ))}
      </div>

      {isMobile ? (
        <IoAddCircleSharp className={styles.buttonIconClass} />
      ) : (
        <Button
          title={"Add new note"}
          className={styles.addButton}
          iconClass={styles.buttonIconClass}
          textStyles={styles.buttonTextClass}
          icon={<IoAddCircleOutline />}
          onClick={() => navigate("/task/create")}
        />
      )}
    </div>
  );
};

export default ToolsBar;
