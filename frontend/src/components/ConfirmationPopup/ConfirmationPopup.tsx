import styles from "./ConfirmationPopup.module.scss";

interface ConfirmationPopupProps {
  title: string;
  subTitle: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  title,
  subTitle,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <h2 className={styles.popupTitle}>{title}</h2>
        <p className={styles.popupSubtitle}>{subTitle}</p>
        <div className={styles.popupActions}>
          <button
            className={`${styles.popupButton} ${styles.cancel}`}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`${styles.popupButton} ${styles.confirm}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
