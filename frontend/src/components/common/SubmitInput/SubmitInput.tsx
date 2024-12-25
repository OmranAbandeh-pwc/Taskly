import React from "react";
import styles from "./SubmitInput.module.scss";

interface SubmitInputProps {
  title: string;
  className?: string;
}
const SubmitInput: React.FC<SubmitInputProps> = ({ title, className }) => {
  return (
    <input
      className={`${styles.submitBTN} ${className}`}
      type="submit"
      value={title}
    />
  );
};

export default SubmitInput;
