import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import React, { useState } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'
import WritePost from './WritePost.jsx'
import Web3 from 'web3';
import { getUserById } from '../API/User.js';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [account, setAccount] = useState(null); 

  const toLogin = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
  
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        alert('MetaMask is locked or the user has not connected any accounts');
        return;
      }
      
      const account = accounts[0];
      setAccount(account);
      console.log('Logged in account:', account);
  
      const fetchUserData = async () => {
        try {
          const response = await getUserById(account); 
          console.log("connected") // should be removed
          //TODO : If the user info is exists, set isLogin true, else, show signup component to login. and If they are clearly singned up, set isLogin true if not, cancel the etherium login.
        } catch (error) {
          console.log(error)
        }
      };
    
      await fetchUserData();

    } catch (error) {
      console.error("Error connecting to MetaMask", error);
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
