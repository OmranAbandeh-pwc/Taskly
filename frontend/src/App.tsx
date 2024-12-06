import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import TaskDestailsPage from "./Pages/TaskDestailsPage/TaskDestailsPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/details/:id" element={<TaskDestailsPage />} />
      </Routes>
    </>
  );
}

export default App;
