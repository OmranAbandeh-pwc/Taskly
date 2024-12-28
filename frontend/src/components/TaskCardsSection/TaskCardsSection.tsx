import Text from "../common/Text/Text";
import Loader from "../Loader/Loader";
import TaskCard from "./TaskCard/TaskCard";
import styles from "./TaskCardsSection.module.scss";
import { TaskCardsSectionProps } from "./TaskCardsSectionTypes";
import { noTasksText } from "../../json/static/staticGeneral";

const TaskCardsSection: React.FC<TaskCardsSectionProps> = ({
  cards,
  isLoading,
}) => {
  return isLoading ? (
    <div className={styles.centered}>
      <Loader />
    </div>
  ) : cards.length === 0 ? (
    <div className={styles.centered}>
      <Text styles={styles.noTasksText} text={noTasksText} />
    </div>
  ) : (
    <div className={`${styles.cardsSection}`}>
      {cards.map((card, index) => (
        <TaskCard
          key={index}
          id={card.id}
          startDate={card.startDate ? card.startDate : ""}
          endDate={card.endDate ? card.endDate : ""}
          title={card.title}
          subTitle={card.subTitle}
          importance={card.importance}
        />
      ))}
    </div>
  );
};

export default TaskCardsSection;
