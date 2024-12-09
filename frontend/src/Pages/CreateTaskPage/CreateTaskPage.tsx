import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import TextAreaInput from "../../components/common/TextAreaInput/TextAreaInput";
import TextInput from "../../components/common/TextInput/TextInput";
import styles from "./CreateTaskPage.module.scss";
import { FaRegWindowClose } from "react-icons/fa";
import {
  titleInputLabel,
  titleInputPlaceholder,
  descriptionInputLabel,
  descriptionInputPlaceholder,
  createButtonText,
} from "../../json/static/staticCreateTaskPage";

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
            label={titleInputLabel}
            placeholder={titleInputPlaceholder}
            type={"text"}
            className={styles.inputs}
            value={taskTitle}
            onValueChange={setTaskTitle}
          />
          <TextAreaInput
            label={descriptionInputLabel}
            placeholder={descriptionInputPlaceholder}
            className={styles.inputs}
            value={taskDescription}
            onValueChange={setTaskDescription}
          />
          <Button
            title={createButtonText}
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
