import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";
import FormData from "form-data";

function StudentDetail(props) {
    const location = useLocation();
    const studentID = location.state.studentID;
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)
    const [student, setStudent] = useState({})
    const [classes, setClasses] = useState([])


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
                    setLoading(false)
                    setStudent(response.data)
                    getClasses()
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [studentID]);

    function getClasses() {
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

    function emailGrades(classID) {
        const FormData2 = require('form-data');
        let data = new FormData();
        data.append('student_id', studentID);
        data.append("class_id", classID);

         let config2 = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/email_grades/',
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
            <Link to={"/students_list"}><button>Return</button></Link>
            <p>Student ID: {student.id}</p>
            <p>Name: {student.firstname} {student.lastname}</p>
            <p>Email: {student.email}</p>
            <p>DOB: {student.dob}</p>
            <p>User ID: {student.user}</p>
            <br/>
            <p>Classes:</p>
            {classes.map(cla =>
                                <p key={cla.id}>
                                    <p>{cla.number}</p>
                                    <button onClick={() => emailGrades(cla.id)}>Email grades</button>
                                </p>
                            )}
        </div>
    );

}

export default StudentDetail;