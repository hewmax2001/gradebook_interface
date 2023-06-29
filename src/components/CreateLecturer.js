import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormData from "form-data";

function CreateLecturer(props) {
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
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);

    function createLecturer() {
        const FormData = require('form-data');
        let data = new FormData();
        data.append('first_name', firstname);
        data.append('last_name', lastname);
        data.append('email', email);
        data.append('dob', dob);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/add_lecturer/',
            headers: {
                'Authorization': 'token ' + token
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <p>Firstname: <input onChange={firstnameHandler} type={'text'} placeholder={'Firstname'}/></p>
            <p>Lastname: <input onChange={lastnameHandler} type={'text'} placeholder={'Fastname'}/></p>
            <p>Email: <input onChange={emailHandler} type={'text'} placeholder={'Email'}/></p>
            <p>DOB: <input onChange={dobHandler} type={'date'}/></p>
            <button onClick={createLecturer}>Create</button>
        </div>
    );
}

export default CreateLecturer;