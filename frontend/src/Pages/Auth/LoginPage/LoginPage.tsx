import Button from "../../../components/common/Button/Button";
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
} from "../../../json/static/staticLoginPage";
import CheckBox from "../../../components/common/CheckBox/CheckBox";
import { useState } from "react";
import { useResize } from "../../../hooks/useResize";
import TitleSection from "../../../components/common/TitleSection/TitleSection";
import TextWithButton from "../components/TextWithButton/TextWithButton";
import { PAGES } from "../../../shared/routes";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [isRememberMeChecked, setIsRememberMeChecked] =
    useState<boolean>(false);
  const { widthSize } = useResize();

  const handleLogin = () => {
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    if (userEmail === "" && userPassword === "") {
      setEmailErrorMessage(emptyFieldText);
      setPasswordErrorMessage(emptyFieldText);
    } else if (userEmail === "") {
      setEmailErrorMessage(emptyFieldText);
    } else if (userPassword === "") {
      setPasswordErrorMessage(emptyFieldText);
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: userEmail,
        password: userPassword,
      });

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(PAGES.SIGNIN, requestOptions)
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
            setEmailErrorMessage(result.message);
          } else if (result.status === 401) {
            setPasswordErrorMessage(result.message);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
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
              value={userEmail}
              onValueChange={setUserEmail}
              type={"email"}
              errorMessage={emailErrorMessage}
            />
            <TextInput
              label={loginPasswordInputLabel}
              placeholder={loginPasswordInputPlaceholder}
              value={userPassword}
              onValueChange={setUserPassword}
              type={"password"}
              errorMessage={passwordErrorMessage}
            />
            <CheckBox
              label={checkBoxLabel}
              onCheckChange={setIsRememberMeChecked}
            />
            <Button
              className={styles.loginBTN}
              title={loginBTN}
              type="type-2"
              onClick={handleLogin}
            />
            <TextWithButton
              text={textWithImage.text}
              link={textWithImage.link}
            />
          </div>
        </div>
      </div>
      {widthSize >= 1024 && (
        <div className={styles.loginImage}>
          <Picture
            image={
              "https://pbs.twimg.com/profile_images/2156229262/Logo_square_400x400.png"
            }
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
