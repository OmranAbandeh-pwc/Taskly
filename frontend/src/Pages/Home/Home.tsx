import styles from "./Home.module.scss"
import TaskCardsSection from '../../components/TaskCardsSection/TaskCardsSection'
import SearchBar from '../../components/SearchBar/SearchBar'
import { cards } from "../../json/data";
import ToolsBar from "../../components/ToolsBar/ToolsBar";

const Home = () => {
  return (
    <div className={styles.container}>
      <SearchBar/>
      <ToolsBar/>
      <TaskCardsSection cards={cards}/>
    </div>
  )
}

export default Home
