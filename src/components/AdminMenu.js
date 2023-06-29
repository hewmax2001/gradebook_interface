import React, {useEffect, useState} from 'react';
import axios from "axios"

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

    function lecturers() {
        window.location.href='/lecturers_list'
    }

    function students() {

    }


    return (
        <div>
            {
                loading?<p>Loading</p>
                    :
                    <div>
                        <button onClick={lecturers}>Lecturers</button>
                        <button>Students</button>
                        <button>Courses</button>
                        <button>Semesters</button>
                        <button>Classes</button>
                    </div>
            }
        </div>
    );
}

export default AdminMenu;