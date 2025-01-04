import styles from "./Home.module.scss";
import TaskCardsSection from "../../components/TaskCardsSection/TaskCardsSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import ToolsBar from "../../components/ToolsBar/ToolsBar";
import { userToken } from "../../shared/variables";
import { API } from "../../shared/routes";
import { useEffect, useState } from "react";
import { TaskCardProps } from "../../components/TaskCardsSection/TaskCardsSectionTypes";
import { filterButtons } from "../../json/filtersStatic";
import {
  noTasksText,
  searchbarPlaceholder,
} from "../../json/static/staticGeneral";
import SideBar from "../../components/SideBar/SideBar";

const Home = () => {
  const [cards, setCards] = useState<TaskCardProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>(
    filterButtons[0].value
  );
  const [noTasksFoundText, setNoTasksFoundText] = useState(noTasksText);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`${API.get.GET_CARDS_FILTER}${activeButton}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setCards(result.tasks);
        } else {
          setCards([]);
          setNoTasksFoundText(result.message);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeButton]);

  const handleSearch = () => {
    setIsLoading(true);
    if (searchQuery === "") {
      fetchData();
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${API.post.SEARCH_TASK}${searchQuery}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            setCards([]);
            setCards(result.tasks);
          } else if (result.status === 404) {
            setCards([]);
            setNoTasksFoundText(result.message);
          } else {
            setCards([]);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
    setIsLoading(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar
  };

  return (
    <div className={styles.homeContainer}>
      <SearchBar
        value={searchQuery}
        placeholder={searchbarPlaceholder}
        onChange={setSearchQuery}
        onSearchClick={handleSearch}
      />

      <div className={styles.homeBodyContainer}>
        <SideBar isOpen={isSidebarOpen} />

        <div className={styles.rightSideContainer}>
          <ToolsBar
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            className={styles.toolsBar}
            moreOptionButton={toggleSidebar}
          />
          <TaskCardsSection
            cards={cards ? cards : []}
            isLoading={isLoading}
            noTasksFoundText={noTasksFoundText}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
