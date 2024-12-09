import { useState } from "react";
import Text from "../Text/Text";
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  label: string;
  onCheckChange: (isChecked: boolean) => void;
}
const CheckBox: React.FC<CheckBoxProps> = ({ label, onCheckChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (onCheckChange) {
      onCheckChange(checked); // تمرير القيمة للـprop إذا كانت موجودة
    }
  };

  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <Text text={label} />
    </div>
  );
};

export default CheckBox;
