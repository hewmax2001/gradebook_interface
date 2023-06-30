import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import FormData from "form-data";

function LecturerGrade(props) {
    const location = useLocation();
    const classID = location.state.classID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [classObj, setClassObj] = useState({})

    const [lecturer, setLecturer] = useState({})
    const [course, setCourse] = useState({})
    const [semester, setSemester] = useState({})
    const [students, setStudents] = useState([])

    useEffect(() => {

        setToken(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {

            // Class
            let config1 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/classes/' + classID + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config1)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setClassObj(response.data)
                    getLecturer(response.data.lecturer)
                    getCourse(response.data.course)
                    getSemester(response.data.Semester)
                    getStudents()
                })
                .catch((error) => {
                    console.log(error);
                });


        }
    }, [classID]);

    function getLecturer(id) {
         // Lecturer
            let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/lecturers/' + id + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config2)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setLecturer(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    function getCourse(id) {
        // Course
            let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/courses/' + id + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config2)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setCourse(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    function getSemester(id) {
        // Semester
            let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/semesters/' + id + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config2)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setSemester(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    function getStudents() {
        let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/get_class_students/' + classID,
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config2)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setStudents(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    function gradeStudent(id) {
        let grade = document.getElementById("grade" + id).value

        const FormData = require('form-data');
        let data = new FormData();
        data.append('student_id', id);
        data.append('class_id', classID);
        data.append('grade', grade)


        let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/grade_student',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Link to={"/lecturer_menu"}><button>Return</button></Link>
            <p>Class ID: {classObj.id}</p>
            <p>Number: {classObj.number}</p>
            <p>Lecturer: {lecturer.firstname} {lecturer.lastname}</p>
            <p>Course: {course.code} {course.name}</p>
            <p>Semester: {semester.year} {semester.semester}</p>
            <br/>
            <p>Students: </p>
            {students.map(stu =>
                <p key={stu.id}>
                    <p>{stu.firstname} {stu.lastname}</p>
                    <input id={"grade" + stu.id} type={"number"} min={0} max={100} step={1}/>
                    <button onClick={() => gradeStudent(stu.id)}>Submit Grade</button>
                </p>
            )}
        </div>
    );
}

export default LecturerGrade;