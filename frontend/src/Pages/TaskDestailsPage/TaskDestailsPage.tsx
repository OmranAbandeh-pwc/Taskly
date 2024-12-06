import { useParams } from "react-router-dom"
import styles from "./TaskDestailsPage.module.scss";

const TaskDestailsPage = () => {

  const {id} = useParams()

  return (
    <div className={styles.mainContainer}>
      TaskDestailsPage{id}
    </div>
  )
}

export default TaskDestailsPage
