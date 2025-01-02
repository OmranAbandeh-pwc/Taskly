import styles from "./Picture.module.scss";

interface PictureProps {
  image: string;
  className?: string;
  alt?: string;
}
const Picture: React.FC<PictureProps> = ({ image, className, alt }) => {
  return (
    <div className={`${styles.imageContainer} ${className && className}`}>
      <img className={styles.image} src={image} alt={alt} />
    </div>
  );
};

export default Picture;
