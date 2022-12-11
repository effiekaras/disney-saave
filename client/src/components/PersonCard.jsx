import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import defaultAvatar from '../ProfileComponents/avatars/grayavatar.png';
import {isLoggedIn} from "../AuthComponents/Login.js"; 
import Login from "../AuthComponents/Login.js"; 
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';

const PersonCardWrapper = styled.div`
    display: inline-grid;
    box-shadow: 2px 5px #c4d8d4;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    width: 400px;
    padding: 2em;
    background: #f0f5f4	;  // change to white later
    word-wrap: break-word;
    font-size: 20px;
    border-radius: 18px;
    margin: 2%;

    .following {
        background: #50C878;
    }

    .unfollowing {
        background: none;
    }

    button {
        width: 90px;
        margin: 30px;
        font-size: 16px;
    }
    .usernameprop {
        font-size: 1.5vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 180px;
    }
   
    img {
        margin-right:10px;
    }
    .emailprop {
        font-size: 1.2vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 180px;
    }
`

export const FollowButton = ({ username }) => {

    const [following, setFollowing] = useState(false);
    //const [whoIAm, setWhoIAm] = useState(Login.username);
    const whoIAm = localStorage.getItem('username') || '';
    const navigate = useNavigate();
    
    useEffect(() => {
        // Get user data for current auth'd user
        fetch(`${API_URL}/users/${whoIAm}`).then((data) => {
            return data.json();
        }).then((json) => {
            // Check JSON list of following users
            console.log(json.data[0].following);
            setFollowing(json.data[0].following?.includes(username));
        })
    }, []);

    const followRequest = async () => {
        console.log(whoIAm);
        try {
            await fetch(`${API_URL}/users/${whoIAm}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
              },

            body: JSON.stringify({
                "following":  username
            })
           });
        } catch(error) {
            console.log(error);
        }
    }

    const unfollowRequest = async () => {
        try {
            await fetch(`${API_URL}/users/${whoIAm}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "unfollowing": username
                })
            })
        } catch(err) {
            console.log(err);
        }
    };

    const handleClick = () => {
        //setLogIn()s
        //console.log(isLoggedIn);
        // First, change text
        console.log(whoIAm);
        if(!localStorage.getItem('username')) {
            navigate('/login');
        }

        if (!following) { //i want to follow somone
            followRequest();
            setFollowing(true);
        } else {
            unfollowRequest();
            setFollowing(false);
        }
    }


    return (
        <button
            onClick={() => handleClick()}
            className={following ? 'following' : 'unfollowing'}
        >{ following ? 'Followed' : 'Follow'}</button>
    )
}



export const PersonCard = ({ username, email, avatar }) => {

    return (
        <PersonCardWrapper>
            <div>
                <img src={defaultAvatar} />
            </div>
            <div>
                <a href={`/user/${username}`}> 
                <h1 className='usernameprop'>
                    @{ username }
                </h1>
                </a>
                <h3>
                    <div className='emailprop'>
                        { email }
                    </div>
                </h3>
                <FollowButton username={username} />
            </div>
        </PersonCardWrapper>
    )
}