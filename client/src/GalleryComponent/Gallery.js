import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Gallery.scss';
import { getDefaultNormalizer, waitFor } from '@testing-library/react';

const BASE_URL = 'https://ghibliapi.herokuapp.com'



function Gallery() {
    const [films, setFilms] = React.useState([]);
    const [people, setPeople] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);
    const [button, setButton] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState("");
    
    const handleClick = (e) => {
        e.preventDefault();
        setButton(e.target.value);
      }; 

    const getFilms = () =>  {
        const data = fetch("https://ghibliapi.herokuapp.com/films")
        .then((response) => response.json())
        .then((data) => {
        setFilms(data)})
        .catch(rejected => {
            console.log(rejected);
        });
      };

    const getPeople = () => {
        const data = fetch("https://ghibliapi.herokuapp.com/people")
        .then((response) => response.json())
        .then((data) => {
        setPeople(data)
        }
        )
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const getLocations = async () => {
        const data = fetch("https://ghibliapi.herokuapp.com/locations")
        .then((response) => response.json())
        .then((data) => {
        setLocations(data)
        }
        )
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const getVehicles = async () => {
        const data = fetch("https://ghibliapi.herokuapp.com/vehicles")
        .then((response) => response.json())
        .then((data) => {
        setVehicles(data)}
        )
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value.toLowerCase());
    }; 

   
    React.useEffect(() => {
      getFilms();
      getPeople();
      getLocations();
      getVehicles();
  }, []); 

    React.useEffect(() => {
      setData(() => {
        return [
          ...films,
          ...people,
          ...locations,
          ...vehicles
        ]; 
      })
      setFilteredData(() => {
        return [
          ...films,
          ...people,
          ...locations,
          ...vehicles
        ]; 
      });
    }, [vehicles])
 
    

    React.useEffect(() => {
        if (searchInput.length > 0) {
          setFilteredData(() => {
            return [
              ...films,
              ...people,
              ...locations,
              ...vehicles
            ]; 
          });
          const searchedData = data.filter(
            d => {
              return (
                (d.name || d.title).toLowerCase().includes(searchInput.toLowerCase())
               )
            }
          )
          setFilteredData(searchedData);
        } else {
        if (button === 'films') {
            setFilteredData(films);
        } else if (button === 'characters') {
            setFilteredData(people);
        } else if (button === 'settings') {
            setFilteredData(locations);
        } else if (button === 'vehicles') {
            setFilteredData(vehicles);
        } else {
            setFilteredData(() => {
                return [
                  ...films,
                  ...people,
                  ...locations,
                  ...vehicles
                ];
              });
        } }
      }, [searchInput, button]);

    return (
        <header>
    <div className="searchBox">
      <i className="fa-solid fa-magnifying-glass mag"></i>
        <input className="searchbar"
          type="search"
          placeholder="search for..."
          onChange={handleChange}
          value={searchInput} />
    </div>

        <section className="buttonBar">
          <button className="button" value="" onClick={e => handleClick(e)}>All</button>
          <button className="button" value="films" onClick={e => handleClick(e)}>Films</button>
          <button className="button" value="characters" onClick={e => handleClick(e)}>Characters</button>
          <button className="button" value="settings" onClick={e => handleClick(e)}>Settings</button>
          <button className="button" value="vehicles" onClick={e => handleClick(e)}>Vehicles</button>
          </section>

        <div className="grid">
        {filteredData.map((f) => (
          <Link className="linkWrapper" to={`/detail/${f.id}`}>
          <div className="item">
            <img className="gridimg" src={f.image || require(`../images/${(f.title || f.name || "grey").replaceAll(' ', '_').replaceAll('\'', '')}.png`)}/>
            <p className="narrow">
            {f.title || f.name}</p> 
          </div>
          </Link>
        ))}         
      </div>
    </header>
    )
}

export default Gallery;