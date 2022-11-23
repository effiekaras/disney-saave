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

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <nav className="navbar">
          <div className="app-title">
            <h1>Studio Ghibli Fans</h1>
          </div>
          <ul>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/login">My Account</Link>
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
