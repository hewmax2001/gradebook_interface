import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

function CourseDetail(props) {
    const location = useLocation();
    const courseID = location.state.courseID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState({})

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
                    setLoading(false)
                    setCourse(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [courseID]);

    return (
        <div>
            <Link to={"/courses_list"}><button>Return</button></Link>
            <p>Course ID: {course.id}</p>
            <p>Code: {course.code}</p>
            <p>Name: {course.name}</p>
        </div>
    );
}

export default CourseDetail;