import Loader from "../Loader/Loader";
import TaskCard from "./TaskCard/TaskCard";
import styles from "./TaskCardsSection.module.scss";
import { TaskCardsSectionProps } from "./TaskCardsSectionTypes";

const TaskCardsSection: React.FC<TaskCardsSectionProps> = ({
  cards,
  isLoading,
}) => {
  return (
    <div
      className={`${isLoading ? styles.loaderSection : styles.cardsSection}`}
    >
      {isLoading || cards.length === 0 ? (
        <Loader />
      ) : (
        cards.map((card, index) => (
          <TaskCard
            key={index}
            id={card.id}
            date={card.date}
            title={card.title}
            subTitle={card.subTitle}
            importance={card.importance}
          />
        ))
      )}
    </div>
  );
};

export default TaskCardsSection;
