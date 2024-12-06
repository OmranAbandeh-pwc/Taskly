import TaskCard from "./TaskCard/TaskCard";
import styles from "./TaskCardsSection.module.scss";
import { TaskCardsSectionProps } from "./TaskCardsSectionTypes";

const TaskCardsSection: React.FC<TaskCardsSectionProps> = ({ cards }) => {
  return (
    <div className={styles.cardsSection}>
      {cards.map((card, index) => (
        <TaskCard
          key={index}
          date={card.date}
          title={card.title}
          description={card.description}
          dotColor={card.dotColor}
        />
      ))}
    </div>
  );
};

export default TaskCardsSection;
