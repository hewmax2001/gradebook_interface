import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function CourseList(props) {
    const [token, setToken] = useState("")
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    function getCourses() {
        if (token) {
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
                    setLoading(false)
                    setCourses(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

     useEffect(() => {
        setToken(localStorage.getItem("token"));
        getCourses()
    }, [token]);

    function deleteCourse(id) {
        let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/courses/' + id + "/",
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    getCourses()
                    alert("Course successfully delete")
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    return (
        <div>
            {
                loading?<p>Loading</p>
                    :
                    <div>
                        <Link to={"/admin_menu"}> <button>Return</button> </Link>
                        <Link to={"/course_create"}><button>Create Course</button></Link>
                        <br/>
                        {courses.map(cor =>
                            <p key={cor.id}>
                                <Link to={"/course_detail"} state={{courseID: cor.id}}>{cor.code} {cor.name}</Link>
                                <Link to={"/course_update"} state={{courseID: cor.id}}><button>Update</button></Link>
                                <button onClick={(key) => deleteCourse(cor.id)}>Delete</button>
                            </p>
                        )}
                    </div>
            }
        </div>
    );
}

export default CourseList;