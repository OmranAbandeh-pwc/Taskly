import TextInput from "../../../components/common/TextInput/TextInput";
import styles from "./SignupPage.module.scss";
import {
  signupHeaderTitle,
  signupHeaderSubTitle,
  firstNameLabel,
  firstNamePlaceholder,
  secondNameLabel,
  secondNamePlaceholder,
  birthdayLabel,
  birthdayPlaceholder,
  userEmailLabel,
  userEmailPlaceholder,
  userPasswordLabel,
  userPasswordPlaceholder,
  userConfirmPasswordLabel,
  userConfirmPasswordPlaceholder,
  signupBTN,
  textWithButton,
  emptyFieldText,
  invalidEmail,
  passwordStrengthText,
} from "../../../json/static/staticSignupPage";
import DateInput from "../../../components/common/DateInput/DateInput";
import TitleSection from "../../../components/common/TitleSection/TitleSection";
import TextWithButton from "../components/TextWithButton/TextWithButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { AUTH } from "../../../shared/routes";
import SubmitInput from "../../../components/common/SubmitInput/SubmitInput";

interface FormValues {
  firstName: string;
  secondName: string;
  birthday: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const handleSignup = (
    values: FormValues,
    setFieldError: (field: string, message: string) => void
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: values.firstName,
      secondName: values.secondName,
      birthday: values.birthday,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(AUTH.SIGNUP, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 400) {
          setFieldError("email", result.message);
        }
      })
      .catch((error) => console.error(error));
  };

  // Initial values
  const initialValues: FormValues = {
    firstName: "",
    secondName: "",
    birthday: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validation schema (using Yup)
  const validationSchema = Yup.object({
    firstName: Yup.string().required(emptyFieldText),
    secondName: Yup.string().required(emptyFieldText),
    birthday: Yup.string().required(emptyFieldText),
    email: Yup.string().email(invalidEmail).required(emptyFieldText),
    password: Yup.string()
      .min(6, passwordStrengthText)
      .required(emptyFieldText),
    confirmPassword: Yup.string()
      .min(6, passwordStrengthText)
      .required(emptyFieldText),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setFieldError }) => {
        handleSignup(values, setFieldError);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.signupPageContainer}>
            <div className={styles.signupPageInnerContainer}>
              <TitleSection
                title={signupHeaderTitle}
                subTitle={signupHeaderSubTitle}
                className={styles.titleSection}
              />
              <div className={styles.signupContainer}>
                <TextInput
                  label={firstNameLabel}
                  placeholder={firstNamePlaceholder}
                  value={formik.values.firstName}
                  onValueChange={formik.handleChange("firstName")}
                  type={"text"}
                  errorMessage={
                    formik.touched.firstName
                      ? (formik.errors.firstName as string)
                      : ""
                  }
                />
                <TextInput
                  label={secondNameLabel}
                  placeholder={secondNamePlaceholder}
                  value={formik.values.secondName}
                  onValueChange={formik.handleChange("secondName")}
                  type={"text"}
                  errorMessage={
                    formik.touched.secondName
                      ? (formik.errors.secondName as string)
                      : ""
                  }
                />
                <DateInput
                  label={birthdayLabel}
                  placeholder={birthdayPlaceholder}
                  value={formik.values.birthday}
                  onValueChange={formik.handleChange("birthday")}
                  errorMessage={
                    formik.touched.birthday
                      ? (formik.errors.birthday as string)
                      : ""
                  }
                />
                <TextInput
                  label={userEmailLabel}
                  placeholder={userEmailPlaceholder}
                  value={formik.values.email}
                  onValueChange={formik.handleChange("email")}
                  type={"email"}
                  errorMessage={
                    formik.touched.email ? (formik.errors.email as string) : ""
                  }
                />
                <TextInput
                  label={userPasswordLabel}
                  placeholder={userPasswordPlaceholder}
                  value={formik.values.password}
                  onValueChange={formik.handleChange("password")}
                  type={"password"}
                  errorMessage={
                    formik.touched.password
                      ? (formik.errors.password as string)
                      : ""
                  }
                />
                <TextInput
                  label={userConfirmPasswordLabel}
                  placeholder={userConfirmPasswordPlaceholder}
                  value={formik.values.confirmPassword}
                  onValueChange={formik.handleChange("confirmPassword")}
                  type={"password"}
                  errorMessage={
                    formik.touched.confirmPassword
                      ? (formik.errors.confirmPassword as string)
                      : ""
                  }
                />
                <SubmitInput title={signupBTN} />
                <TextWithButton
                  text={textWithButton.text}
                  link={textWithButton.link}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SignupPage;
