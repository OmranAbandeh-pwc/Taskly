import React from "react";
import styles from "./Button.module.scss";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";

interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  textStyles?: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  className,
  iconClass,
  textStyles,
  onClick,
}) => {
  return (
    <div className={`${styles.buttonContainer} ${className}`} onClick={onClick}>
      {icon && (
        <span className={`${styles.buttonIcon} ${iconClass}`}>{icon}</span>
      )}

      <Text text={title} styles={textStyles} />
    </div>
  );
};

export default Button;
