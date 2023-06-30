import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function ClassList(props) {
    const [token, setToken] = useState("")
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)

    function getClasses() {
        if (token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/classes/',
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    setClasses(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

     useEffect(() => {
        setToken(localStorage.getItem("token"));
        getClasses()
    }, [token]);

    function deleteClasses(id) {
        let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/classes/' + id + "/",
                headers: {
                    'Authorization': 'token ' + token
                }
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setLoading(false)
                    getClasses()
                    alert("Class successfully delete")
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
                        <Link to={"/admin_menu"}><button>Return</button> </Link>
                        <Link to={"/class_create"}><button>Create Class</button></Link>
                        <br/>
                        {classes.map(cla =>
                            <p key={cla.id}>
                                <Link to={"/class_detail"} state={{classID: cla.id}}>{cla.number}</Link>
                                <Link to={"/class_update"} state={{classID: cla.id}}><button>Update</button></Link>
                                <button onClick={(key) => deleteClasses(cla.id)}>Delete</button>
                            </p>
                        )}
                    </div>
            }
        </div>
    );
}

export default ClassList;