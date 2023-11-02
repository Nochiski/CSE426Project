import '../css/PostList.css';
import '../images/nav_bar_logo.png'
import WritingImg from '../images/square.and.pencil.png'

function PostList() {
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
        this is list
      </div>
    </div>
  );
}

export default PostList;
