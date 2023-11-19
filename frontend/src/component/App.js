import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import nav_bar_logo from '../images/nav_bar_logo.png'
import PostList from './PostList.jsx'
import WritePost from './WritePost.jsx'
import PostPage from './PostPage.jsx'
import CoinImg from '../images/Coin.png'
//import ProfileImg from "../images/Profile.png"
import Notification from "../images/bell.png"
import { logIn, reqSignUp } from '../API/User.js';
import { useWeb3 } from "../CustomHook/UseWeb3.js";

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('authToken') ? true : false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [account, setAccount] = useState(null); 
  const [signUp, setSignUp] = useState(false);
  const [userNameInput, setUserNameInput] = useState('')
  const [amount, setAmount] = useState(Number(0));
  const web3 = useWeb3();

  useEffect(() => {
    async function fetchBalance() {
      if (web3) {
        const userId = sessionStorage.getItem("userId");
        const result = await web3.methods.getWTT(userId).call();
        let divisor = 1000000000000000000n;
        console.log(result/divisor)
        setAmount(Number(result/divisor))
      }
    }

    fetchBalance();
  }, [web3, amount]);
  
  const signUpBtnAction = async () => {
    try {
      const res = await reqSignUp(account, userNameInput);
      if (res.status === 201) {
        setSignUp(false);
        setIsLogin(true);
        const authToken = res.headers['x-auth-token'];
        sessionStorage.setItem('authToken', authToken);
        sessionStorage.setItem('userName', res.data.userName);
        sessionStorage.setItem('userId', account);
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
            sessionStorage.setItem('authToken', authToken);
            sessionStorage.setItem('userName', response.data.userName);
            sessionStorage.setItem('userId', account) 
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

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    setIsLogin(false)
  }
  
  return (
    <Router>
      <div className="nav_bar">
        <Link to="/" className="nav_bar_logo" >
            <img src={nav_bar_logo}></img>
        </Link>

        <form>
          <input className="nav_bar_search" type="text" placeholder="Search"></input>
        </form>

        {sessionStorage.getItem("userId") ?
        <div className="nav_bar_user_info">
          <img src={CoinImg}/>
          <p className="nav_bar_user_info_amount">{amount}</p>
          <button className="nav_bar_user_info_notification">
            <img src={Notification}></img>
          </button>
          <p className="nav_bar_user_info_profile">hello! {sessionStorage.getItem("userName")}</p>
          {/*<img className="nav_bar_user_info_profile" src={ProfileImg}></img>*/}
          <button onClick={handleLogout}>Logout</button>
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
          <Route path="/" element={<PostList></PostList>}></Route>
          <Route path="/write" element={<WritePost></WritePost>}></Route>
          <Route path="/post/:id" element={<PostPage></PostPage>}></Route>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
