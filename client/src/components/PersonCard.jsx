import React, { useState } from 'react';

import styled from 'styled-components';
import defaultAvatar from '../ProfileComponents/avatars/grayavatar.png';

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
    font-family: 'New Walt Disney Font', sans-serif;
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

    const handleClick = () => {
        // First, change text
        setFollowing(!following)

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