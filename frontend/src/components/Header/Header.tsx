import styles from "./Header.module.scss";
import Icon from "../common/Icon/Icon";
import Text from "../common/Text/Text";

const Header = () => {
  
  return (
    <header className={styles.header}>
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
