import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link} from "react-router-dom";

function Students(props) {
    const [token, setToken] = useState("")
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)

    function getStudents() {
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/students/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setStudents(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getStudents()
    }, [token]);

    function deleteStudent(id) {
        let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/detail_student/' + id,
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    getStudents()
                    alert("Student successfully delete")
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
                        <Link to={"/student_create"}><button>Create Student</button></Link>
                        <br/>
                        {students.map(stu =>
                            <p key={stu.id}>
                                <Link to={"/student_detail"} state={{studentID: stu.id}}>{stu.firstname} {stu.lastname}</Link>
                                <Link to={"/student_update"} state={{studentID: stu.id}}><button>Update</button></Link>
                                <button onClick={(key) => deleteStudent(stu.id)}>Delete</button>
                            </p>
                        )}
                    </div>
            }
        </div>
    );
}

export default Students;