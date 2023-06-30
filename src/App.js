import logo from './logo.svg';
import './App.css';
import Menu from "./components/Menu";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminMenu from "./components/AdminMenu";
import LecturersList from "./components/LecturersList";
import CreateLecturer from "./components/CreateLecturer";
import LecturerDetail from "./components/LecturerDetail";
import LecturerUpdate from "./components/LecturerUpdate";
import StudentList from "./components/StudentList";
import StudentCreate from "./components/StudentCreate";
import StudentDetail from "./components/StudentDetail";
import StudentUpdate from "./components/StudentUpdate";
import SemesterList from "./components/SemesterList";
import SemesterCreate from "./components/SemesterCreate";
import SemesterDetail from "./components/SemesterDetail";
import SemesterUpdate from "./components/SemesterUpdate";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import CourseCreate from "./components/CourseCreate";
import CourseUpdate from "./components/CourseUpdate";
import ClassUpdate from "./components/ClassUpdate";
import ClassCreate from "./components/ClassCreate";
import React from "react";
import ClassDetail from "./components/ClassDetail";
import ClassList from "./components/ClassList";
import LecturerMenu from "./components/LecturerMenu";
import LecturerGrade from "./components/LecturerGrade";
import StudentMenu from "./components/StudentMenu";
import StudentGrade from "./components/StudentGrade";

function App() {
  return (
    <div className="App">
      <Menu/>
    <Routes>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/admin_menu"} element={<AdminMenu/>}/>
        <Route path={"/lecturer_menu"} element={<LecturerMenu/>}/>
        <Route path={"/lecturer_grade"} element={<LecturerGrade/>}/>
        <Route path={"/student_menu"} element={<StudentMenu/>}/>
        <Route path={"/student_grade"} element={<StudentGrade/>}/>

        <Route path={"/lecturers_list"} element={<LecturersList/>}/>
        <Route path={"/lecturer_detail"} element={<LecturerDetail/>}/>
        <Route path={"/lecturer_create"} element={<CreateLecturer/>}/>
        <Route path={"/lecturer_update"} element={<LecturerUpdate/>}/>

        <Route path={"/students_list"} element={<StudentList/>}/>
        <Route path={"/student_detail"} element={<StudentDetail/>}/>
        <Route path={"/student_create"} element={<StudentCreate/>}/>
        <Route path={"/student_update"} element={<StudentUpdate/>}/>

        <Route path={"/semesters_list"} element={<SemesterList/>}/>
        <Route path={"/semester_detail"} element={<SemesterDetail/>}/>
        <Route path={"/semester_create"} element={<SemesterCreate/>}/>
        <Route path={"/semester_update"} element={<SemesterUpdate/>}/>

        <Route path={"/courses_list"} element={<CourseList/>}/>
        <Route path={"/course_detail"} element={<CourseDetail/>}/>
        <Route path={"/course_create"} element={<CourseCreate/>}/>
        <Route path={"/course_update"} element={<CourseUpdate/>}/>

        <Route path={"/classes_list"} element={<ClassList/>}/>
        <Route path={"/class_detail"} element={<ClassDetail/>}/>
        <Route path={"/class_create"} element={<ClassCreate/>}/>
        <Route path={"/class_update"} element={<ClassUpdate/>}/>
    </Routes>
    </div>
  );
}

export default App;
