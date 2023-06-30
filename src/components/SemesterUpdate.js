import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import FormData from "form-data";

function SemesterUpdate(props) {
    const location = useLocation();
    const semesterID = location.state.semesterID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [semester, setSemester] = useState({})
    const [courses, setCourses] = useState([])
    const [notcourses, setNotcourses] = useState([])

    const [year, setYear] = useState("");
    const [sem, setSem] = useState("");

    function yearHandler(event) {
        setYear(event.target.value);
    }

    function semesterHandler(event) {
        setSem(event.target.value);
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/semesters/' + semesterID + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setSemester(response.data)
                    setYear(response.data.year)
                    setSem(response.data.semester)
                })
                .catch((error) => {
                    console.log(error);
                });

            // Getting lecturers classes
            getCourses()
            setLoading(false)
        }
    }, [semesterID]);

    function getCourses() {
        const FormData1 = require('form-data');
        let data1 = new FormData();
        data1.append('semester_id', semesterID);

         let config1 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/semester_not_courses/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data1
        };

        axios(config1)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setNotcourses(response.data)
            })
            .catch((error) => {
                console.log(error);
            });


        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('semester_id', semesterID);

         let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/semester_courses/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log(response.data)
                setCourses(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateSemester() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        const FormData = require('form-data');
        let data = new FormData();
        data.append('year', year);
        data.append('semester', sem);
        data.append('courses', courses);

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/semesters/' + semesterID + "/",
            headers: {
                'Authorization': 'token ' + token
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Semester successfully updated")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (year === "" || semester === "") {
            return false
        }
        return true
    }

    function toggleCourse(id) {

        const FormData = require('form-data');
        let data = new FormData();
        data.append('semester_id', semesterID);
        data.append("course_id", id)

         let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/semester_toggle_course/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                getCourses()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function addCourse() {
        let temp_id = document.getElementById("add_course").selectedIndex;
        console.log(notcourses[temp_id].id)
        let id = notcourses[temp_id].id
        toggleCourse(id);
    }

    return (
        <div>
            <Link to={"/semesters_list"}><button>Return</button></Link>
            {
                loading?<p>Loading</p>
                :
                <div>
                    <p>Year:
                        <input onChange={yearHandler} type="number" min="2023" max="2099" step="1" value={year || ""}/>
                    </p>
                    <p>Semester:
                        <select onChange={semesterHandler} value={sem || ""}>
                            <option>S1</option>
                            <option>S2</option>
                        </select>
                    </p>
                    <button onClick={updateSemester}>Update</button>
                    <br/>
                    <p>Courses:</p>

                    {courses.map(cla =>
                            <p key={cla.id}>
                                <p>{cla.code} {cla.name}</p>
                                <button onClick={(key) => toggleCourse(cla.id)}>Remove</button>
                            </p>
                        )}

                    <br/>
                    <p>Add Course:</p>
                    <select id={"add_course"}>
                        {
                        notcourses.map(cla =>
                            <option key={cla.id}>{cla.code} {cla.name}</option>
                        )
                        }
                    </select>
                    <button onClick={addCourse}>Add</button>
                     {/*{notcourses.map(cla =>
                          <p key={cla.id}>
                                <p>{cla.code} {cla.name}</p>
                                <button onClick={(key) => toggleClass(cla.id)}>Assign</button>
                            </p>
                        )}*/}
                </div>
            }
        </div>
    );
}

export default SemesterUpdate;