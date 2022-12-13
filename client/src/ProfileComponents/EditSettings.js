import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import GetAvatar from './GetAvatar.js';
import {API_URL} from '../constants';

function EditSettings() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const whoIAm = localStorage.getItem("username") || "";
    const navigate = useNavigate();
    useEffect(() => {
        if (whoIAm !== username) {
            navigate(`/user/${username}`, {replace: true});
        }
        axios.get(`${API_URL}/users/${username}`).then(response => {
            setUser(response.data.data[0]);
        });
    }, [username]);

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = event => {
        setConfirmPassword(event.target.value);
    };
    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleBioChange = event => {
        setBio(event.target.value);
    };

    const handleSubmit = event => {
        let new_data = {}
        if (email)
            new_data.email = email;
        if (password && password === confirm_password)
            new_data.password = password;
        if (name)
            new_data.name = name;
        if (bio)
            new_data.bio = bio;
        axios.put(`${API_URL}/users/${username}`, new_data).then(response => {
            console.log(response);
        });
        navigate(`/profile/${username}`, {replace: true});
    };
    return (
        <div className="profile-container">
            <div className="spacing"></div>
            <div className="user">
                <div className="user-snapshot">
                    <img className="profile-pic" src={user && GetAvatar[user.avatar]} alt="default gray avatar"/>
                </div>
                <div className="user-details">
                    <form onSubmit={handleSubmit}>
                    <label>Name: <input type="text" onChange={handleNameChange}/></label>
                        <br /><br />
                        <label>Password: <input type="text" onChange={handlePasswordChange}/></label>
                        <br />
                        <label>Confirm Password: <input type="text" onChange={handleConfirmPasswordChange}/></label>
                        <br /><br />
                        <label>Email: <input type="text" onChange={handleEmailChange}/></label>
                        <br />
                        <label>Biography: <input type="text" onChange={handleBioChange}/></label>
                        <br /><br />
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSettings;