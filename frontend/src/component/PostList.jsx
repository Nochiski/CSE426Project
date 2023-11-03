import '../css/PostList.css';
import '../images/nav_bar_logo.png';

import WritingImg from '../images/square.and.pencil.png';
import WritingImgHovered from '../images/square.and.pencil.hover.png';
import PostListItem from './PostListItem.jsx';
import PostInfo from "../model/PostInfo.js";
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';


function PostList(handleLogin, isLogin) {
  const navigate = useNavigate(); // This hook gives you access to navigate function.
  const [src, setSrc] = useState(WritingImg);


  const dummyPost = [
    new PostInfo(1,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(2,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(3,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(4,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(5,"Title", "Author", "Nov 23 2022", "This is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content section")
  ]

  const handleClick = (item) => {
    console.log(item.id)
  }
  const write = () => {
    navigate("/write") 
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
        {dummyPost.map(item => (
          <PostListItem key={item.id} postInfo={item} onClick={() => handleClick(item)}></PostListItem>
        ))}
      </div>
    </div>
  );
}

export default PostList;