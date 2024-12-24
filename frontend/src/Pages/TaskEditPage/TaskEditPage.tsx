import styles from "../CreateTaskPage/CreateTaskPage.module.scss";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Button from "../../components/common/Button/Button";
import TextAreaInput from "../../components/common/TextAreaInput/TextAreaInput";
import TextInput from "../../components/common/TextInput/TextInput";
import { FaRegWindowClose } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  titleInputLabel,
  titleInputPlaceholder,
  descriptionInputLabel,
  descriptionInputPlaceholder,
  editButtonText,
  emptyFieldText,
  dropdownPlaceholder,
  taskLevels,
} from "../../json/static/staticCreateTaskPage";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../shared/routes";

interface FormValues {
  title: string;
  subTitle: string;
  importance: string;
}

const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<FormValues>();

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
          console.log(result);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleEditTask = (values: FormValues) => {
    console.log("values : ", values);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: values.title,
      subTitle: values.subTitle,
      importance: values.importance,
    });

    const requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API.put.EDIT_TASK}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          navigate(`/task/details/${id}`);
        }
      })
      .catch((error) => console.error(error));
  };

  // Initial values
  let initialValues: FormValues = {
    title: card ? card.title : "",
    subTitle: card ? card.subTitle : "",
    importance: card ? card.importance : "",
  };

  // Validation schema (using Yup)
  const validationSchema = Yup.object({
    title: Yup.string().required(emptyFieldText),
    subTitle: Yup.string().required(emptyFieldText),
    importance: Yup.string().required(emptyFieldText),
  });

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleEditTask(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
              <div className={styles.actionsBar}>
                <FaRegWindowClose
                  className={styles.actionIcon}
                  onClick={() => navigate(`/task/details/${id}`)}
                />
              </div>

              <div className={styles.fieldsContainer}>
                <TextInput
                  label={titleInputLabel}
                  placeholder={titleInputPlaceholder}
                  type={"text"}
                  className={styles.inputs}
                  value={formik.values.title}
                  onValueChange={formik.handleChange("title")}
                  errorMessage={
                    formik.touched.title ? (formik.errors.title as string) : ""
                  }
                />
                <TextAreaInput
                  label={descriptionInputLabel}
                  placeholder={descriptionInputPlaceholder}
                  className={styles.inputs}
                  value={formik.values.subTitle}
                  onValueChange={formik.handleChange("subTitle")}
                  errorMessage={
                    formik.touched.subTitle
                      ? (formik.errors.subTitle as string)
                      : ""
                  }
                />
                <Dropdown
                  options={taskLevels}
                  placeholder={dropdownPlaceholder}
                  className={styles.inputs}
                  value={formik.values.importance}
                  onValueChange={formik.handleChange("importance")}
                  errorMessage={
                    formik.touched.importance ? formik.errors.importance : ""
                  }
                />
                <Button
                  title={editButtonText}
                  type="type-1"
                  className={styles.inputs}
                  onClick={formik.handleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default TaskEditPage;
