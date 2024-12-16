import styles from "../styles/InputStyles.module.scss";

interface TextInputProps {
  label: string;
  placeholder: string;
  type: string;
  className?: string;
  value: string;
  errorMessage?: string;
  onValueChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type,
  className,
  value,
  errorMessage,
  onValueChange,
}) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <label>{label}</label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      <span className={styles.errorMessage}>
        {errorMessage && errorMessage}
      </span>
    </div>
  );
};

export default TextInput;
