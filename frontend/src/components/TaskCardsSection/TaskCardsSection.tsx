import TaskCard from "./TaskCard/TaskCard";
import styles from "./TaskCardsSection.module.scss";
import { TaskCardsSectionProps } from "./TaskCardsSectionTypes";

const TaskCardsSection: React.FC<TaskCardsSectionProps> = ({ cards }) => {
  return (
    <div className={styles.cardsSection}>
      {cards.map((card, index) => (
        <TaskCard
          key={index}
          id={card.id}
          date={card.date}
          title={card.title}
          subTitle={card.subTitle}
          importance={card.importance}
        />
      ))}
    </div>
  );
};

export default TaskCardsSection;
