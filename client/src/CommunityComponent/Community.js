import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

import { PersonGrid } from '../components/PersonGrid';

import './styles.css'
import { API_URL } from '../constants';


function Community() {
    const username = localStorage.getItem("username");

    // Get a list of people from the API
    const [people, setPeople] = useState([]);
    const [matches, setMatches] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Make API call to get people
        fetch(`${API_URL}/users`).then((data) => {
            return data.json();
        }).then((json) => {
            var people_data = json.data;
            const filter = people_data.filter(
                d=> {
                  return (
                    (d.username) !== (username)
                  )
                }
              )
            setPeople(filter);
        })
    }, []);

    useEffect(() => {
        // When query changes, filter people by their...?
        const match = people.filter((p) => p.email?.includes(query) || p.username?.includes(query) ||  p.name?.includes(query));
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