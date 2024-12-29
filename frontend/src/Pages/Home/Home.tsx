import styles from "./Home.module.scss";
import TaskCardsSection from "../../components/TaskCardsSection/TaskCardsSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import ToolsBar from "../../components/ToolsBar/ToolsBar";
import { userToken } from "../../shared/variables";
import { API } from "../../shared/routes";
import { useEffect, useState } from "react";
import { TaskCardProps } from "../../components/TaskCardsSection/TaskCardsSectionTypes";

const Home = () => {
  const [cards, setCards] = useState<TaskCardProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(API.get.GET_CARDS, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setCards(result.tasks);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.homeContainer}>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearchClick={handleSearch}
      />
      <ToolsBar className={styles.toolsBar} />
      {<TaskCardsSection cards={cards ? cards : []} isLoading={isLoading} />}
    </div>
  );
};

export default Home;
