import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment'

import axios from 'axios';
import './Detail.scss';
import { API_URL } from '../constants';

const getImage = (path) => `https://image.tmdb.org/t/p/w342/${path}`;
const api_key = "59dd51057d034c78c09b0129b62b2de9";
const BASE_URL = "https://api.themoviedb.org/3";


var favLists = [];
var myFavsListID;
function Detail() {
    const {id} = useParams();
    const [basicModal, setBasicModal] = useState(false);
    const [lists, setLists] = React.useState([]);
    const toggleShow = () => setBasicModal(!basicModal);
    const [newListModal, setNewListModal] = useState(false);
    const toggleNewListShow = () => setNewListModal(!newListModal);
    const api = axios.create({ baseURL: BASE_URL });

    const [data, setData] = React.useState([]);
    const [movieTitle, setMovieTitle] = React.useState([]);
    const [overview, setOverview] = React.useState([]);
    const [image, setImage] = React.useState("");
    const [genre, setGenre] = React.useState([]);
    const [release, setRelease] = React.useState("");
    const [info, setInfo] = useState({});
    const [listName, setName] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [favListInfo, setFavListInfo] = useState([]);

    
    
    const username = localStorage.getItem("username");
    function getImageFunc(path) {
        if (path) {
          return getImage(path);
        } else {
          return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU`;
        }
    }

    // Used to initialize lists for testing; replace with real lists
    React.useEffect(() => {
        fetch(`${API_URL}/users/${username}`).then((data) => {
            return data.json();
        }).then((json) => {
            console.log(json.data);
            // setInfo(json.data[0]);  // array with one entry (stew-pid)
            // Get list data
            // also nested fetch ayyy lmaoooo
            let userLists = [];
            for (let list of json.data[0].lists) {
                try{
                    fetch(`${API_URL}/lists/${list}`).then((data) => {
                        return data.json();
                    }).then((ll) => {
                        userLists.push(ll.data);
                    })
                } catch (err) {
                    console.log(err);
                }
            }
            setLists(userLists);
            console.log(userLists);
        

            console.log(json.data[0].lists[0]);
            myFavsListID = json.data[0].lists[0];

            fetch(`${API_URL}/lists/${json.data[0].lists[0]}`).then((data) => {
                return data.json();
            }).then((json) => {
                //console.log(json.data);
                setFavListInfo(json.data.items);
                //console.log(favListInfo);
                favLists= json.data.items;
                
                //console.log(favLists);
            })
            favLists= json.data.items;
            
            
        });
        // var list1 = {"name": "List 1"}
        // var list2 = {"name": "List 2"}
        // var list3 = {"name": "List 3"}
        // var list4 = {"name": "List 4"}
        // //Use 5 lists to demonstrate overflow
        // var list5 = {"name": "List 5"}
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

    const ToggleFavorite = (event, movieId) => {
        // Add logic for favoriting here
        // If already favorited, then this should be solid on load
        // window.alert("favorite")
        //const whoIAm = localStorage.getItem('username') || '';

        // Check if this is alreday a favorite
        //const myFavsListID = info.lists[0];
        // console.log(favsList)
        // fetch(`${API_URL}/lists/${favsList}`).then((data) => {
        //     return data.json();
        // }).then((json) => {
            
            
        //     setFavListInfo(json.data[0]);
        // });
        
        // useEffect(() => {
        //     // Make API call to get people
        //     fetch(`${API_URL}/lists/${favsList}`).then((data) => {
        //         return data.json();
        //     }).then((json) => {
        //         console.log(json.data);
        //         setFavListInfo(json.data[0]); // array with one entry (stew-pid)
        //     })
        // }, []);
        
        //console.log(favListInfo);
        // fetch(`${API_URL}/users/${username}`).then((data) => {
        //     return data.json();
        // }).then((json) => {
        //     let parsed = JSON.parse(JSON.stringify(data));
        //     console.log(parsed);
        //     myFavsListID = parsed.data[0].lists[0];
        //     console.log(myFavsListID)
        fetch(`${API_URL}/lists/${myFavsListID}`).then((data) => {
            return data.json();
        }).then((json) => {
            //console.log(json.data.items);
            setFavListInfo(json.data.items);
            //console.log(favListInfo);
            favLists= json.data.items;
            //console.log(favLists);
        })
        //     // favLists= json.data.items;


        console.log(favLists)
            
        // });
        var MyFavsList = favLists
        if (MyFavsList?.includes(movieId)) {
            //console.log("im here!")
            // This is already a favorite. Do something to remove this from the favorites
            // list. I don't really know man.
            setFavorite(false);
            document.getElementById("heart").className = "fa-regular fa-heart";
           // event.target.classList.toggle('fa-solid');
            fetch(`${API_URL}/lists/${myFavsListID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "deleteditem": movieId
                })
            })
        } else {
            setFavorite(true);
            document.getElementById("heart").className = "fa-solid fa-heart";
            fetch(`${API_URL}/lists/${myFavsListID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "item": movieId
                })
            })
        }

        // bada bing bada boom baybee
        
    
       
        // event.target.classList.toggle('fa-solid');
    }

    const AddToList = (listId, movieId) => {
        // window.alert(`add to ${name}`)
        // add da thing to da thingy (thats what she said lmfao)
        toggleShow();
        fetch(`${API_URL}/lists/${listId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "item": movieId
            })
        })
    }

    const openNewListModal = () => {
        toggleShow();
        toggleNewListShow();
    }

    const CreateNewList = async() => {
        const whoIAm = localStorage.getItem('username') || '';
        //const nameOfList = window.prompt("create a new list")
        //console.log("hello")
        toggleNewListShow();
        try {
            await fetch(`${API_URL}/lists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "name" : listName,
                    "owner" : whoIAm,
                    "items": id
                })
            })
        } catch(err) {
            console.log(err);
        }
        
    }
    const checkFav = (movieId) => {
        // console.log(info.lists[0]);
        // const favsList = info.lists[0];
        // console.log(favsList);
        if (favLists?.includes(movieId)) {
            console.log("im here!")
            setFavorite(true);
            // This is already a favorite. Do something to remove this from the favorites
            // list. I don't really know man.
           
            //event.target.classList.toggle('fa-solid');
        }
    }


return (
    <section> 
    <div className="grid" id="detail">
    <div className="container">
    <h1> {data.original_title} <i id = "heart" className={favLists?.includes(id) ? 'fa-heart fa-solid' : 'fa-regular fa-heart'} onClick={(e)=>{ToggleFavorite(e, id)}}></i></h1>
    <div className="sideways">
    <img className="gridimg" src={getImageFunc(data.poster_path)}/>
    <p className="description">
            {overview || "No overview available."} <br></br>
            Release Date: {moment(release, 'Y/M/D').format('MMMM D, Y')} <br></br>
            <br></br>
            Genre: {JSON.stringify(genre, null, 2).replace(/['"]+/g, '').replace(/['[]+/g, '').replace(/['\]]+/g, '') || "N/A"} 
    </p>
    </div>
    <div className="detailButtons">
    <>
        <Button className="detailButton" onClick={toggleShow}>
        <div className="text">Add to List</div>
        </Button>

        <Modal className="modal" id="myModal" show={basicModal}  tabIndex='-1'>
        <button id="x" onClick={toggleShow}>&#10006;</button>
        <div className="modalBox" id="MyModal">
            <span id="modalTitle">Which list would you like to add this to?</span>
            <div id="listContainer">
            {lists.map((l) => {
               
                
                return (
                <div id="listBox" onClick={() => AddToList(l._id, id)}>
                    <div className="listName">{l.name}</div>
                </div>
            )}
            )}    
            </div>
            <button onClick={openNewListModal} id="createList">Create a New List</button>
        </div>
        </Modal>
        <Modal className="modal" id="newListModal" show={newListModal} >
        <button id="x" onClick={toggleNewListShow}>&#10006;</button>
            <div className="modalBox" id="MyModal">
                <span id="modalTitle">Enter a New List Name</span>
                <input type="text" className="list-name" onChange={(e) => setName(e.target.value)} placeholder={"Enter New Name"}/>
                <div style= {{height:"60px"}}></div>
                <button onClick={CreateNewList} id="createList">Create a New List</button>
            </div>
        </Modal>
        
    </>

    <Button className="detailButton">
    <Link  to={`/gallery`} className="text">Back to Gallery</Link>
    </Button>

    </div>
    </div>
    </div>
    </section>
    )
}
export default Detail;
