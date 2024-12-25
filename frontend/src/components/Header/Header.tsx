import styles from "./Header.module.scss";
import Icon from "../common/Icon/Icon";
import Text from "../common/Text/Text";
import Drawer from "../common/Drawer/DrawerBox";
import { userToken } from "../../shared/variables";
import { API } from "../../shared/routes";
import { useEffect, useState } from "react";
import { headerWelcomeText } from "../../json/static/staticGeneral";

const Header = () => {
  const [userFirstName, setUserFirstName] = useState<string>("");
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

  return (
    <header className={styles.header}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userIconContainer}>
          <Icon
            className={styles.userIcon}
            icon={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&s"
            }
          />
          <Drawer className={styles.drawerContainer} />
        </div>
        <Text
          styles={styles.userNameLabel}
          text={`${headerWelcomeText}, ${
            userFirstName &&
            userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1)
          }`}
        />
      </div>
    </header>
  );
};

export default Header;
