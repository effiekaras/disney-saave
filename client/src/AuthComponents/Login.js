import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import { Navigate, useNavigate  } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentForm, setCurrentForm] = useState('login');
    let user = [];

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

        fetch('http://localhost:4000/api/users', {
            body: {"email": email, "password": password}
            
        }).then((data) => {
            user = data.clone().json();
            console.log(data.clone().json());
            console.log(data.status);
            // return data.json();
        })

        if (currentForm === 'login') {
            navigate('/register');
        }
    }

    

    console.log(user);
    console.log("hi");


    return (
        <div className="auth-form-container">
            <h1>Login:</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourEmail@gmail.com" id="email" name="email" />
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
            <button className="link" onClick={navigate('/register')}>Don't have an account? Register here.</button>
            
            
        </div>
    )
}

export default Login;
