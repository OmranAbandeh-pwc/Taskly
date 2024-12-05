import React from 'react'
import styles from "./Icon.module.scss";

const Icon: React.FC<any> = ({icon, className}) => {
  return (
    <div className={`${styles.iconContainer} ${className}`}>
      <img className={styles.icon} src={icon}/>
    </div>
  )
}

export default Icon
