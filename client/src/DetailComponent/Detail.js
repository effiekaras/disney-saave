import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment'

import axios from 'axios';
import './Detail.scss';

const getImage = (path) => `https://image.tmdb.org/t/p/w342/${path}`;
const api_key = "59dd51057d034c78c09b0129b62b2de9";
const BASE_URL = "https://api.themoviedb.org/3";



function Detail() {
    const {id} = useParams();
    const [basicModal, setBasicModal] = useState(false);
    const [lists, setLists] = React.useState([]);
    const toggleShow = () => setBasicModal(!basicModal);
    const api = axios.create({ baseURL: BASE_URL });

    const [data, setData] = React.useState([]);
    const [movieTitle, setMovieTitle] = React.useState([]);
    const [overview, setOverview] = React.useState([]);
    const [image, setImage] = React.useState("");
    const [genre, setGenre] = React.useState([]);
    const [release, setRelease] = React.useState("");

    function getImageFunc(path) {
        if (path) {
          return getImage(path);
        } else {
          return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU`;
        }
    }

    // Used to initialize lists for testing; replace with real lists
    React.useEffect(() => {
        var list1 = {"name": "List 1"}
        var list2 = {"name": "List 2"}
        var list3 = {"name": "List 3"}
        var list4 = {"name": "List 4"}
        //Use 5 lists to demonstrate overflow
        var list5 = {"name": "List 5"}

        setLists([list1,list2, list3, list4, list5])
    }, [])
    


    React.useEffect(() => {
        var link = `movie/${id}?api_key=${api_key}&language=en-US`;
        const movie = api.get(link);
        movie.then((res) => {
        var mov = res.data;
        setData(mov);
        setMovieTitle(mov.original_title);
        setOverview(mov.overview);
        setRelease(mov.release_date);
        var genres = []
        mov.genres.forEach((element) => {
        genres.push(element.name);
        });
        setGenre(genres);
        setImage(getImageFunc(mov.poster_path));
    })}, [])

    const favorite = event => {
        // Add logic for favoriting here
        // If already favorited, then this should be solid on load
        window.alert("favorite")
        event.currentTarget.classList.toggle('fa-solid');
    }

    const AddToList = (name) => {
        window.alert(`add to ${name}`)
    }

    const CreateNewList = () => {
        window.alert("create a new list")
    }


return (
    <section> 
    <div className="grid" id="detail">
    <div className="container">
    <div className="modal-content">
    <h1> {data.original_title} <i className="fa-regular fa-heart" onClick={(e)=>{favorite(e)}}></i></h1>
    <img className="gridimg" src={getImageFunc(data.poster_path)}/>
    <p className="description">
            {overview || "No overview available."} <br></br>
            Release Date: {moment(release, 'Y/M/D').format('MMMM D, Y')} <br></br>
            Genre: {JSON.stringify(genre, null, 2).replace(/['"]+/g, '').replace(/['[]+/g, '').replace(/['\]]+/g, '') || "N/A"} 
    </p>
    <div className="detailButtons">
    <>
        <Button className="detailButton" onClick={toggleShow}>
        Add to List
        </Button>

        <Modal className="modal" show={basicModal}  tabIndex='-1'>
        <button id="x" onClick={toggleShow}>&#10006;</button>
        <div className="modalBox">
            <span id="modalTitle">Which list would you like to add this to?</span>
            <div id="listContainer">
            {lists.map((l) => (
                <div id="listBox" onClick={() => AddToList(l.name)}>
                    <div className="listName">{l.name}</div>
                </div>    
            ))}    
            </div>
            <button onClick={CreateNewList} id="createList">Create a New List</button>
        </div>
        </Modal>
    </>

    <button className=" detailButton">
    <Link  to={`/gallery`} className="linkWrapper">Back to Gallery</Link>
    </button>
    </div>
    </div>
    </div></div>
    </section>
    )
}
export default Detail;