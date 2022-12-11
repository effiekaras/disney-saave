import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import defaultAvatar from './avatars/grayavatar.png';

let apiUrl = "http://localhost:4000/api";

function EditSettings() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        console.log(username);
        axios.get(`${apiUrl}/users/${username}`).then(response => {
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
    const handleSubmit = event => {
        let new_data = {}
        if (email)
            new_data.email = email;
        if (password && password === confirm_password)
            new_data.password = password;
        axios.put(`${apiUrl}/users/${username}`, new_data).then(response => {
            console.log(response);
        });
        navigate(`/profile/${username}`, {replace: true});
    };
    return (
        <div className="profile-container">
            <div className="spacing"></div>
            <div className="user">
                <div className="user-snapshot">
                    <img className="profile-pic" src={defaultAvatar} alt="default gray avatar"/>
                </div>
                <div className="user-details">
                    <form onSubmit={handleSubmit}>
                        <label>Email: <input type="text" onChange={handleEmailChange}/></label>
                        <br />
                        <label>Password: <input type="text" onChange={handlePasswordChange}/></label>
                        <br />
                        <label>Confirm Password: <input type="text" onChange={handleConfirmPasswordChange}/></label>
                        <br /><br />
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSettings;