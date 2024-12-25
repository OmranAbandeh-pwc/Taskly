import { PAGES } from "../../shared/routes";

const signupHeaderTitle = "Welcome to Signup Page";
const signupHeaderSubTitle =
  "Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang kamu cita-citata sejak dalam embrio!";
const firstNameLabel = "Enter your first name";
const firstNamePlaceholder = "Enter your first name";
const secondNameLabel = "Enter your second name";
const secondNamePlaceholder = "Enter your second name";
const birthdayLabel = "Enter your birthday";
const birthdayPlaceholder = "DD/MM/YYYY";
const userEmailLabel = "Write your email";
const userEmailPlaceholder = "omran.abandeh@taskly.com";
const userPasswordLabel = "Write your password";
const userPasswordPlaceholder = "*********";
const userConfirmPasswordLabel = "Confirm your password";
const userConfirmPasswordPlaceholder = "*********";
const signupBTN = "Signup";
const textWithButton = {
  text: "if you already have an account please",
  link: { text: "Login", url: PAGES.INITIAL_PAGE },
};
const emptyFieldText = "Please don't leave this field empty";
const invalidEmail = "Invalid email";
const passwordStrengthText = "Password must be at least 6 characters";

export {
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
};
