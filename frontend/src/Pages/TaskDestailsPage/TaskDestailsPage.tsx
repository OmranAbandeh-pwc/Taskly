import { useParams, useNavigate } from "react-router-dom";
import styles from "./TaskDestailsPage.module.scss";
import Text from "../../components/common/Text/Text";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegWindowClose } from "react-icons/fa";


// TODO I need to create a static file 
const TaskDestailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    console.log("Edit Card : ", id);
  };

  const handleDelete = () => {
    console.log("Delete Card : ", id);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.actionsBar}>
          <FiEdit className={styles.actionIcon} onClick={handleEdit} />
          <RiDeleteBin6Line
            className={styles.actionIcon}
            onClick={handleDelete}
          />
          <FaRegWindowClose
            className={styles.actionIcon}
            onClick={() => navigate("/")}
          />
        </div>

        <div className={styles.dottedTitle}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "red" }}
          ></span>

          <Text styles={styles.cardTitle} text="New Workplace" />
        </div>
        <Text
          styles={styles.cardSubTitle}
          text="You can now view frontend in the browser, Note that the development build is not optimized. To create a production build, use npm run build.You can now view frontend in the browser, Note that the development build is not optimized. To create a production build, use npm run build."
        />
      </div>
    </div>
  );
};

export default TaskDestailsPage;
