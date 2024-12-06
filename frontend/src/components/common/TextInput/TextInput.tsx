import styles from "./TextInput.module.scss";

interface TextInputProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onValueChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type,
  value,
  onValueChange,
}) => {
  return (
    <div className={styles.textInputContainer}>
      <label>{label}</label>
      <input
        className={styles.textInput}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
