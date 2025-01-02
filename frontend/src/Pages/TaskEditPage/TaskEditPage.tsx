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
  fileUploaderPlaceholder,
} from "../../json/static/staticCreateTaskPage";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API, PAGES } from "../../shared/routes";
import DateSelector from "../../components/DateSelector/DateSelector";
import { formatDateTypeTwo } from "../../functions/date";
import { getLanguage } from "../../hooks/getLanguage";
import FileUploader from "../../components/common/FileUploader/FileUploader";
import { ThreeDots } from "react-loader-spinner";

interface FormValues {
  title: string;
  subTitle: string;
  importance: string;
  startDate: any;
  endDate: any;
  image: File | null;
  imageName: string;
}

const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lang = getLanguage();
  const [card, setCard] = useState<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleEditTask = async (values: FormValues) => {
    setIsLoading(true);
    const myHeaders = new Headers();
    const formdata = new FormData();

    formdata.append("title", values.title);
    formdata.append("subTitle", values.subTitle);
    formdata.append("importance", values.importance);
    formdata.append("startDate", values.startDate);
    formdata.append("endDate", values.endDate);
    if (values.image) {
      formdata.append("image", values.image);
    }

    const requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${API.put.EDIT_TASK}/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          navigate(`${PAGES.TASK_DETAILS_PAGE}/${id}`);
        }
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  // Initial values
  let initialValues: FormValues = {
    title: card ? card.title : "",
    subTitle: card ? card.subTitle : "",
    importance: card ? card.importance : "",
    startDate: card ? card.startDate : "",
    endDate: card ? card.endDate : "",
    image: null,
    imageName: card ? card.imageName : "",
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
                  <FileUploader
                    placeholder={
                      formik.values.imageName
                        ? formik.values.imageName
                        : fileUploaderPlaceholder
                    }
                    onChange={(e) =>
                      formik.setFieldValue("image", e.target.files![0])
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
                  {isLoading ? (
                    <ThreeDots
                      visible={true}
                      height="60"
                      width="60"
                      color="#646EC8"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <Button
                      title={editButtonText}
                      type="type-1"
                      className={styles.inputs}
                      onClick={formik.handleSubmit}
                    />
                  )}
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
