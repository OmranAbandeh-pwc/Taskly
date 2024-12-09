import styles from "../styles/InputStyles.module.scss";

interface TextInputProps {
  label: string;
  placeholder: string;
  type: string;
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type,
  className,
  value,
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
    </div>
  );
};

export default TextInput;
