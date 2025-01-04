import styles from "./SearchBar.module.scss";
import { IoSearchSharp } from "react-icons/io5";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onChange,
  onSearchClick,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchClick(); // Trigger the search click handler
    }
  };

  return (
    <div className={styles.searchbarContainer}>
      <IoSearchSharp className={styles.searchIcon} onClick={onSearchClick} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
