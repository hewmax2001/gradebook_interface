import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import FormData from "form-data";

function LecturerMenu(props) {
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [classes, setClasses] = useState([])

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
                    if (response.data == "lecturer") {
                        getLecturer()
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

    function getLecturer() {
        let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/get_current_lecturer/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    getClasses(response.data.id)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    function getClasses(id) {

        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('lecturer_id', id);

         let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/lecturer_classes/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                console.log(response.data)
                setClasses(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div>
            {
                loading?<p>Loading</p>
                    :
                    <div>
                        <p>Lecturer Menu</p>
                        <p>Classes:</p>
                        {classes.map(cla =>
                                <p key={cla.id}>
                                    <Link to={"/lecturer_grade"} state={{classID: cla.id}}><p>{cla.number}</p></Link>
                                </p>
                            )}
                    </div>
            }
            </div>
        </div>
    );
}

export default LecturerMenu;