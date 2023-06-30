import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function SemesterList(props) {
    const [token, setToken] = useState("")
    const [semesters, setSemesters] = useState([])
    const [loading, setLoading] = useState(true)

    function getSemesters() {
        if (token) {
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
                    setLoading(false)
                    setSemesters(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

     useEffect(() => {
        setToken(localStorage.getItem("token"));
        getSemesters()
    }, [token]);

    function deleteSemester(id) {
        let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/semesters/' + id + "/",
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    getSemesters()
                    alert("Semester successfully delete")
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
                        <Link to={"/semester_create"}><button>Create Semester</button></Link>
                        <br/>
                        {semesters.map(sem =>
                            <p key={sem.id}>
                                <Link to={"/semester_detail"} state={{semesterID: sem.id}}>{sem.year} {sem.semester}</Link>
                                <Link to={"/semester_update"} state={{semesterID: sem.id}}><button>Update</button></Link>
                                <button onClick={(key) => deleteSemester(sem.id)}>Delete</button>
                            </p>
                        )}
                    </div>
            }
        </div>
    );
}

export default SemesterList;