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
  emptyFieldText,
  dropdownPlaceholder,
  taskLevels,
} from "../../json/static/staticCreateTaskPage";
import { userToken } from "../../shared/variables";
import { API } from "../../shared/routes";
import Dropdown from "../../components/common/Dropdown/Dropdown";

// TODO add date filed to the task
// TODO add drop down to choose level of the task
const CreateTaskPage = () => {
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState<string>("");
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] =
    useState<string>("");
  const [taskLevel, setTaskLevel] = useState<string>("");

  const handleCreateTask = () => {
    setTitleErrorMessage("");
    setDescriptionErrorMessage("");
    if (taskTitle === "" && taskDescription === "") {
      setTitleErrorMessage(emptyFieldText);
      setDescriptionErrorMessage(emptyFieldText);
    } else if (taskTitle === "") {
      setTitleErrorMessage(emptyFieldText);
    } else if (taskDescription === "") {
      setDescriptionErrorMessage(emptyFieldText);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      const raw = JSON.stringify({
        title: taskTitle,
        subTitle: taskDescription,
        importance: taskLevel,
      });

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(API.post.ADD_TASK, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
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
            errorMessage={titleErrorMessage}
          />
          <TextAreaInput
            label={descriptionInputLabel}
            placeholder={descriptionInputPlaceholder}
            className={styles.inputs}
            value={taskDescription}
            onValueChange={setTaskDescription}
            errorMessage={descriptionErrorMessage}
          />
          <Dropdown
            options={taskLevels}
            placeholder={dropdownPlaceholder}
            className={styles.inputs}
            onSelect={setTaskLevel}
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
