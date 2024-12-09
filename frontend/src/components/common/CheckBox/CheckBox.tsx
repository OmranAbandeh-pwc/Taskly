import Text from "../Text/Text";
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  label: string;
}
const CheckBox: React.FC<CheckBoxProps> = ({ label }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input className={styles.checkbox} type="checkbox" />
      <Text text={label} />
    </div>
  );
};

export default CheckBox;
