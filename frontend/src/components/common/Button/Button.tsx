import React from "react";
import styles from "./Button.module.scss";
import Text from "../Text/Text";

interface ButtonProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  textStyles?: string;
  type?: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  className,
  iconClass,
  textStyles,
  type = "type-1",
  onClick,
}) => {
  const buttonType = (type: string) => {
    let className;
    if (type === "type-1") {
      className = styles.buttonContainer1;
    } else if (type === "type-2") {
      className = styles.buttonContainer2;
    }
    return className;
  };

  return (
    <div className={`${buttonType(type)} ${className}`} onClick={onClick}>
      {icon && (
        <span className={`${styles.buttonIcon} ${iconClass}`}>{icon}</span>
      )}
      <Text text={title} styles={`${styles.textStyles} ${textStyles}`} />
    </div>
  );
};

export default Button;
