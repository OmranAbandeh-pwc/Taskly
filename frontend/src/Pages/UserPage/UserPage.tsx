import { useState } from "react";
import Text from "../../components/common/Text/Text";
import UserInfo from "./components/UserInfo/UserInfo";
import styles from "./UserPage.module.scss";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";

const sidebarActions = ["User Info", "Change Password", "Delete Account"];
const UserPage = () => {
  const [activeAction, setActiveAction] = useState<number>(0);
  return (
    <div className={styles.userPageContainer}>
      <div className={styles.userPageSidebar}>
        <p>sd</p>
        <div className={styles.sidebarActions}>
         
          {sidebarActions.map((title, index) => (
            <div onClick={() => setActiveAction(index)}>
              <Text
                styles={`${styles.sidebarActionTitle} ${
                  activeAction === index && styles.activeTitle
                }`}
                text={title}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.userPageContent}>
        {activeAction === 0 && (
          <UserInfo
            userImageUrl={
              "https://images.unsplash.com/photo-1560674457-12073ed6fae6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D"
            }
            userName={"Omran Abandeh"}
            userEmail={"omran@taskly.com"}
            userBirthday={"Birthday : 2000/07/11"}
          />
        )}
        {activeAction === 1 && <ChangePassword />}
        {activeAction === 2 && <DeleteAccount />}
      </div>
    </div>
  );
};

export default UserPage;
