import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import TaskDestailsPage from "./Pages/TaskDestailsPage/TaskDestailsPage";
import Header from "./components/Header/Header";
import LoginPage from "./Pages/Auth/LoginPage/LoginPage";
import SignupPage from "./Pages/Auth/SignupPage/SignupPage";
import CreateTaskPage from "./Pages/CreateTaskPage/CreateTaskPage";
import { userToken } from "./shared/variables";
import TaskEditPage from "./Pages/TaskEditPage/TaskEditPage";
import { PAGES } from "./shared/routes";

function App() {
  return (
    <>
      {userToken ? (
        <>
          <Header />
          <Routes>
            <Route path={PAGES.INITIAL_PAGE} element={<Home />} />
            <Route
              path={`${PAGES.TASK_DETAILS_PAGE}/:id`}
              element={<TaskDestailsPage />}
            />
            <Route path={PAGES.CREATE_TASK_PAGE} element={<CreateTaskPage />} />
            <Route
              path={`${PAGES.TASK_EDIT_PAGE}/:id`}
              element={<TaskEditPage />}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path={PAGES.INITIAL_PAGE} element={<LoginPage />} />
          <Route path={PAGES.SIGNUP_PAGE} element={<SignupPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
