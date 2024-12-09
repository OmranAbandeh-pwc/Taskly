import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import TaskDestailsPage from "./Pages/TaskDestailsPage/TaskDestailsPage";
import Header from "./components/Header/Header";
import LoginPage from "./Pages/Auth/LoginPage/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage/SignupPage";
import CreateTaskPage from "./Pages/CreateTaskPage/CreateTaskPage";

function App() {
  const isUser = false;
  return (
    <>
      {isUser ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/details/:id" element={<TaskDestailsPage />} />
            <Route path="/task/create" element={<CreateTaskPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
