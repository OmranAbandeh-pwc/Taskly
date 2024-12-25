import { PAGES } from "../../shared/routes";

const loginHeaderTitle = "Welcome To Taskly";
const loginHeaderSubTitle =
  "Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang kamu cita-citata sejak dalam embrio!";
const loginEmailInputLabel = "Email";
const loginEmailInputPlaceholder = "omran.abandeh@taskly.com";
const loginPasswordInputLabel = "Password";
const loginPasswordInputPlaceholder = "********";
const checkBoxLabel = "Stay in after login";
const loginBTN = "Login";
const textWithImage = {
  text: "You can create a new account and",
  link: { text: "Signup", url: PAGES.SIGNUP_PAGE },
};
const emptyFieldText = "Please don't leave this field empty";
const minPassText = "Password must be at least 6 characters";
const invalidEmailText = "Invalid email";

export {
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
  minPassText,
  invalidEmailText,
};
