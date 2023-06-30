import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import FormData from "form-data";

function StudentUpdate(props) {
    const location = useLocation();
    const studentID = location.state.studentID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [student, setStudent] = useState({})
    const [classes, setClasses] = useState([])
    const [notclasses, setNotClasses] = useState([])

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");

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
        if (localStorage.getItem("token")) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/students/' + studentID + "/",
                headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setStudent(response.data)
                    setFirstname(response.data.firstname)
                    setLastname(response.data.lastname)
                    setEmail(response.data.email)
                    setDob(response.data.dob)
                })
                .catch((error) => {
                    console.log(error);
                });

            // Getting lecturers classes
            getClasses()
            setLoading(false)
        }
    }, [studentID]);

    function getClasses() {
        const FormData1 = require('form-data');
        let data1 = new FormData();
        data1.append('student_id', studentID);

         let config1 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/student_not_classes/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data1
        };

        axios(config1)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setNotClasses(response.data)
            })
            .catch((error) => {
                console.log(error);
            });


        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('student_id', studentID);

         let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/student_classes/',
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


    function updateStudent() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        const FormData = require('form-data');
        let data = new FormData();
        data.append('first_name', firstname);
        data.append('last_name', lastname);
        data.append('email', email);
        data.append('dob', dob);

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/student_update/' + studentID,
            headers: {
                'Authorization': 'token ' + token
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Student successfully updated")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (firstname === "" || lastname === "" || email === "" || dob === "") {
            return false
        }
        return true
    }

    function toggleClass(id) {
        if (!id) {
            //id =
        }
        const FormData = require('form-data');
        let data = new FormData();
        data.append('student_id', studentID);
        data.append("class_id", id)

         let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/student_enrol/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };

        axios(config2)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                getClasses()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Link to={"/students_list"}><button>Return</button></Link>
            {
                loading?<p>Loading</p>
                :
                <div>
                    <p>Firstname: <input onChange={firstnameHandler} type={'text'} value={firstname || ""}/></p>
                    <p>Lastname: <input onChange={lastnameHandler} type={'text'} value={lastname || ""}/></p>
                    <p>Email: <input onChange={emailHandler} type={'text'} value={email || ""}/></p>
                    <p>DOB: <input onChange={dobHandler} type={'date'} value={dob}/></p>
                    <button onClick={updateStudent}>Update</button>
                    <br/>
                    <p>Classes:</p>

                    {classes.map(cla =>
                            <p key={cla.id}>
                                <p>{cla.number}</p>
                                <button onClick={(key) => toggleClass(cla.id)}>UnAssign</button>
                            </p>
                        )}

                    <br/>
                    <p>Assign Class:</p>
                     {notclasses.map(cla =>
                          <p key={cla.id}>
                                <p>{cla.number}</p>
                                <button onClick={(key) => toggleClass(cla.id)}>Assign</button>
                            </p>
                        )}
                </div>
            }
        </div>
    );
}

export default StudentUpdate;