import styles from "../styles/InputStyles.module.scss";

interface TextAreaInputProps {
  label: string;
  placeholder: string;
  value: string;
  className?: string;
  errorMessage?: string;
  onValueChange: (value: string) => void;
  rows?: number; // Optional: Number of rows in the textarea
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  placeholder,
  value,
  className,
  errorMessage,
  onValueChange,
  rows = 4, // Default rows set to 4
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <label>{label}</label>
      <textarea
        className={styles.input}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={(e) => onValueChange(e.target.value)}
      />
      <span className={styles.errorMessage}>
        {errorMessage && errorMessage}
      </span>
    </div>
  );
};

export default TextAreaInput;
