import React from "react";
import styles from "./ToolsBar.module.scss";
import FilterButton from "./components/FilterButton/FilterButton";
import { filterButtons } from "../../json/filtersStatic";
import Button from "../common/Button/Button";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoAddCircleSharp } from "react-icons/io5";
import { useResize } from "../../hooks/useResize";
import { useNavigate } from "react-router-dom";
import { addTaskText, showMoreText } from "../../json/static/staticGeneral";
import { PAGES } from "../../shared/routes";
interface ToolsBarProps {
  activeButton: string | undefined;
  setActiveButton: (value: string) => void;
  className?: string;
  moreOptionButton: () => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({
  activeButton,
  setActiveButton,
  className,
  moreOptionButton,
}) => {
  const navigate = useNavigate();
  const { isMobile } = useResize();

  const handleButtonClick = (value: string) => {
    setActiveButton(value);
  };

  return (
    <div className={`${styles.toolsBar} ${className}`}>
      <div className={styles.filterButtonsContainer}>
        {!isMobile && (
          <Button
            title={showMoreText}
            className={styles.addButton}
            iconClass={styles.buttonIconClass}
            textStyles={styles.buttonTextClass}
            type="type-3"
            onClick={moreOptionButton}
          />
        )}
        {filterButtons.map((button, index) => (
          <FilterButton
            key={index}
            title={button.title}
            isActive={activeButton === button.value}
            handleClick={() => handleButtonClick(button.value)}
          />
        ))}
      </div>

      {isMobile ? (
        <IoAddCircleSharp
          className={styles.buttonIconClass}
          onClick={() => navigate(PAGES.CREATE_TASK_PAGE)}
        />
      ) : (
        <Button
          title={addTaskText}
          className={styles.addButton}
          iconClass={styles.buttonIconClass}
          textStyles={styles.buttonTextClass}
          icon={<IoAddCircleOutline />}
          onClick={() => navigate(PAGES.CREATE_TASK_PAGE)}
        />
      )}
    </div>
  );
};

export default ToolsBar;
