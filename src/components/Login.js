import React, {useEffect, useState} from 'react';
import axios from "axios"

function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (token) {
            logout()
        }
    }, [token]);

    function usernameHandler(event) {
        setUsername(event.target.value);
    }

    function passwordHandler(event) {
        setPassword(event.target.value);
    }

    function login() {
        const FormData = require('form-data');
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/auth/',
            headers: {},
            data: data
        };


        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token);

                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'http://127.0.0.1:8000/api/get_user_type/',
                    headers: {
                        'Authorization': 'token ' + localStorage.getItem("token")
                    }
                };

                axios(config)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        if (response.data == "admin") {
                            alert("you have logged in")
                            window.location.replace("/admin_menu")
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function logout() {
        localStorage.removeItem("token");
    }

    return (
        <div>
            {
                <div>
                    <p>Username: <input onChange={usernameHandler} type={'text'} placeholder={'username'}/></p>
                    <p>Password: <input onChange={passwordHandler} type={'password'}/></p>
                    <button onClick={login}>Login</button>
                </div>
            }
        </div>
    );
}

export default Login;