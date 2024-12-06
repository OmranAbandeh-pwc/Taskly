import styles from "./Header.module.scss";
import Icon from "../common/Icon/Icon";
import Text from "../common/Text/Text";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useResize } from "../../hooks/useResize";

const Header = () => {
  const { isMobile } = useResize();
  return (
    <header className={styles.header}>
      {isMobile ? (
        <IoMenu className={styles.sidebarIcon} onClick={() => {}} />
      ) : (
        <BsLayoutSidebarInset
          className={styles.sidebarIcon}
          onClick={() => {}}
        />
      )}

      <div className={styles.userInfoContainer}>
        <Icon
          className={styles.userIcon}
          icon={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&s"
          }
        />
        <Text styles={styles.userNameLabel} text={"Hello, Omran"} />
      </div>
    </header>
  );
};

export default Header;
