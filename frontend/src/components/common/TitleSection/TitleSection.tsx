import styles from "./TitleSection.module.scss";
import Text from "../Text/Text";

interface TitleSectionProps {
  title: string;
  subTitle?: string;
  className?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subTitle,
  className,
}) => {
  return (
    <div className={`${styles.titleSectionContainer} ${className}`}>
      <Text styles={styles.title} text={title} />
      {subTitle ? <Text styles={styles.subTitle} text={subTitle} /> : ""}
    </div>
  );
};

export default TitleSection;
