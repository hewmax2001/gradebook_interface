import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormData from "form-data";
import {Link, Route, useNavigate} from "react-router-dom";
import AdminMenu from "./AdminMenu";
import LecturerDetail from "./LecturerDetail";

function CreateLecturer(props) {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)

    function firstnameHandler(event) {
        setFirstname(event.target.value);
    }

    function lastnameHandler(event) {
        setLastname(event.target.value);
    }

    function emailHandler(event) {
        setEmail(event.target.value);
    }

    function dobHandler(event) {
        setDob(event.target.value);
    }

    function createLecturer() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        const FormData = require('form-data');
        let data = new FormData();
        data.append('first_name', firstname);
        data.append('last_name', lastname);
        data.append('email', email);
        data.append('dob', dob);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/add_lecturer/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Lecturer successfully created")
                navigate("/lecturer_detail", {state:{lecturerID: response.data.id}})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (firstname === "" || lastname === "" || email === "" || dob === "") {
            return false
        }
        return true
    }

    return (
        <div>
            <Link to={"/lecturers_list"}><button>Return</button></Link>
            <p>Firstname: <input onChange={firstnameHandler} type={'text'} placeholder={'Firstname'}/></p>
            <p>Lastname: <input onChange={lastnameHandler} type={'text'} placeholder={'Lastname'}/></p>
            <p>Email: <input onChange={emailHandler} type={'text'} placeholder={'Email'}/></p>
            <p>DOB: <input onChange={dobHandler} type={'date'}/></p>
            <button onClick={createLecturer}>Create Lecturer</button>
        </div>
    );
}

export default CreateLecturer;