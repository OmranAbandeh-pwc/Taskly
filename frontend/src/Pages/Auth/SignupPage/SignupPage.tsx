import { useState } from "react";
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
} from "../../../json/static/staticSignupPage";
import DateInput from "../../../components/common/DateInput/DateInput";
import TitleSection from "../../../components/common/TitleSection/TitleSection";
import Button from "../../../components/common/Button/Button";
import TextWithButton from "../components/TextWithButton/TextWithButton";

const SignupPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");

  const handleSignup = () => {
    console.log("Sginup Clicked");
  };
  return (
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
            value={firstName}
            onValueChange={setFirstName}
            type={"text"}
          />
          <TextInput
            label={secondNameLabel}
            placeholder={secondNamePlaceholder}
            value={secondName}
            onValueChange={setSecondName}
            type={"text"}
          />
          <DateInput
            label={birthdayLabel}
            placeholder={birthdayPlaceholder}
            value={birthday}
            onValueChange={setBirthday}
          />
          <TextInput
            label={userEmailLabel}
            placeholder={userEmailPlaceholder}
            value={userEmail}
            onValueChange={setUserEmail}
            type={"email"}
          />
          <TextInput
            label={userPasswordLabel}
            placeholder={userPasswordPlaceholder}
            value={userPassword}
            onValueChange={setUserPassword}
            type={"password"}
          />
          <TextInput
            label={userConfirmPasswordLabel}
            placeholder={userConfirmPasswordPlaceholder}
            value={userConfirmPassword}
            onValueChange={setUserConfirmPassword}
            type={"password"}
          />
          <Button title={signupBTN} type="type-2" onClick={handleSignup} />
          <TextWithButton
            text={textWithButton.text}
            link={textWithButton.link}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
