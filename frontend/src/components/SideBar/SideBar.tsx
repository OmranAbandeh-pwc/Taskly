import styles from "./SideBar.module.scss";
import Button from "../common/Button/Button";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  cancelText,
  clearAllTaskSidebarBTNTitle,
  confirmClearAllSubTitle,
  confirmText,
  profileSidebarBTNTitle,
  warning,
} from "../../json/static/staticGeneral";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useState } from "react";

interface SideBarProps {
  isOpen: boolean;
}
const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State for popup

  const confirmClearAllTasks = () => {
    setIsPopupOpen(true);
  };
  const handleClearAllTasks = () => {
    console.log("Confirm Clicked");
    setIsPopupOpen(false);
  };

  return (
    <div
      className={`${styles.SidebarContainer} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      <div
        className={`${styles.sidebarBTNContainer} ${
          isOpen ? styles.openContainer : styles.closedContainer
        }`}
      >
        <Button
          title={profileSidebarBTNTitle}
          icon={<FaRegCircleUser />}
          className={styles.sidebarBTN}
          textStyles={styles.sidebarBTNText}
          type="type-1"
          onClick={() => {}}
        />
        <Button
          title={clearAllTaskSidebarBTNTitle}
          icon={<MdOutlineDeleteSweep />}
          className={styles.sidebarBTN}
          textStyles={styles.sidebarBTNText}
          type="type-1"
          onClick={confirmClearAllTasks}
        />
      </div>
      {isPopupOpen && (
        <ConfirmationPopup
          title={warning}
          subTitle={confirmClearAllSubTitle}
          cancelText={cancelText}
          confirmText={confirmText}
          onConfirm={handleClearAllTasks}
          onCancel={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default SideBar;
