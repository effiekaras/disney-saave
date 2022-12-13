
import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import GetAvatar from './GetAvatar.js';
import settingsIcon from './avatars/settingsicon.png';
import Button from 'react-bootstrap/Button';
import Carousel from './Carousel.js';
import { API_URL } from '../constants';

function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const whoIAm = localStorage.getItem("username") || "";

    useEffect(() => {
        if (whoIAm !== username) {
            navigate(`/user/${username}`, {replace: true});
        }
        axios.get(`${API_URL}/users/${username}`).then(response => {
            setUser(response.data.data[0]);
        });
    }, [user]);

    const LogOut = async() => {
        localStorage.setItem('username', '');
        navigate('/login');
    }

    return (
        <div className="profile-container">
            <div className="spacing"></div>
            <div className="user">
                <div className="user-snapshot">
                    <img className="profile-pic" src={user && GetAvatar[user.avatar || "default"]}/>
                    <br></br>
                    <br></br>
                    <p>Followers: {user && user.followers && user.followers.length}</p>
                    <p>Following: {user && user.following && user.following.length}</p>
                    <div className="col">
                    <Link to={`/editprofile/${username}`}>
                        <Button variant="primary"className="but">Change Avatar</Button>
                    </Link>
                    <Button variant="primary" className="but log" onClick = {LogOut}>Log Out</Button>
                    </div>
                </div>
                <div className="user-details">
                    <div className="name-and-settings">
                        <h1>{user && user.name}</h1>
                        <Link to={`/editsettings/${username}`}>
                            <img src={settingsIcon} />
                        </Link>
                    </div>
                    <br />
                    <h2>Biography:</h2>
                    <p>{user && user.bio}</p>
                    <h2>Favorites:</h2>
                    <Carousel list_id={user && user.lists[0]}/>
                    <h2>Custom Lists:</h2>
                    {user && user.lists.slice(1).map(list_id => (
                        <Carousel list_id={list_id} key={list_id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile;