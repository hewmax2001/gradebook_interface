import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import FormData from "form-data";
import axios from "axios";

function ClassCreate(props) {
    const navigate = useNavigate();
    const [number, setNumber] = useState("");
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)

    const [lecturers, setLecturers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);

    function numberHandler(event) {
        setNumber(event.target.value);
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (token) {
            getLecturers()
            getCourses()
            getSemesters()
        }
    }, [token]);

    function getLecturers() {
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
    }

    function getCourses() {
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
    }

    function getSemesters() {
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
    }


    function createClass() {
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
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/classes/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Class successfully created")
                navigate("/class_detail", {state:{classID: response.data.id}})
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
            <p>Number: <input onChange={numberHandler} type={'number'}/></p>
            <p>Lecturer:</p>
                    <select id={"add_lecturer"}>
                        {
                        lecturers.map(cla =>
                            <option key={cla.id}>{cla.firstname} {cla.lastname}</option>
                        )
                        }
                    </select>
            <p>Course:</p>
                    <select id={"add_course"}>
                        {
                        courses.map(cla =>
                            <option key={cla.id}>{cla.code} {cla.name}</option>
                        )
                        }
                    </select>
            <p>Semester:</p>
                    <select id={"add_semester"}>
                        {
                        semesters.map(cla =>
                            <option key={cla.id}>{cla.year} {cla.semester}</option>
                        )
                        }
                    </select>
            <button onClick={createClass}>Create Class</button>
        </div>
    );
}

export default ClassCreate;