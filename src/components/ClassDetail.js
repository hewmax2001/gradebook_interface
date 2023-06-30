import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

function ClassDetail(props) {
    const location = useLocation();
    const classID = location.state.classID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [classObj, setClassObj] = useState({})

    const [lecturer, setLecturer] = useState({})
    const [course, setCourse] = useState({})
    const [semester, setSemester] = useState({})

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

    return (
        <div>
            <Link to={"/classes_list"}><button>Return</button></Link>
            <p>Class ID: {classObj.id}</p>
            <p>Number: {classObj.number}</p>
            <p>Lecturer: {lecturer.firstname} {lecturer.lastname}</p>
            <p>Course: {course.code} {course.name}</p>
            <p>Semester: {semester.year} {semester.semester}</p>
        </div>
    );
}

export default ClassDetail;