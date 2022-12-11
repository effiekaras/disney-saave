import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Gallery.scss';
import Button from 'react-bootstrap/Button';

import { Fragment } from 'react';
import ScrollButton from './ScrollButton';


const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w342/${path}`;
const api_key = "59dd51057d034c78c09b0129b62b2de9";
const buttons = [0, 12, 28, 80, 35, 18, 14, 9648, 10749]

function Gallery() {
  const api = axios.create({ baseURL: BASE_URL });

    const [movies, setMovies] = React.useState([]);
    const [button, setButton] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [buttonData, setButtonData] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState("");
    const [genre, setGenre] = React.useState("");    
    
    const handleClick = (e) => {
        e.preventDefault();
        setButton(e.target.value);
        buttons.forEach((i) => {
          if (i != e.target.value) {
            document.getElementById(i).classList.remove('light');
          }
        })
        e.target.classList.add('light');
      }; 

      function getImageFunc(path) {
        if (path) {
          return getImage(path);
        } else {
          return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU`;
        }
      }

    const handleChange = (e) => {
        setSearchInput(e.target.value.toLowerCase());
    }; 

   
    React.useEffect(() => {
      setData([]);
      setMovies([]);
      setFilteredData([]);
      setButtonData([]);
      setGenre("");
      var movs = []
      for (let i = 1; i < 34; i++) {
      var link =`/discover/movie?api_key=${api_key}&language=en-US&page=${i}&with_companies=2`
      const mov = api.get(link);
      mov.then((res) => {
        if (i == 1) {
          setMovies(res.data.results)
        } else {
        setMovies((curr) => {
          return [
            ...curr,
            ...res.data.results,
          ];
        }); }
    });
  }
  }, []); 

  

    React.useEffect(() => {
      setGenre("");
      setData([...new Set(movies)])
      setFilteredData([...new Set(movies)]);
      setButtonData([...new Set(movies)]);
    }, [movies])
  
    React.useEffect(() => {
        if (searchInput.length > 0) {
          const searchedData = buttonData.filter(
            d => {
              return (
                (d.original_title).toLowerCase().includes(searchInput.toLowerCase())
               )
            }
          )
          setFilteredData([...new Set(searchedData)]);
        } else {
        if (button === '28') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(28)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("action ")
        } else if (button == '12') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(12)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("adventure ")
        } else if (button == '80') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(80)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("crime ")
        }
        else if (button == '35') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(35)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("comedy ")
        }  else if (button == '18') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(18)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("drama ")
        }  else if (button == '14') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(14)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("fantasy ");
        }  else if (button == '9648') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(9648)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("mystery ");
        }  else if (button == '10749') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(10749)
              )
            }
          )
          setFilteredData([...new Set(filter)]);
          setButtonData([...new Set(filter)]);
          setGenre("romance ");
        }
        else {
          setFilteredData([...new Set(movies)]);
          setButtonData([...new Set(movies)]);
            setGenre("")
        } }
      }, [searchInput, button]);
    return (
      <Fragment>
        <header id="gallery-body">
          <div className="filler"></div>
        <div className="searchBox">
        <input className="searchbar"
          type="search"
          placeholder={"search for " + genre + "movies..."}
          onChange={handleChange}
          value={searchInput} />
    </div>
    <section className="buttonBar">
          <Button className="button" value="0" id="0" onClick={e => handleClick(e)}>All</Button>
          <Button className="button" value="28" id="28" onClick={e => handleClick(e)}>Action</Button>
          <Button className="button" value="12" id="12" onClick={e => handleClick(e)}>Adventure</Button>
          <Button className="button" value="80" id="80" onClick={e => handleClick(e)}>Crime</Button>
          <Button className="button"value="35" id="35" onClick={e => handleClick(e)}>Comedy</Button>
          <Button className="button" value="18" id="18" onClick={e => handleClick(e)}>Drama</Button>
          <Button className="button" value="14" id="14" onClick={e => handleClick(e)}>Fantasy</Button>
          <Button className="button" value="9648" id="9648" onClick={e => handleClick(e)}>Mystery</Button>
          <Button className="button" value="10749" id="10749" onClick={e => handleClick(e)} >Romance</Button>
          </section>

        <div className="grid">
        {filteredData.map((movie) => (
        <Link className="linkWrapper" to={`/detail/${movie.id}`}>
          <div className="item">
          <img className="gridimg" src={getImageFunc(movie.poster_path)}/>
            <p className="narrow">
            {movie.original_title || "N/A"}</p>
          </div>
          </Link>
        ))}  
      </div>
      <ScrollButton />
    </header>
    </Fragment>
    )
}

export default Gallery;