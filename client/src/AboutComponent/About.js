import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './About.scss';


function About() {
    return (
        <div>
            {/* <h1>about component</h1> */}
            <div>
                <img 
                    class='first' 
                    src="https://images.unsplash.com/photo-1534450539339-6d1c81ad18e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=972&q=80" 
                    alt="">
                </img>
                <h3 class='second'>
                    Welcome to the best online community for Disney fans! 
                    <br></br>
                    <br></br>
                    Come learn more about the films and characters of the timeless, world-leading animation studio.
                    <br></br>
                    <br></br>
                    Want to contribute to the conversation? Create an account to make personalized lists and meet other fans!
                </h3>
            </div>
        </div>
    )
}

export default About;