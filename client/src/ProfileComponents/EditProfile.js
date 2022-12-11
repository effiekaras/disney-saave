import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import defaultAvatar from './avatars/grayavatar.png';
import './Profile.scss'
import './EditProfile.scss';

let apiUrl = "http://localhost:4000/api";

function EditProfile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        console.log(username);
        axios.get(`${apiUrl}/users/${username}`).then(response => {
            setUser(response.data.data[0]);
        });
    }, [username]);
    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleBioChange = event => {
        setBio(event.target.value);
    };
    const handleSubmit = event => {
        let new_data = {}
        if (name)
            new_data.name = name;
        if (bio)
            new_data.bio = bio;
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
                        <label>Name: <input type="text" onChange={handleNameChange}/></label>
                        <br /><br />
                        <label>Biography: <input type="text" onChange={handleBioChange}/></label>
                        <br /><br />
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;