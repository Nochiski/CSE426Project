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
import { getABI, getAddress, getERC20Address, UseWeb3 } from "../CustomHook/UseWeb3.js";
import TokenImage from "../images/Coin.png";
import NotificationsCenter from "./NotificationsCenter.jsx";
import Web3 from "web3";
import ResponseBid from "./ReponseBid.js";

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('authToken') ? true : false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [account, setAccount] = useState(null); 
  const [signUp, setSignUp] = useState(false);
  const [userNameInput, setUserNameInput] = useState('')
  const [amount, setAmount] = useState(Number(0));
  const [isNotificationsCenterOn, setIsNotificationsCenterOn] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const [openResponseBid, setOpenResponseBid] = useState(false);
  const [responseEvent, setResponseEvent] = useState(null);

  const web3 = UseWeb3();

  useEffect(() => { 
    async function fetchBalance() {
      if (isLogin && web3) {
        const userId = sessionStorage.getItem("userId");
        const result = await web3.methods.getWTT(userId).call();
        let divisor = 1000000000000000000n;
        setAmount(Number(result/divisor))
      }
    }
    fetchBalance();
  
  
  }, [web3]);
  
  
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
        const tokenAddress = getERC20Address();
        const tokenSymbol = 'WTT';
        const tokenDecimals = 20;
        const tokenImage = TokenImage;

        try {
          // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
          const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: tokenAddress, // The address of the token.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
                decimals: tokenDecimals, // The number of decimals in the token.
                image: tokenImage, // A string URL of the token logo.
              },
            },
          });

          if (wasAdded) {
            console.log('Thanks for your interest!');
          } else {
            console.log('Your loss!');
          }
        } catch (error) {
          console.log(error);
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
  
      const fetchUserData = async () => {
        try {
          const response = await logIn(account); 
          if (response.status == 404) {
            setSignUp(true)
          }else {
            setIsLogin(true)
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
  
  const handleNoti = () => {
    setIsNotificationsCenterOn(!isNotificationsCenterOn)
  }

  const eventSelected = (item) => {
    console.log(item)
    setResponseEvent(item)
    setOpenResponseBid(true);
  }

  const acceptOffer = () => {
    setOpenResponseBid(false);

  }

  const rejectOffer = () => {
    setOpenResponseBid(false);
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
          
          <button className="nav_bar_user_info_notification" onClick={handleNoti}>
            <img src={Notification}></img>
            {isNotificationsCenterOn &&
              <NotificationsCenter eventSelected={eventSelected}> 

              </NotificationsCenter>
            }
          </button>
                    
          <p className="nav_bar_user_info_profile">hello! {sessionStorage.getItem("userName")}</p>

          {/*<img className="nav_bar_user_info_profile" src={ProfileImg}></img>*/}
          <button className="nav_bar_logout_button" onClick={handleLogout}>Logout</button>
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
        {openResponseBid &&
          <ResponseBid event={responseEvent} accept={acceptOffer} reject={rejectOffer}></ResponseBid>

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
