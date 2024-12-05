
import styles from "./SearchBar.module.scss";
import IconButton from "../common/IconButton/IconButton";
import Icon from "../common/Icon/Icon";
import Text from "../common/Text/Text";
import { IoSearchSharp } from "react-icons/io5";


const SearchBar = () => {
  return (
    <div className={styles.searchbarContainer}>
      <IoSearchSharp className={styles.searchIcon} onClick={()=>{console.log("search")}}/>
      <input type="text" className={styles.searchInput} />
      <Icon
        className={styles.userIcon}
        icon={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT36VHh-mjL_Rc8IL60D77dMDPL_fNhosHuag&s"
        }
      />
      <Text styles={styles.userNameLabel} text={"Hello, Omran"} />
    </div>
  );
};

export default SearchBar;
