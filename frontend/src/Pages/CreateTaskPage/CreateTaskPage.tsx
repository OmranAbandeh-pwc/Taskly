import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import TextAreaInput from "../../components/common/TextAreaInput/TextAreaInput";
import TextInput from "../../components/common/TextInput/TextInput";
import styles from "../styles/TaskFormStyles.module.scss";
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
  dateSelectorPlaceholder,
} from "../../json/static/staticCreateTaskPage";
import { userToken } from "../../shared/variables";
import { API, PAGES } from "../../shared/routes";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { Formik } from "formik";
import * as Yup from "yup";
import DateSelector from "../../components/DateSelector/DateSelector";
import { useState } from "react";
import { formatDate } from "../../functions/date";
import FileUploader from "../../components/common/FileUploader/FileUploader";

interface FormValues {
  title: string;
  subTitle: string;
  level: string;
  startDate: string;
  endDate: string;
  image: File | null;
}

// TODO add date filed to the task
// TODO add drop down to choose level of the task
const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<string | [string, string]>(
    ""
  );
  const formattedStartDate = formatDate(selectedValue[0]);
  const formattedEndDate = formatDate(selectedValue[1]);

  const handleDateChange = (value: string | [string, string]) => {
    setSelectedValue(value);
  };

  const handleCreateTask = (values: FormValues) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const formdata = new FormData();

    formdata.append("title", values.title);
    formdata.append("subTitle", values.subTitle);
    formdata.append("importance", values.level);
    formdata.append("startDate", formattedStartDate);
    formdata.append("endDate", formattedEndDate);
    if (values.image) {
      formdata.append("image", values.image);
    }
    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(API.post.ADD_TASK, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          navigate(PAGES.INITIAL_PAGE);
        }
      })
      .catch((error) => console.error(error));
  };

  // Initial values
  const initialValues: FormValues = {
    title: "",
    subTitle: "",
    level: "",
    startDate: "",
    endDate: "",
    image: null,
  };

  // Validation schema (using Yup)
  const validationSchema = Yup.object({
    title: Yup.string().required(emptyFieldText),
    subTitle: Yup.string().required(emptyFieldText),
    level: Yup.string().required(emptyFieldText),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleCreateTask(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
              <div className={styles.actionsBar}>
                <FaRegWindowClose
                  className={styles.actionIcon}
                  onClick={() => navigate(PAGES.INITIAL_PAGE)}
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
                <FileUploader
                  onChange={(e) =>
                    formik.setFieldValue("image", e.target.files![0])
                  }
                />
                <Dropdown
                  options={taskLevels}
                  placeholder={dropdownPlaceholder}
                  className={styles.inputs}
                  value="h"
                  onValueChange={formik.handleChange("level")}
                />
                <DateSelector
                  placeholder={dateSelectorPlaceholder}
                  inputContainerClass={styles.inputs}
                  value={selectedValue}
                  onChange={handleDateChange}
                />
                <Button
                  title={createButtonText}
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

export default CreateTaskPage;
