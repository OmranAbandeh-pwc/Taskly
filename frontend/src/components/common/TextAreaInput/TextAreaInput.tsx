import styles from "../styles/InputStyles.module.scss";

interface TextAreaInputProps {
  label: string;
  placeholder: string;
  value: string;
  className?: string;
  onValueChange: (value: string) => void;
  rows?: number; // Optional: Number of rows in the textarea
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  placeholder,
  value,
  className,
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
    </div>
  );
};

export default TextAreaInput;
