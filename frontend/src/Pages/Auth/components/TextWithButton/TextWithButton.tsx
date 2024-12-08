import { Link } from "react-router-dom";
import Text from "../../../../components/common/Text/Text";
import styles from "./TextWithButton.module.scss";

interface LinkProps {
  text: string;
  url: string;
}
interface TextWithButtonProps {
  text: string;
  link: LinkProps;
}

const TextWithButton: React.FC<TextWithButtonProps> = ({ text, link }) => {
  return (
    <div className={styles.createAccountText}>
      <Text text={text} />
      <Link className={styles.link} to={link.url}>
        {link.text}
      </Link>
    </div>
  );
};

export default TextWithButton;
