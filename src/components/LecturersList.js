import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link} from "react-router-dom";

function Lecturers(props) {
    const [token, setToken] = useState("")
    const [lecturers, setLecturers] = useState([])
    const [loading, setLoading] = useState(true)

    function getLecturers() {
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/lecturers/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setLecturers(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getLecturers()
    }, [token]);

    function createLecturer() {
        window.location.href="/lecturer_create"
    }

    function deleteLecturer(id) {
        let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/detail_lecturer/' + id,
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    getLecturers()
                    alert("Lecturer successfully delete")
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
                        <button onClick={createLecturer}>Create Lecturer</button>
                        <br/>
                        {lecturers.map(lec =>
                            <p key={lec.id}>
                                <Link to={"/lecturer_detail"} state={{lecturerID: lec.id}}>{lec.firstname} {lec.lastname}</Link>
                                <Link to={"/lecturer_update"} state={{lecturerID: lec.id}}><button>Update</button></Link>
                                <button onClick={(key) => deleteLecturer(lec.id)}>Delete</button>
                            </p>
                        )}
                    </div>
            }
        </div>
    );
}

export default Lecturers;