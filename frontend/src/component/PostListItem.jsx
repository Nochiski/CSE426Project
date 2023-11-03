import '../css/PostListItem.css';

function PostListItem({postInfo: { title, author, date, content}}) { /* postInfo : PostInfo.js */
  return (
   
    <div className='post_list_item'>
        <div className='post_list_item_info'>
            <div className='post_list_item_title'> 
                <p>{title}</p>
            </div>
            <div className='post_list_item_author'>
                <p>{author}</p>
            </div>
            <div className='post_list_item_date'>
                <p>{date}</p>
            </div>
        </div>
        <div className='post_list_item_content'>
            <p>{content}</p>
        </div>
    </div>
  );
}

export default PostListItem;