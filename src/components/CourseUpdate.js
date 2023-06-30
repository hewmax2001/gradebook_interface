import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import FormData from "form-data";

function CourseUpdate(props) {
    const location = useLocation();
    const courseID = location.state.courseID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState({})

    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    function codeHandler(event) {
        setCode(event.target.value);
    }

    function nameHandler(event) {
        setName(event.target.value);
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/courses/' + courseID + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setCourse(response.data)
                    setCode(response.data.code)
                    setName(response.data.name)
                })
                .catch((error) => {
                    console.log(error);
                });

            setLoading(false)
        }
    }, [courseID]);

    function updateCourse() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        const FormData = require('form-data');
        let data = new FormData();
        data.append('code', code);
        data.append('name', name);

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/courses/' + courseID + "/",
            headers: {
                'Authorization': 'token ' + token
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Course successfully updated")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (code === "" || course === "") {
            return false
        }
        return true
    }

    return (
        <div>
             <Link to={"/courses_list"}><button>Return</button></Link>
            {
                loading?<p>Loading</p>
                :
                <div>
                    <p>Code:
                        <input onChange={codeHandler} type="text" value={code || ""}/>
                    </p>
                    <p>Semester:
                        <input onChange={nameHandler} type="text" value={name || ""}/>
                    </p>
                    <button onClick={updateCourse}>Update</button>
                </div>
            }
        </div>
    );
}

export default CourseUpdate;