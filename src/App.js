import logo from './logo.svg';
import './App.css';
import Menu from "./components/Menu";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminMenu from "./components/AdminMenu";
import LecturersList from "./components/LecturersList";
import CreateLecturer from "./components/CreateLecturer";

function App() {
  return (
    <div className="App">
      <Menu/>
    <Routes>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/admin_menu"} element={<AdminMenu/>}/>
        <Route path={"/lecturers_list"} element={<LecturersList/>}/>
        <Route path={"/lecturer_create"} element={<CreateLecturer/>}/>
    </Routes>
    </div>
  );
}

export default App;
