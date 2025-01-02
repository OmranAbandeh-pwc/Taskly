import styles from "./Picture.module.scss";

interface PictureProps {
  image: string;
<<<<<<< HEAD
  className?: string;
  alt?: string;
}
const Picture: React.FC<PictureProps> = ({ image, className, alt }) => {
  return (
    <div className={`${styles.imageContainer} ${className && className}`}>
=======
  alt?: string;
}
const Picture: React.FC<PictureProps> = ({ image, alt }) => {
  return (
    <div className={styles.imageContainer}>
>>>>>>> bef383bd9cdb2974c0cb83e853976afd462cd95a
      <img className={styles.image} src={image} alt={alt} />
    </div>
  );
};

export default Picture;
