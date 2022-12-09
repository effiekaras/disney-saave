import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import defaultAvatar from '../ProfileComponents/avatars/grayavatar.png';

const PersonDetailWrapper = styled.div`
    
    text-align: center;
    width: 75%;
    margin: auto;
    padding: 2em;
    margin-top: 6%;
    background: #f2f2f2;  // change to white later

    .following {
        background: #50C878;
    }

    .unfollowing {
        background: none;
    }

    button {
        width: 150px;
        height: auto;
        padding: 0.5em;
        margin-top: 5px;
        font-size: 1.5vw;
    }

    .info-grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 600px;
        margin: auto;
        margin-bottom: 5px;
    }

    .info-grid h3 {
        font-size: 1.4vw;
    }
    
    .username-prop{
        font-size: 2.2vw;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .bio-prop{
        font-size: 1.2vw;
        margin-top: 10px;
        margin-bottom: 15px;
        font-weight: normal;
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

export const PersonDetail = () => {
    const [info, setInfo] = useState({});
    const { username } = useParams();

    useEffect(() => {
        // Make API call to get people
        fetch(`http://localhost:4000/api/users/${username}`).then((data) => {
            return data.json();
        }).then((json) => {
            console.log(json.data);
            setInfo(json.data[0]);  // array with one entry (stew-pid)
        })
    }, []);

    if (Object.keys(info).length === 0) {
        console.log('breigh');
        return (
        <div>
            Loading...
        </div>
    )
    }

    console.log(info);

    return (
        <PersonDetailWrapper>
            <div>
                {/* placeholder img */}
                <img src={defaultAvatar}/>
            </div>
            <div>
                <h1 className='username-prop'>
                    @{ info.username }
                </h1>
                <div className='info-grid'>
                    <h3>Followers: {info.followers.length} </h3>
                    <h3>Following: {info.following.length} </h3>
                    <h3>No. of Lists: {info.lists.length} </h3>
                </div>
                <h3 className='bio-prop'>
                    {/* placeholder bio lol, remove */}
                    { info.bio !== "" ? info.bio : "I am a student at UIUC. #seniors"  }
                </h3>
                <FollowButton />
            </div>
        </PersonDetailWrapper>
    )
}