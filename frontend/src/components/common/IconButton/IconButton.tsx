
import styles from "./IconButton.module.scss"
import searchIcon from "../../../resources/icons/search.png"

const IconButton = () => {
  return (
    <div className={styles.button}>
      <img className={styles.buttonIcon} src={searchIcon}/>
    </div>
  )
}

export default IconButton
