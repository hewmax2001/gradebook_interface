import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import FormData from "form-data";
import axios from "axios";

function SemesterCreate(props) {
    const navigate = useNavigate();
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true)

    function yearHandler(event) {
        setYear(event.target.value);
    }

    function semesterHandler(event) {
        setSemester(event.target.value);
    }

     function createSemester() {
        if (!validation()) {
            alert("All fields must be filled!")
            return
        }

        const FormData = require('form-data');
        let data = new FormData();
        data.append('year', year);
        data.append('semester', semester);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/semesters/',
            headers: {
                'Authorization': 'token ' + localStorage.getItem("token")
            },
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Semester successfully created")
                navigate("/semester_detail", {state:{semesterID: response.data.id}})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function validation() {
        if (year === "" || semester === "") {
            return false
        }
        return true
    }


    return (
        <div>
            <Link to={"/semesters_list"}><button>Return</button></Link>
            <p>Year:
                <input onChange={yearHandler} type="number" min="2023" max="2099" step="1"/>
            </p>
            <p>Semester:
                <select onChange={semesterHandler}>
                    <option>S1</option>
                    <option>S2</option>
                </select>
            </p>
            <button onClick={createSemester}>Create Semester</button>
        </div>
    );
}

export default SemesterCreate;