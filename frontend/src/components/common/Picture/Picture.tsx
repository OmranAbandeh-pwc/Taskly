import styles from "./Picture.module.scss";

const Picture: React.FC<any> = ({image}) => {
  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        src={image}
      />
    </div>
  );
};

export default Picture;
