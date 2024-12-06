import Text from "../Text/Text";
import styles from "./CheckBox.module.scss";

const CheckBox: React.FC<any> = ({label}) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type="checkbox"
      />
      <Text text={label}/>
    </div>
  );
};

export default CheckBox;
