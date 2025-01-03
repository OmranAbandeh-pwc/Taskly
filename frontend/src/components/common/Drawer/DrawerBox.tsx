import { PAGES } from "../../../shared/routes";
import styles from "./DrawerBox.module.scss";

const DrawerBox: React.FC<any> = ({ className,handleLogout }) => {

  return (
    <div className={`${styles.drawerContainer} ${className}`}>
      <div className={styles.drawer} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default DrawerBox;
