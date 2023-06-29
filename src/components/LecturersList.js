import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link} from "react-router-dom";

function Lecturers(props) {
    const [token, setToken] = useState("")
    const [lecturers, setLecturers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setToken(localStorage.getItem("token"));
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
    }, [token]);

    function createLecturer() {
        window.location.href="/lecturer_create"
    }

    function deleteLecturer(id) {
        alert(id)
    }


    return (
        <div>
            {
                loading?<p>Loading</p>
                    :
                    <div>
                        <button>Return</button>
                        <button onClick={createLecturer}>Create Lecturer</button>
                        <br/>
                        {lecturers.map(lec =>
                            <p key={lec.id}>
                                <Link to={"/lecturers/" + lec.id}>{lec.firstname} {lec.lastname}</Link>
                                <button>Update</button>
                                <button onClick={(key) => deleteLecturer(lec.id)}>Delete</button>
                            </p>
                        )}
                    </div>
            }
        </div>
    );
}

export default Lecturers;