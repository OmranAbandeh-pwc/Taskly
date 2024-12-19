import styles from "./DrawerBox.module.scss";

const DrawerBox: React.FC<any> = ({ className }) => {
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
    window.location.href = "/";
  };
  return (
    <div className={`${styles.drawerContainer} ${className}`}>
      <div className={styles.drawer} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default DrawerBox;
