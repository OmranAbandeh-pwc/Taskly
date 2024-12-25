import React from "react";
import styles from "./TaskCard.module.scss";
import Text from "../../common/Text/Text";
import { TaskCardProps } from "../TaskCardsSectionTypes";
import { Link } from "react-router-dom";
import { PAGES } from "../../../shared/routes";

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  date,
  title,
  subTitle,
  importance,
  
}) => {
  return (
    <Link className={styles.cardLink} to={`${PAGES.TASK_DETAILS_PAGE}/${id}`}>
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
