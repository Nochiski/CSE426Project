import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'
import WritePost from './WritePost.jsx'
import Web3 from 'web3';
import { getUserById, postUser } from '../API/User.js';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [account, setAccount] = useState(null); 
  const [signUp, setSignUp] = useState(false);
  const [userNameInput, setUserNameInput] = useState('')

  useEffect(() => {
    console.log(signUp);
  }, [signUp]);

  const signUpBtnAction = () => {
    const rseponse = postUser(account, userNameInput)
  }
  
  // For login text input
  const handleInputChange = (event) => {
    // 입력 필드의 새로운 값으로 state를 업데이트합니다.
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
          const response = await getUserById(account); 
          //TODO : If the user info is exists, set isLogin true, else, show signup component to login. and If they are clearly singned up, set isLogin true if not, cancel the etherium login.
          if (response.status == 404) {
            setSignUp(true)
            console.log(signUp)
          }else {
            setIsLogin(true)
            console.log('User found, logged in');

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
        <button className="nav_bar_login" onClick={()=>toLogin()}>
          Login
        </button>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
