import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'
import WritePost from './WritePost.jsx'
import PostPage from './PostPage.jsx'
import CoinImg from '../images/Coin.png'
import ProfileImg from "../images/Profile.png"
import Notification from "../images/bell.png"
import Web3 from 'web3';
import { logIn, reqSignUp } from '../API/User.js';

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('authToken') ? true : false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [account, setAccount] = useState(null); 
  const [signUp, setSignUp] = useState(false);
  const [userNameInput, setUserNameInput] = useState('')

  useEffect(() => {
    console.log(signUp);
  }, [signUp]);

  const signUpBtnAction = async () => {
    try {
      const res = await reqSignUp(account, userNameInput);
      if (res.status === 201) {
        setSignUp(false);
        setIsLogin(true);
        const authToken = res.headers['x-auth-token'];
        if (authToken) {
          sessionStorage.setItem('authToken', authToken);
        }
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  
  
  // For login text input
  const handleInputChange = (event) => {
    setUserNameInput(event.target.value);
  };
  
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
          const response = await logIn(account); 
          if (response.status == 404) {
            setSignUp(true)
            console.log(signUp)
          }else {
            setIsLogin(true)
            console.log('User found, logged in');
            const authToken = response.headers['x-auth-token'];
            if (authToken) {
              sessionStorage.setItem('authToken', authToken);
            }          
          }
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

        <form>
          <input className="nav_bar_search" type="text" placeholder="Search"></input>
        </form>

        {isLogin ?
        <div className="nav_bar_user_info">
          <img src={CoinImg}/>
          <p className="nav_bar_user_info_amount">1000</p>
          <button className="nav_bar_user_info_notification">
            <img src={Notification}></img>
          </button>
          <img className="nav_bar_user_info_profile" src={ProfileImg}></img>
        </div>
        :
        <button className="nav_bar_login" onClick={()=>toLogin()}>
        Login
        </button>
        }
      </div>
      <div>
        {signUp &&
          <div className="sign_up_background">
            <div className="sign_up_popup">
              <p className="sign_up_popup_title">Create Account </p> {/*TODO : add button listener and finish sign up */}
              <div className="sign_up_form"> 
              <form>
                <input type="text" placeholder="User name" value={userNameInput} onChange={handleInputChange}></input>
              </form>
              <button onClick={signUpBtnAction}>Sign up</button>
              </div>
            </div>
          </div>
        }    
        <Routes>
          <Route path="/" element={<PostList handleLogin={handleLogin} isLogin={isLogin}></PostList>}></Route>
          <Route path="/write" element={<WritePost></WritePost>}></Route>
          <Route path="/post" element={<PostPage></PostPage>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
