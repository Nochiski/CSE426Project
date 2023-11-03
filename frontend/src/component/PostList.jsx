import '../css/PostList.css';
import '../images/nav_bar_logo.png'

import WritingImg from '../images/square.and.pencil.png'
import PostListItem from './PostListItem.jsx'
import PostInfo from "../model/PostInfo.js"

function PostList() {
  const dummyPost = [
    new PostInfo(1,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(2,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(3,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(4,"Title", "Author", "Nov 23 2022", "This is content section"),
    new PostInfo(5,"Title", "Author", "Nov 23 2022", "This is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content sectionThis is content section")
  ]

  return (
    <div className='post_list'>
      <div className='post_list_top'>
        <h1>Post</h1>
        <button>
          <img src={WritingImg}>
          </img>
          <p>
            write
          </p>
        </button>
      </div>
      <div className='post_list_scroll'>
        {dummyPost.map(item => (
          <PostListItem key={item.id} postInfo={item}></PostListItem>
        ))}
      </div>
    </div>
  );
}

export default PostList;