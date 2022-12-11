import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import { Navigate, useNavigate } from 'react-router-dom';

import { API_URL } from '../constants';

export var isLoggedIn = '';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // var isLoggedIn = '';

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        var nlink = `${API_URL}/users/`;
        nlink += username;

        fetch(nlink)
        .then((response) => response.json())
        .then((data) => {
            console.log('data')
            console.log(data)

            if (data.message === 'User not Found') {
                console.log('user not found')
                alert('Username not found')
            }
            
            try {
                let parsed = JSON.parse(JSON.stringify(data));

                console.log(parsed.data[0].name)
                console.log(parsed.data[0].password)

                if (parsed.data[0].username === username && parsed.data[0].password === password) {
                    console.log('correct login info')
                    alert('Successfully logged in!')
                    isLoggedIn = username
                    localStorage.setItem('username', username)
                } else {
                    console.log('incorrect login info')
                    alert('Invalid password')
                }

                console.log(isLoggedIn);

            } catch (err) {
                console.log('Error: ', err.message)
            }
        })

        let nuser = '/profile/'
        nuser += username

        if (isLoggedIn === username) {
            navigate(nuser)
        }
    }

    const nav = (e) => {
        e.preventDefault();
        navigate('/register');
    }


    return (
        <div className="auth-form-container">
            <h1>Login:</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="your username" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password" />
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
                
                {/* <button className="link" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
                
            </form>
            <button className="link" onClick={nav}>Don't have an account? Register here.</button>
            
            
        </div>
    )
}

export default Login;

// TODO:
// about page
// get alert for Register
// put in favorites list