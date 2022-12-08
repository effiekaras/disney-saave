import React from 'react';

import { PersonCard } from './PersonCard';

import styled from 'styled-components';

const PersonGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4em;

    text-align: center;
    justify-items: center;

    width: 80%;
    margin: auto;
    padding: 4em;
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