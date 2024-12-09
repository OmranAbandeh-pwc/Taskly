import styles from "./Picture.module.scss";

interface PictureProps {
  image: string;
  alt?: string;
}
const Picture: React.FC<PictureProps> = ({ image, alt }) => {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={image} alt={alt} />
    </div>
  );
};

export default Picture;
