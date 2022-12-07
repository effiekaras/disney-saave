import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Gallery.scss';
import { getDefaultNormalizer, waitFor } from '@testing-library/react';

const BASE_URL = "https://api.themoviedb.org/3";
const getImage = (path) => `https://image.tmdb.org/t/p/w342/${path}`;
const api_key = "59dd51057d034c78c09b0129b62b2de9";

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
      }; 

      function getImageFunc(path) {
        if (path) {
          return getImage(path);
        } else {
          return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrPMpWbHOGEXiyZ7au75btz1wRmc60SL7aobwQWRUj7rGIw3a1VSISsx1y1xuiVOPG54&usqp=CAU`;
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
      setData(movies)
      setFilteredData(movies);
      setButtonData(movies);
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
          setFilteredData(searchedData);
        } else {
        if (button === '28') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(28)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("action ")
        } else if (button == '12') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(12)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("adventure ")
        } else if (button == '80') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(80)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
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
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("comedy ")
        }  else if (button == '18') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(18)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("drama ")
        }  else if (button == '14') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(14)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("fantasy ");
        }  else if (button == '9648') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(9648)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("mystery ");
        }  else if (button == '10749') {
          const filter = data.filter(
            d=> {
              return (
                (d.genre_ids).includes(10749)
              )
            }
          )
          setFilteredData(filter);
          setButtonData(filter);
          setGenre("romance ");
        }
        else {
            setFilteredData(movies);
            setButtonData(movies);
            setGenre("")
        } }
      }, [searchInput, button]);
    return (
        <header id="gallery-body">
          <div className="filler"></div>
    <div className="searchBox">
      <i className="fa-solid fa-magnifying-glass mag"></i>
        <input className="searchbar"
          type="search"
          placeholder={"search for " + genre + "movies..."}
          onChange={handleChange}
          value={searchInput} />
    </div>

    <section className="buttonBar">
          <button className="button" value="" onClick={e => handleClick(e)}>All</button>
          <button className="button" value="28" onClick={e => handleClick(e)}>Action</button>
          <button className="button" value="12" onClick={e => handleClick(e)}>Adventure</button>
          <button className="button" value="80" onClick={e => handleClick(e)}>Crime</button>
          <button className="button"value="35" onClick={e => handleClick(e)}>Comedy</button>
          <button className="button" value="18" onClick={e => handleClick(e)}>Drama</button>
          <button className="button" value="14" onClick={e => handleClick(e)}>Fantasy</button>
          <button className="button" value="9648" onClick={e => handleClick(e)}>Mystery</button>
          <button className="button" value="10749" onClick={e => handleClick(e)} >Romance</button>
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
    </header>
    )
}

export default Gallery;