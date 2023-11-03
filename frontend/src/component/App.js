import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import React, { useState } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'
import WritePost from './WritePost.jsx'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [handleLogin, setHandleLogin] = useState(false);
  const toLogin = () => {
    setHandleLogin(true)
  }

  return (
    <Router>
      <div className="nav_bar">
        <Link to="/" className="nav_bar_logo" >
            <img src={nav_bar_logo}></img>
        </Link>
        <button className="nav_bar_login" onClick={()=>toLogin()}>
          Login
        </button>
      </div>
      <div>        
      <Routes>
        <Route path="/" element={<PostList handleLogin={handleLogin} isLogin={isLogin}></PostList>}></Route>
        <Route path="/write" element={<WritePost></WritePost>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
