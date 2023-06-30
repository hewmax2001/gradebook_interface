import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

function SemesterDetail(props) {
    const location = useLocation();
    const semesterID = location.state.semesterID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [semester, setSemester] = useState({})

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
                    setLoading(false)
                    setSemester(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [semesterID]);

    return (
        <div>
            <Link to={"/semesters_list"}><button>Return</button></Link>
            <p>Semester ID: {semester.id}</p>
            <p>Year: {semester.year}</p>
            <p>Semester: {semester.semester}</p>
        </div>
    );
}

export default SemesterDetail;