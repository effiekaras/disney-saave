import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Register.scss';
import { Navigate, useNavigate  } from 'react-router-dom';


function Register(props) {
    const [em, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const [currentForm, setCurrentForm] = useState('register');
    const [user, setUsername] = useState('');
    const [na, setName] = useState('');

    const navigate = useNavigate();

    const asyncPostCall = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/users', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
               },
               body: JSON.stringify({
         // your expected POST request payload goes here
                 username: user,
                 email: em,
                 name: na,
                 password: pass
                })
             });
             const data = await response.json();
             console.log(data);

             if (data.status === 500) {
                console.log("user already exists");
             }

           } catch(error) {
               
              console.log(error)
             } 
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email);
        console.log(user);
        console.log(typeof user);

        // fetch('http://localhost:4000/api/users', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         "username": user, 
        //         "name": na, 
        //         "email": em, 
        //         "password": pass})
        // })
        // .then((data) => {
        //     console.log(data.status)
        //     console.log(data.data)

        //     if (data.status === 500) {
        //         console.log("user already exists")
        //     }
        // })
        
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

                    <button type="submit">Log In</button>
                    
                </form>
                {/* <button className="link" onClick={() => props.onFormSwitch('login')}>Already have an account? Log in here.</button> */}
                <button className="link" onClick={nav}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}

export default Register;