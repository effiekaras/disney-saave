import React, { useState } from 'react';

import styled from 'styled-components';

const PersonCardWrapper = styled.div`
    display: inline-grid;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    width: 400px;
    padding: 2em;
    background: #f2f2f2;  // change to white later

    .following {
        background: green;
    }

    .unfollowing {
        background: none;
    }

    button {
        width: 90px;
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
                <img src={avatar !== "default" || 'https://picsum.photos/150'} />
            </div>
            <div>
                <a href={`/user/${username}`}> 
                <h1>
                    @{ username }
                </h1>
                </a>
                <h3>
                    { email }
                </h3>
                <FollowButton />
            </div>
        </PersonCardWrapper>
    )
}