import { useParams, useNavigate } from "react-router-dom";
import styles from "./TaskDestailsPage.module.scss";
import Text from "../../components/common/Text/Text";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";
import { API, PAGES } from "../../shared/routes";
import { useEffect, useState } from "react";
import { TaskCardProps } from "../../components/TaskCardsSection/TaskCardsSectionTypes";

const TaskDestailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState<TaskCardProps>();

  const fetchDetails = () => {
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${API.get.CARD_DETAILS}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setCard(result.task);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDelete = () => {
    const requestOptions: any = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${API.delete.DELETE_TASK}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          navigate(PAGES.INITIAL_PAGE);
        }
      })
      .catch((error) => console.error(error));
  };

  return card ? (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.actionsBar}>
          <FiEdit
            className={styles.actionIcon}
            onClick={() => navigate(`${PAGES.TASK_EDIT_PAGE}/${id}`)}
          />
          <RiDeleteBin6Line
            className={styles.actionIcon}
            onClick={handleDelete}
          />
          <FaRegWindowClose
            className={styles.actionIcon}
            onClick={() => navigate(PAGES.INITIAL_PAGE)}
          />
        </div>

        <div className={styles.dottedTitle}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "red" }}
          ></span>

          <Text styles={styles.cardTitle} text={card.title} />
        </div>
        <Text styles={styles.cardSubTitle} text={card.subTitle} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TaskDestailsPage;
