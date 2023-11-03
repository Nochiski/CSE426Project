import {BrowserRouter as Router, Link, Route, Routes, Form} from "react-router-dom"
import React, { useState } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'

function App() {
  return (
    <Router>
      <div className="nav_bar">
        <Link to="/" className="nav_bar_logo" >
            <img src={nav_bar_logo}></img>
        </Link>
        <button className="nav_bar_login">
          Login
        </button>
      </div>
      <div>        
      <Routes>
        <Route path="/" element={<PostList></PostList>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
