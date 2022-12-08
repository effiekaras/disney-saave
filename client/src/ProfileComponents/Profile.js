import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Profile.scss';
import defaultAvatar from './avatars/grayavatar.png';
import Button from 'react-bootstrap/Button';
import Carousel from './Carousel.js';

let apiUrl = "http://localhost:4000/api";

function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`${apiUrl}/users/${username}`).then(response => {
            setUser(response.data.data[0]);
        });
    }, [username]);
    return (
        <div className="profile-container">
            <div className="spacing"></div>
            <div className="user">
                <div className="user-snapshot">
                    <img className="profile-pic" src={defaultAvatar} alt="default gray avatar"/>
                    <br /><br />
                    <Button variant="primary">FOLLOW</Button>
                    <br /><br />
                    <p>Followers: {user && user.followers && user.followers.length}</p>
                    <p>Following: {user && user.following && user.following.length}</p>
                </div>
                <div className="user-details">
                    <h1>{user && user.name}</h1>
                    <br />
                    <h2>Biography:</h2>
                    <p>{user && user.bio}</p>
                    <h2>Favorites:</h2>
                    <Carousel list_id={user && user.lists[0]}/>
                    <h2>Custom Lists:</h2>
                    {user && user.lists.map(list_id => (
                        <Carousel list_id={list_id} key={list_id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile;