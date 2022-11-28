import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import './Detail.scss';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';


function Detail() {
    const {id} = useParams();
    const [data, setData] = React.useState("");
    const [type, setType] = React.useState("");
    const [description, setDescription] = React.useState("")
    const [basicModal, setBasicModal] = useState(false);
    const [lists, setLists] = React.useState([]);
    const toggleShow = () => setBasicModal(!basicModal);

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
        const film = fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
        .then((response) => response.json())
        .then((d) => {
            if (d.name || d.title) {
                setType("film");
                setData(d);
            }
            else {
                const ppl = fetch(`https://ghibliapi.herokuapp.com/people/${id}`)
                .then((response) => response.json())
                .then((d) => {
                if (d.name || d.title) {setData(d)
                    setType("people")}
                else {
                    const loc = fetch(`https://ghibliapi.herokuapp.com/locations/${id}`)
                .then((response) => response.json())
                .then((d) => {
                if (d.name || d.title) {setData(d);
                setType("location")}
                else {
                    const veh = fetch(`https://ghibliapi.herokuapp.com/vehicles/${id}`)
                .then((response) => response.json())
                .then((d) => {
                if (d.name || d.title) {setData(d);
                setType("vehicle");}
            }); 
                }
            }); 
                }
            }); 
            }
        }) 
    }, []);

    React.useEffect(() => {
        if (type === "film") {
            setDescription(`${data.description || "NA"}
            Release Date: ${data.release_date || "NA"}
            Director: ${data.director || "NA"}
            Producer: ${data.producer || "NA"}
            Running Time: ${data.running_time || "NA"} min.
            Other Titles: ${data.original_title || "NA"}, ${data.original_title_romanised|| "NA"}`);
        } else if (type === "people") {
            (async () => {
                let film = data.films[0]
                var film_title = "NA"
                let species_url = data.species
                var species = "NA"
                await fetch(film)
                    .then((response) => response.json())
                    .then((d) => {film_title = d.title
                });
    
                await fetch(species_url)
                .then((response) => response.json())
                .then((d) => {species = `${d.name}, ${d.classification}`
                });
    
                setDescription(`
                Gender: ${data.gender || "NA"}
                Age: ${data.age|| "NA"}
                Eye Color: ${data.eye_color|| "NA"}
                Hair Color: ${data.hair_color|| "NA"}
                Film: ${film_title || "NA"}
                Species: ${species || "NA"}
                `)
                })();
        } else if (type === "location") {
            (async () => {
            let film = data.films[0]
            var film_title = "NA"
            await fetch(film)
                .then((response) => response.json())
                .then((d) => {film_title = d.title
            });
            var climate = data.climate;
            if (climate == "TODO") {
                climate = "NA"
            }
            var terrain = data.terrain;
            if (terrain == "TODO") { terrain = "NA"}
            setDescription(`
            Climate: ${climate || "NA"}
            Terrain: ${terrain || "NA"}
            Film: ${film_title || "NA"}
            `)
        })();
        } else if (type == "vehicle") {
            (async () => {
            let film = data.films[0]
            var film_title = "NA"
            var pilot = "NA"
            await fetch(film)
                .then((response) => response.json())
                .then((d) => {film_title = d.title
            });
            await fetch(data.pilot)
                .then((response) => response.json())
                .then((d) => {pilot = d.name
            });
            setDescription(`
            ${data.description || "NA"}
            Type: ${data.vehicle_class || "NA"}
            Length: ${data.length || "NA"} ft.
            Pilot: ${pilot || "NA"}
            Film: ${film_title || "NA"}
            `)
        })();
        } else {
            setDescription("");
        }
    })


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
    <h1>{data.title || data.name} <i className="fa-regular fa-heart" onClick={(e)=>{favorite(e)}}></i></h1>
    <img className="detailimg" src={data.image  || require(`../images/${(data.title || data.name || "grey").replaceAll(' ', '_').replaceAll('\'', '')}.png`)}/>
    <p className="description">
       {description} 
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