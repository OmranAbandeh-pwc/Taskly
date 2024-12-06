
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
    </div>
  );
};

export default SearchBar;
