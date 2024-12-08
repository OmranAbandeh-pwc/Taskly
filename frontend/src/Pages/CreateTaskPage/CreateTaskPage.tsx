import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import TextAreaInput from "../../components/common/TextAreaInput/TextAreaInput";
import TextInput from "../../components/common/TextInput/TextInput";
import styles from "./CreateTaskPage.module.scss";
import { FaRegWindowClose } from "react-icons/fa";


// TODO I need to create a static file 
const CreateTaskPage = () => {
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleCreateTask = () => {
    console.log("Create Task");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.actionsBar}>
          <FaRegWindowClose
            className={styles.actionIcon}
            onClick={() => navigate("/")}
          />
        </div>

        <div className={styles.fieldsContainer}>
          <TextInput
            label={"Task Title"}
            placeholder={""}
            type={"text"}
            className={styles.inputs}
            value={taskTitle}
            onValueChange={setTaskTitle}
          />
          <TextAreaInput
            label={"Task Des"}
            placeholder={""}
            className={styles.inputs}
            value={taskDescription}
            onValueChange={setTaskDescription}
          />
          <Button
            title={"Create Task"}
            type="type-1"
            className={styles.inputs}
            onClick={handleCreateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
