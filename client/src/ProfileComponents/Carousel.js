import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Carousel.scss';
import {API_URL, MOVIE_API_KEY, MOVIE_API_URL} from '../constants';
import { wait } from '@testing-library/user-event/dist/utils';

const getImageFunc = (path) => path ? `https://image.tmdb.org/t/p/w342/${path}`
    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcCjIVG3qv2QeXJ8vMgsoItp4-EzaL1oRb350awDfo0JgZuRASQXUSd2_p7yIGBv98b8&usqp=CAU`;

// to use: pass in prop list_id
function Carousel(props) {
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState([]);
    const [curr_slide, setCurrSlide] = useState(0);
    useEffect(() => {
        if (props.list_id) {
            axios.get(`${API_URL}/lists/${props.list_id}`).then(response => {
                const items = response.data.data.items;
                console.log(items);
                const title1 = response.data.data.name;
                if (title1 == "Favorites") {
                    setTitle("");
                }
                else {setTitle(title1);}
                var new_images = []
                for (const movie_id of items) {
                    (async () => {
                        await axios.get(`${MOVIE_API_URL}/movie/${movie_id}?api_key=${MOVIE_API_KEY}&language=en-US`).then(response => {
                            new_images.push(response.data.poster_path);
                        });
                        setImages(new_images);
                    })();
                }
            });  
        }
    }, [title]);



    const plusSlides = (n) => {
        let new_slide = curr_slide + n;
        if (new_slide >= images.length)
            new_slide = 0;
            setCurrSlide(new_slide);
        if (new_slide < 0)
            new_slide = images.length - 1;
            setCurrSlide(new_slide);
    }

    return (
        <div>        <h3 className="listTitle">{title}</h3>
        <div className="carousel-container">
        {images && images.map(img_src => (
            <div className={`${props.list_id} fave active slide`} key={img_src}>
                <div className="c-img-container">
                    <img src={getImageFunc(img_src)}/>
                </div>
            </div>
        ))}
        </div>
        </div>
    )
}

export default Carousel;