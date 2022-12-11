import React from 'react';

import { PersonCard } from './PersonCard';

import styled from 'styled-components';

const PersonGridWrapper = styled.div`
    text-align: center;
    justify-items: center;

    width: 98%;
    margin: auto;
    padding: 4em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;
`

export const PersonGrid = ({ people }) => {


    if (people.length === 0) {
        return <h1>No people!</h1>
    }

    return (
        <PersonGridWrapper>
            {people.map((person) => {
                return <PersonCard username={person.username} avatar={person.avatar} email={person.email} key={person.username} />
            })}
        </PersonGridWrapper>
    )
}