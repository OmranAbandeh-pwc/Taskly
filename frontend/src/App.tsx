import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import TaskDestailsPage from './Pages/TaskDestailsPage/TaskDestailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/task/details" element={<TaskDestailsPage />}/>
    </Routes>
  );
}

export default App;
