import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

import { PersonGrid } from '../components/PersonGrid';

import './styles.css'


function Community() {

    // Get a list of people from the API
    const [people, setPeople] = useState([]);
    const [matches, setMatches] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Make API call to get people
        fetch('http://localhost:4000/api/users').then((data) => {
            return data.json();
        }).then((json) => {
            setPeople(json.data);
        })
    }, []);

    useEffect(() => {
        // When query changes, filter people by their...?
        const match = people.filter((p) => p.email.includes(query) || p.username.includes(query));
        setMatches(match);
    }, [query]);

    return (
        <div>
            <h1 className='page-title'>Meet new people!</h1>
            <input type="text" className='search-bar' onChange={(e) => setQuery(e.target.value)} placeholder={'search...'}/>
            <PersonGrid people={!query ? people : matches} />
        </div>
    )
}

export default Community;