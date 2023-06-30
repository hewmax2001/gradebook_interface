import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import FormData from "form-data";

function ClassUpdate(props) {
    const location = useLocation();
    const classID = location.state.classID;
    const navigate = useNavigate();
    const [number, setNumber] = useState("");
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [classObj, setClassObj] = useState({})
    const [lecturer, setLecturer] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("")

    const [lecturers, setLecturers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);

    function numberHandler(event) {
        setNumber(event.target.value);
    }

    function lecturerHandler(event) {
        setLecturer(event.target.value)
    }

    function courseHandler(event) {
        setCourse(event.target.value)
    }

    function semesterHandler(event) {
        setSemester(event.target.value)
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/classes/' + classID + '/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setClassObj(response.data)
                    setNumber(response.data.number)
                    getLecturers(response.data.lecturer)
                    getCourses(response.data.course)
                    getSemesters(response.data.Semester)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, [token]);

    function getLecturers(id) {
        // All lecturers
        let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/lecturers/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLecturers(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

        // Class' lecturer
        let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/lecturers/' + id + '/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLecturer(response.data.firstname + " " + response.data.lastname)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getCourses(id) {
        let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/courses/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCourses(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

        let config2 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/courses/' + id +'/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCourse(response.data.code + " " + response.data.name)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getSemesters(id) {
        let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/semesters/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSemesters(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

        let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/semesters/' + id + '/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSemester(response.data.year + " " + response.data.semester)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function updateClass() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        let lecturerID = getLecturerID()
        let courseID = getCourseID()
        let semesterID = getSemestersID()

        const FormData = require('form-data');
        let data = new FormData();
        data.append('number', number);

        data.append('lecturer', lecturerID);
        data.append('course', courseID);
        data.append('Semester', semesterID);

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/classes/' + classID + '/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Class successfully updated")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (number === "") {
            return false
        }
        return true
    }

    function getLecturerID() {
        let temp_id = document.getElementById("add_lecturer").selectedIndex;
        return lecturers[temp_id].id
    }

    function getCourseID() {
        let temp_id = document.getElementById("add_course").selectedIndex;
        return courses[temp_id].id
    }

    function getSemestersID() {
        let temp_id = document.getElementById("add_semester").selectedIndex;
        return semesters[temp_id].id
    }

    return (
        <div>
            <Link to={"/classes_list"}><button>Return</button></Link>
            <p>Number: <input onChange={numberHandler} type={'number'} value={number || ""}/></p>
            <p>Lecturer:</p>
                    <select id={"add_lecturer"} onChange={lecturerHandler} value={lecturer || ""}>
                        {
                        lecturers.map(cla =>
                            <option key={cla.id}>{cla.firstname} {cla.lastname}</option>
                        )
                        }
                    </select>
            <p>Course:</p>
                    <select id={"add_course"} onChange={courseHandler} value={course || ""}>
                        {
                        courses.map(cla =>
                            <option key={cla.id}>{cla.code} {cla.name}</option>
                        )
                        }
                    </select>
            <p>Semester:</p>
                    <select id={"add_semester"} onChange={semesterHandler} value={semester || ""}>
                        {
                        semesters.map(cla =>
                            <option key={cla.id}>{cla.year} {cla.semester}</option>
                        )
                        }
                    </select>
            <button onClick={updateClass}>Update Class</button>
        </div>
    );
}

export default ClassUpdate;