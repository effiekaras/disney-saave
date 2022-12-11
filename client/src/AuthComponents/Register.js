import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Register.scss';
import { Navigate, useNavigate  } from 'react-router-dom';
import { API_URL } from '../constants';


function Register(props) {
    const [em, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [currentForm, setCurrentForm] = useState('register');
    const [user, setUsername] = useState('');
    const [na, setName] = useState('');

    const navigate = useNavigate();

    const asyncPostCall = async () => {
        try {
            var userid = "";
            if (user.length === 0 || em.length === 0 || na.length === 0 || pass.length === 0) {
                throw "Missing Required Fields";
            }
            const response = await fetch(`${API_URL}users`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
               },

            body: JSON.stringify({
                username: user,
                email: em,
                name: na,
                password: pass
            })
            });
            const data = await response.json();
            console.log(data);

            } catch(error) {
                console.log(error);
                alert(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        asyncPostCall();

        navigate('/login');
    }

    const nav = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    return (
        <div className="auth-form-container">
            <div>
                <h1>Sign Up:</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Username:</label>
                        <input value={user} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder="username"></input>
                    </div>
                    <div>
                        <label htmlFor="name">Full Name:</label>
                        <input value={na} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="name"></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input value={em} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" /> 
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input value={pass} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password" /> 
                    </div>

                    <button type="submit">Sign Up</button>
                    
                </form>
                {/* <button className="link" onClick={() => props.onFormSwitch('login')}>Already have an account? Log in here.</button> */}
                <button className="link" onClick={nav}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}

export default Register;