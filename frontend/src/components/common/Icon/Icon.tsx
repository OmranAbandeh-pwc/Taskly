import React from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  icon: string;
  alt?: string;
  className: string;
}

const Icon: React.FC<IconProps> = ({ icon, alt = "", className }) => {
  return (
    <div className={`${styles.iconContainer} ${className}`}>
      <img className={styles.icon} src={icon} alt={alt} />
    </div>
  );
};

export default Icon;
