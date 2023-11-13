import '../css/PostList.css';
import '../images/nav_bar_logo.png';

import WritingImg from '../images/square.and.pencil.png';
import WritingImgHovered from '../images/square.and.pencil.hover.png';
import PostListItem from './PostListItem.jsx';
import PostInfo from "../model/PostInfo.js";
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {getPost} from '../API/Post.js'


function PostList(isLogin) {
  const navigate = useNavigate(); // This hook gives you access to navigate function.
  const [src, setSrc] = useState(WritingImg);
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postInfos = await getPost(); 
        setPost(postInfos); 
      } catch (error) {
        console.error("Error in useEffect from PostList.jsx:", error);
      }
    }

    fetchPosts();
  }, []); 



  const handleClick = (item) => {
    navigate(`/post/${item.id}`);
  }
  const write = () => {
    if (isLogin){
      navigate("/write");
    }else{
      alert("You need to log in");
    }
  }

  return (
    <div className='post_list'>
      <div className='post_list_top'>
        <h1>Post</h1>
        <button onClick={()=>write()}
        onMouseOver={()=>setSrc(WritingImgHovered)}
        onMouseOut={()=>setSrc(WritingImg)}>
          <img src={src}
          alt="writingButtonImg"/>
          <p>
            write
          </p>
        </button>
      </div>
      <div className='post_list_scroll'>
        {post.map(item => (
          <PostListItem key={item.id} postInfo={item} onClick={() => handleClick(item)}></PostListItem>
        ))}
      </div>
    </div>
  );
}

export default PostList;