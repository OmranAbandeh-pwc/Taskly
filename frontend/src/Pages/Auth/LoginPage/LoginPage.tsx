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
import { Formik } from "formik";
import * as Yup from "yup";
import pic from "../../../resources/images/Logo_square_400x400.png";
import SubmitInput from "../../../components/common/SubmitInput/SubmitInput";
import usePostSigninQuery from "../../../server/hooks/usePostSignin";
interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isRememberMeChecked, setIsRememberMeChecked] =
    useState<boolean>(false);
  const { widthSize } = useResize();

  const { mutate: postSignin } = usePostSigninQuery();

  const handleLogin = (
    email: string,
    password: string,
    setFieldError: (field: string, message: string) => void
  ) => {
    postSignin(
      {
        signal: new AbortController().signal,
        email: email,
        password: password,
      },
      {
        onSuccess: (response) => {
          const resData = response.data;
          if (resData.status === 200) {
            if (isRememberMeChecked) {
              localStorage.setItem("userToken", resData.token);
            } else {
              sessionStorage.setItem("userToken", resData.token);
            }
            window.location.reload();
          }
        },
        onError: (error: any) => {
          const statusCode = error.response.status;
          const errorMessage =
            error.response.data?.message || "Something went wrong.";

          if (statusCode === 404) {
            setFieldError("email", errorMessage);
          } else if (statusCode === 401) {
            setFieldError("password", errorMessage);
          } else {
            alert(`Error: ${errorMessage}`);
          }
        },
      }
    );
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
