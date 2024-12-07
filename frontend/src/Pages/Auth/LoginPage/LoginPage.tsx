import Button from "../../../components/common/Button/Button";
import Picture from "../../../components/common/Picture/Picture";
import Text from "../../../components/common/Text/Text";
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
  signupText,
  signupLinkTitle,
} from "../../../json/staticLabels";
import { Link } from "react-router-dom";
import CheckBox from "../../../components/common/CheckBox/CheckBox";
import { useState } from "react";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleLogin = () => {
    if (userEmail && userPassword) {
      console.log("User Email : ", userEmail);
      console.log("User Password : ", userPassword);
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.loginContent}>
          <Text styles={styles.title} text={loginHeaderTitle} />
          <Text styles={styles.subTitle} text={loginHeaderSubTitle} />
          <div className={styles.loginTextInputs}>
            <TextInput
              label={loginEmailInputLabel}
              placeholder={loginEmailInputPlaceholder}
              value={userEmail}
              onValueChange={setUserEmail}
              type={"email"}
            />
            <TextInput
              label={loginPasswordInputLabel}
              placeholder={loginPasswordInputPlaceholder}
              value={userPassword}
              onValueChange={setUserPassword}
              type={"password"}
            />
            <CheckBox label={checkBoxLabel} />
            <Button
              className={styles.loginBTN}
              title={loginBTN}
              onClick={handleLogin}
            />
            <div className={styles.createAccountText}>
              <Text text={signupText} />
              <Link className={styles.link} to={"/SignupPage"}>
                {signupLinkTitle}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.loginImage}>
        <Picture
          image={
            "https://pbs.twimg.com/profile_images/2156229262/Logo_square_400x400.png"
          }
        />
      </div>
    </div>
  );
};

export default LoginPage;
