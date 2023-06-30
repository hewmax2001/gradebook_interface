import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link, Navigate} from "react-router-dom";

function AdminMenu(props) {
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/get_user_type/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    if (response.data == "admin") {
                        setLoading(false)
                    }
                    else {
                        alert("You are not authorized")
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);




    return (
        <div>
            {
                loading?<p>Loading</p>
                    :
                    <div>
                        <Link to={"/lecturers_list"}><button>Lecturers</button></Link>
                        <Link to={"/students_list"}><button>Students</button></Link>
                        <Link to={"/courses_list"}><button>Courses</button></Link>
                        <Link to={"/semesters_list"}><button>Semesters</button></Link>
                        <Link to={"/classes_list"}><button>Classes</button></Link>
                    </div>
            }
        </div>
    );
}

export default AdminMenu;