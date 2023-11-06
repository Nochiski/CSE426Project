import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'
import WritePost from './WritePost.jsx'
import Web3 from 'web3';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [account, setAccount] = useState(null); 

  const toLogin = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable(); 
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log('Logged in account:', accounts[0]);
        } else {
          alert('MetaMask is locked or the user has not connected any accounts');
        }
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };


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
