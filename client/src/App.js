import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import About from './AboutComponent/About.js';
import Detail from './DetailComponent/Detail.js';
import Profile from './ProfileComponents/Profile.js';
import Community from './CommunityComponent/Community.js';
import Gallery from './GalleryComponent/Gallery.js';
import Login from './AuthComponents/Login.js';
import Register from './AuthComponents/Register.js';
import './App.scss';

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementsByClassName("navbar")[0].style.padding = "0px";
    document.getElementById("title").style.fontSize = "45px";
    document.getElementsByClassName("a")[0].style.fontSize = "20px";
    document.getElementsByClassName("a")[1].style.fontSize = "20px";
    document.getElementsByClassName("a")[2].style.fontSize = "20px";
    document.getElementsByClassName("a")[3].style.fontSize = "20px";

  } else {
    document.getElementsByClassName("navbar")[0].style.padding = "10px";
    document.getElementById("title").style.fontSize = "50px";
    document.getElementsByClassName("a")[0].style.fontSize = "25px";
    document.getElementsByClassName("a")[1].style.fontSize = "25px";
    document.getElementsByClassName("a")[2].style.fontSize = "25px";
    document.getElementsByClassName("a")[3].style.fontSize = "25px";

}
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <nav className="navbar">
          <div className="app-title">
            <h1 id="title">Disney Fans</h1>
          </div>
          <ul className="tabs">
            <li>
              <Link className="a" to="/">About</Link>
            </li>
            <li>
              <Link className="a" to="/community">Community</Link>
            </li>
            <li>
              <Link className="a" to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link className="a" to="/login">My Account</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/detail/:id" element={<Detail />}/>
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="/community" element={<Community />}/>
          <Route path="/gallery" element={<Gallery />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<About />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
