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
import { useNavigate } from "react-router-dom";
import { API, PAGES } from "../../shared/routes";
import { userToken } from "../../shared/variables";

interface SideBarProps {
  isOpen: boolean;
}
const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State for popup
  const navigate = useNavigate();

  const confirmClearAllTasks = () => {
    setIsPopupOpen(true);
  };
  const handleClearAllTasks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const requestOptions: any = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(API.delete.DELETE_ALL_TASKS, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    window.location.reload();
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
          onClick={() => {
            navigate(`${PAGES.USER_PAGE}`);
          }}
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
