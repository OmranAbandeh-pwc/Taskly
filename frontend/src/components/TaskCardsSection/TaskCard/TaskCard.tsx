import React from "react";
import styles from "./TaskCard.module.scss";
import Text from "../../common/Text/Text";
import { TaskCardProps } from "../TaskCardsSectionTypes";
import { Link } from "react-router-dom";

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  date,
  title,
  subTitle,
  importance,
  
}) => {
  return (
    <Link className={styles.cardLink} to={`/task/details/${id}`}>
    <div className={styles.card}>
      <Text styles={styles.date} text={"date"} />
      <div className={styles.dottedTitle}>
        <span
          className={styles.dot}
          style={{ backgroundColor: "red" }}
        ></span>
        <Text styles={styles.title} text={title} />
      </div>
      <Text styles={styles.description} text={subTitle} />
    </div>
    </Link>
  );
};

export default TaskCard;
