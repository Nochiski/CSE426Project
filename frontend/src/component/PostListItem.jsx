import '../css/PostListItem.css';

function PostListItem({postInfo, onClick}) { /* postInfo : PostInfo.js */
  return (
   
    <div className='post_list_item' onClick={onClick}>
        <div className='post_list_item_info'>
            <div className='post_list_item_title'> 
                <p>{postInfo.title}</p>
            </div>
            <div className='post_list_item_author'>
                <p>{postInfo.author}</p>
            </div>
            <div className='post_list_item_date'>
                <p>{postInfo.date}</p>
            </div>
        </div>
        <div className='post_list_item_content'>
            <p>{postInfo.content}</p>
        </div>
    </div>
  );
}

export default PostListItem;