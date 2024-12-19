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

  const fetchData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(API.get.GET_CARDS, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setCards(result.tasks);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.homeContainer}>
      <SearchBar />
      <ToolsBar className={styles.toolsBar} />
      {cards ? <TaskCardsSection cards={cards} /> : ""}
    </div>
  );
};

export default Home;
