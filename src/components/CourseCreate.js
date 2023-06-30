import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import FormData from "form-data";
import axios from "axios";

function CourseCreate(props) {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)

    function codeHandler(event) {
        setCode(event.target.value);
    }

    function nameHandler(event) {
        setName(event.target.value);
    }

    function createCourse() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        const FormData = require('form-data');
        let data = new FormData();
        data.append('code', code);
        data.append('name', name);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/courses/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Course successfully created")
                navigate("/course_detail", {state:{courseID: response.data.id}})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (code === "" || name === "") {
            return false
        }
        return true
    }
    return (
        <div>
            <Link to={"/courses_list"}><button>Return</button></Link>
            <p>Code: <input onChange={codeHandler} type={'text'} placeholder={'Code'}/></p>
            <p>Name: <input onChange={nameHandler} type={'text'} placeholder={'Name'}/></p>
            <button onClick={createCourse}>Create Course</button>
        </div>
    );
}

export default CourseCreate;