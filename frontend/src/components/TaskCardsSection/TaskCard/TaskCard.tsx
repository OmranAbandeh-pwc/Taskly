import React from "react";
import styles from "./TaskCard.module.scss";
import Text from "../../common/Text/Text";
import { TaskCardProps } from "../TaskCardsSectionTypes";
import { Link } from "react-router-dom";
import { PAGES } from "../../../shared/routes";
import { formatDateTypeTwo } from "../../../functions/date";
import { getLanguage } from "../../../hooks/getLanguage";
import { getImportanceColor } from "../../../functions/filterColors";
<<<<<<< HEAD
import Picture from "../../common/Picture/Picture";
=======
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  startDate,
  endDate,
  title,
  subTitle,
  importance,
<<<<<<< HEAD
  imageUrl,
}) => {
  const lang = getLanguage();

=======
}) => {
  const lang = getLanguage();
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
  return (
    <Link className={styles.cardLink} to={`${PAGES.TASK_DETAILS_PAGE}/${id}`}>
      <div className={styles.card}>
        <div className={styles.dateContainer}>
          <Text
            styles={styles.date}
            text={formatDateTypeTwo(new Date(startDate), lang)}
          />
          {"-"}
          <Text
            styles={styles.date}
            text={formatDateTypeTwo(new Date(endDate), lang)}
          />
        </div>

        <div className={styles.dottedTitle}>
          <span
            className={styles.dot}
            style={{ backgroundColor: getImportanceColor(importance) }}
          ></span>
          <Text styles={styles.title} text={title} />
        </div>
<<<<<<< HEAD
        {imageUrl && <Picture className={styles.image} image={`${imageUrl}`} />}
=======
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
        <Text styles={styles.description} text={subTitle} />
      </div>
    </Link>
  );
};

export default TaskCard;
