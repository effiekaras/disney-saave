import React, { useState } from 'react';

import styled from 'styled-components';
import defaultAvatar from '../ProfileComponents/avatars/grayavatar.png';
import {isLoggedIn} from "../AuthComponents/Login.js"; 
import Login from "../AuthComponents/Login.js"; 
import { Navigate, useNavigate } from 'react-router-dom';

const PersonCardWrapper = styled.div`
    display: inline-grid;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    width: 400px;
    padding: 2em;
    background: #f2f2f2;  // change to white later
    word-wrap: break-word;

    .following {
        background: #50C878;
    }

    .unfollowing {
        background: none;
    }

    button {
        width: 90px;
        margin: 30px;
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

const FollowButton = () => {

    const [following, setFollowing] = useState(false);
    const [toFollow, setToFollow] = useState('');
    const [whoIAm, setWhoIAm] = useState(Login.username);
    const navigate = useNavigate();
    
    const asyncPostCall = async () => {
        console.log(whoIAm);
        try {
            const response = await fetch(`http://localhost:4000/api/users/${whoIAm}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
              },

            body: JSON.stringify({
                "Following":  toFollow
            })
           });
        } catch(error) {
            console.log(error);
        }
    }

    const handleClick = () => {
        //setLogIn()s
        //console.log(isLoggedIn);
        // First, change text
        console.log(whoIAm);
        if(!isLoggedIn) {
            
            navigate('/login');
        }
        if (!following) { //i want to follow somone
          //  setToFollow(username);
        }
        setFollowing(!following);
        asyncPostCall();

        // Then, actually follow the user by making an API request
        // TODO
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
                <FollowButton />
            </div>
        </PersonCardWrapper>
    )
}