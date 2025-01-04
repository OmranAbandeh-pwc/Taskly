import styles from "./Header.module.scss";
import Icon from "../common/Icon/Icon";
import Text from "../common/Text/Text";
import Drawer from "../common/Drawer/DrawerBox";
import { userToken } from "../../shared/variables";
import { API, PAGES } from "../../shared/routes";
import { useEffect, useState } from "react";
import {
  cancelText,
  confirmLogoutMessage,
  confirmText,
  headerWelcomeText,
  warning,
} from "../../json/static/staticGeneral";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { Link } from "react-router-dom";
import TasklyLogo from "../../resources/icons/TasklyLogo.png"

const Header = () => {
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State for popup

  const fetchUserAPI = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(API.get.GET_USERS_DETAILS, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setUserFirstName(result.user[0].firstName);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchUserAPI();
  }, []);

  const confirmLogout = () => {
    setIsPopupOpen(true);
  };
  const handleLogout = () => {
    setIsPopupOpen(false);
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
    window.location.href = PAGES.INITIAL_PAGE;
  };

  return (
    <header className={styles.header}>
      <Link to={PAGES.INITIAL_PAGE}>
        <Icon
          className={styles.tasklyLogo}
          icon={TasklyLogo}
        />
      </Link>
      <div className={styles.userInfoContainer}>
        <div className={styles.userIconContainer}>
          <Icon
            className={styles.userIcon}
            icon={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&s"
            }
          />
          <Drawer
            className={styles.drawerContainer}
            handleLogout={confirmLogout}
          />
        </div>
        <Text
          styles={styles.userNameLabel}
          text={`${headerWelcomeText}, ${
            userFirstName &&
            userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1)
          }`}
        />
      </div>
      {isPopupOpen && (
        <ConfirmationPopup
          title={warning}
          subTitle={confirmLogoutMessage}
          cancelText={cancelText}
          confirmText={confirmText}
          onConfirm={handleLogout}
          onCancel={() => setIsPopupOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
