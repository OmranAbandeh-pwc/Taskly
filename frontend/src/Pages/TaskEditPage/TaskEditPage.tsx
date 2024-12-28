import styles from "../styles/TaskFormStyles.module.scss";
import pageStyles from "../TaskEditPage/TaskEditPage.module.scss";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Button from "../../components/common/Button/Button";
import TextAreaInput from "../../components/common/TextAreaInput/TextAreaInput";
import TextInput from "../../components/common/TextInput/TextInput";
import { FaRegWindowClose } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
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
  dateSelectorPlaceholder,
} from "../../json/static/staticCreateTaskPage";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, PAGES } from "../../shared/routes";
import DateSelector from "../../components/DateSelector/DateSelector";
import { formatDateTypeTwo } from "../../functions/date";
import { getLanguage } from "../../hooks/getLanguage";

interface FormValues {
  title: string;
  subTitle: string;
  importance: string;
  startDate: any;
  endDate: any;
}

const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lang = getLanguage();
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
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleEditTask = (values: FormValues) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: values.title,
      subTitle: values.subTitle,
      importance: values.importance,
      startDate: values.startDate,
      endDate: values.endDate,
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
          navigate(`${PAGES.TASK_DETAILS_PAGE}/${id}`);
        }
      })
      .catch((error) => console.error(error));
  };

  // Initial values
  let initialValues: FormValues = {
    title: card ? card.title : "",
    subTitle: card ? card.subTitle : "",
    importance: card ? card.importance : "",
    startDate: card ? card.startDate : "",
    endDate: card ? card.endDate : "",
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
      {(formik) => {
        const handleDateChange = (dates: any) => {
          // Convert the string to a Date object
          const startDate = new Date(dates[0]);
          const endDate = new Date(dates[1]);

          formik.setFieldValue("startDate", startDate.toISOString());
          formik.setFieldValue("endDate", endDate.toISOString());
        };
        return (
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.mainContainer}>
              <div className={styles.innerContainer}>
                <div
                  className={`${styles.actionsBar} ${pageStyles.spaceBetween}`}
                >
                  <IoMdArrowBack
                    className={`${pageStyles.backIcon}`}
                    onClick={() => {
                      window.history.back();
                    }}
                  />
                  <FaRegWindowClose
                    className={`${styles.actionIcon}`}
                    onClick={() => navigate(`${PAGES.INITIAL_PAGE}`)}
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
                      formik.touched.title
                        ? (formik.errors.title as string)
                        : ""
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
                  <DateSelector
                    placeholder={dateSelectorPlaceholder}
                    inputContainerClass={styles.inputs}
                    value={[
                      formatDateTypeTwo(
                        new Date(formik.values.startDate),
                        lang
                      ),
                      formatDateTypeTwo(new Date(formik.values.endDate), lang),
                    ]}
                    onChange={handleDateChange}
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
        );
      }}
    </Formik>
  );
};

export default TaskEditPage;
