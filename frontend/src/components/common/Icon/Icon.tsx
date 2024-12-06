import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  icon: string;
  className: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return (
    <div className={`${styles.iconContainer} ${className}`}>
      <img className={styles.icon} src={icon} />
    </div>
  );
};

export default Icon;
