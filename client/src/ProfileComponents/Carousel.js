import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Carousel.scss';
import {API_URL, MOVIE_API_KEY, MOVIE_API_URL} from '../constants';

const getImageFunc = (path) => path ? `https://image.tmdb.org/t/p/w342/${path}`
    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU`;

// to use: pass in prop list_id
function Carousel(props) {
    const [images, setImages] = useState([]);
    const [curr_slide, setCurrSlide] = useState(0);
    useEffect(() => {
        if (props.list_id) {
            axios.get(`${API_URL}/lists/${props.list_id}`).then(response => {
                const items = response.data.data.items;
                let new_images = []
                for (const movie_id of items) {
                    axios.get(`${MOVIE_API_URL}/movie/${movie_id}?api_key=${MOVIE_API_KEY}&language=en-US`).then(response => {
                        new_images.push(getImageFunc(response.data.poster_path));
                    });
                }
                console.log(new_images);
                setImages(new_images);
            });
        }
    }, []);
    const plusSlides = (n) => {
        let new_slide = curr_slide + n
        if (new_slide >= document.getElementsByClassName("slide").length)
            new_slide = 0;
        if (new_slide < 0)
            new_slide = document.getElementsByClassName("slide").length - 1;
        setCurrSlide(new_slide);
    }
    useEffect(() => {
        let slides = document.getElementsByClassName("slide");
        if (slides.length > 0) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].className.replace(" active", "");
                slides[i].style.display = "none";
            }
            slides[curr_slide].className += " active";
            slides[curr_slide].style.display = "block";
        }
    }, [curr_slide]);
    return (
        <div className="carousel-container">
        {images && images.map(img_src => (
            <div className="slide fave active" key={img_src}>
                <div className="c-img-container">
                    <img src={img_src}/>
                    <a class="prev" onclick={plusSlides(-1)}>&#10094;</a>
                    <a class="next" onclick={plusSlides(1)}>&#10095;</a>
                </div>
            </div>
        ))}
        </div>
    )
}

export default Carousel;