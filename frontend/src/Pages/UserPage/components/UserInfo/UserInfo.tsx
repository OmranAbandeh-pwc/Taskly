import Picture from "../../../../components/common/Picture/Picture";
import Text from "../../../../components/common/Text/Text";
import { userPageDescription } from "../../../../json/static/staticUserPage";
import styles from "./UserInfo.module.scss";

interface UserInfo {
  userImageUrl: string;
  userName: string;
  userEmail: string;
  userBirthday: string;
}
const UserInfo: React.FC<UserInfo> = ({
  userImageUrl,
  userName,
  userEmail,
  userBirthday,
}) => {
  return (
    <div className={styles.userInfoContainer}>
      <Picture className={styles.userImage} image={userImageUrl} />

      <Text styles={styles.userName} text={userName} />
      <Text styles={styles.userEmail} text={userEmail} />
      <Text styles={styles.userBirthday} text={userBirthday} />

      <Text text={userPageDescription} />
    </div>
  );
};

export default UserInfo;
