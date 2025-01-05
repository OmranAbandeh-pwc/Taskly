import Picture from "../../../components/common/Picture/Picture";
import TextInput from "../../../components/common/TextInput/TextInput";
import styles from "./LoginPage.module.scss";
import {
  loginHeaderTitle,
  loginHeaderSubTitle,
  loginEmailInputLabel,
  loginEmailInputPlaceholder,
  loginPasswordInputLabel,
  loginPasswordInputPlaceholder,
  checkBoxLabel,
  loginBTN,
  textWithImage,
  emptyFieldText,
  invalidEmailText,
  minPassText,
} from "../../../json/static/staticLoginPage";
import CheckBox from "../../../components/common/CheckBox/CheckBox";
import { useState } from "react";
import { useResize } from "../../../hooks/useResize";
import TitleSection from "../../../components/common/TitleSection/TitleSection";
import TextWithButton from "../components/TextWithButton/TextWithButton";
import { AUTH } from "../../../shared/routes";
import { Formik } from "formik";
import * as Yup from "yup";
import pic from "../../../resources/images/Logo_square_400x400.png";
import SubmitInput from "../../../components/common/SubmitInput/SubmitInput";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] =
    useState<boolean>(false);
  const { widthSize } = useResize();

  const handleLogin = (
    email: string,
    password: string,
    setFieldError: (field: string, message: string) => void
  ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(AUTH.SIGNIN, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          if (isRememberMeChecked) {
            localStorage.setItem("userToken", result.token);
          } else {
            sessionStorage.setItem("userToken", result.token);
          }
          window.location.reload();
        } else if (result.status === 404) {
          setFieldError("email", result.message);
        } else if (result.status === 401) {
          setFieldError("password", result.message);
        }
      })
      .catch((error) => console.error(error));
  };

  // Initial values
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  // Validation schema (using Yup)
  const validationSchema = Yup.object({
    email: Yup.string().email(invalidEmailText).required(emptyFieldText),
    password: Yup.string().min(1, minPassText).required(emptyFieldText),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setFieldError }) => {
        handleLogin(values.email, values.password, setFieldError);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.loginPageContainer}>
            <div className={styles.loginContainer}>
              <div className={styles.loginContent}>
                <TitleSection
                  title={loginHeaderTitle}
                  subTitle={loginHeaderSubTitle}
                />
                <div className={styles.loginTextInputs}>
                  <TextInput
                    label={loginEmailInputLabel}
                    placeholder={loginEmailInputPlaceholder}
                    value={formik.values.email}
                    onValueChange={formik.handleChange("email")}
                    type={"email"}
                    errorMessage={
                      formik.touched.email
                        ? (formik.errors.email as string)
                        : ""
                    }
                  />
                  <TextInput
                    label={loginPasswordInputLabel}
                    placeholder={loginPasswordInputPlaceholder}
                    value={formik.values.password}
                    onValueChange={formik.handleChange("password")}
                    type={"password"}
                    errorMessage={
                      formik.touched.password
                        ? (formik.errors.password as string)
                        : ""
                    }
                  />
                  <CheckBox
                    label={checkBoxLabel}
                    onCheckChange={setIsRememberMeChecked}
                  />
                  <SubmitInput title={loginBTN} />
                  <TextWithButton
                    text={textWithImage.text}
                    link={textWithImage.link}
                  />
                </div>
              </div>
            </div>
            {widthSize >= 1024 && (
              <div className={styles.loginImage}>
                <Picture image={pic} />
              </div>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;
