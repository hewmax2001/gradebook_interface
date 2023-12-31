import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

function LecturerDetail(props) {
    const location = useLocation();
    const lecturerID = location.state.lecturerID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [lecturer, setLecturer] = useState({})


    useEffect(() => {


        setToken(localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/lecturers/' + lecturerID + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setLecturer(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [lecturerID]);


    return (
        <div>
            <Link to={"/lecturers_list"}><button>Return</button></Link>
            <p>Lecturer ID: {lecturer.id}</p>
            <p>Name: {lecturer.firstname} {lecturer.lastname}</p>
            <p>Email: {lecturer.email}</p>
            <p>DOB: {lecturer.dob}</p>
            <p>User ID: {lecturer.user}</p>
        </div>
    );

}

export default LecturerDetail;