import React from "react";
import styles from "./TaskCard.module.scss";
import Text from "../../common/Text/Text";
import { TaskCardProps } from "../TaskCardsSectionTypes";

const TaskCard: React.FC<TaskCardProps> = ({
  date,
  title,
  description,
  dotColor,
}) => {
  return (
    <div className={styles.card}>
      <Text styles={styles.date} text={date} />
      <div className={styles.dottedTitle}>
        <span
          className={styles.dot}
          style={{ backgroundColor: dotColor }}
        ></span>
        <Text styles={styles.title} text={title} />
      </div>
      <Text styles={styles.description} text={description} />
    </div>
  );
};

export default TaskCard;
