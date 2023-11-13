import React, { useEffect, useState } from 'react';
import '../css/PostPage.css';
import thumbsUpImage from '../images/thumbsUp.png'; // Path to your thumbs up image
import { getPostById } from '../API/Post';
import Post from '../model/PostInfo';
import { useParams } from 'react-router-dom';

function PostPage() {
    const [post, setPost] = useState(new Post());
    const { id } = useParams();

    const handleBid = () => {
        // Functionality to handle post submission
        // Add functionality to send the post data to the backend/manage locally
    };

    useEffect(()=>{
        async function fetchPosts() {
            try {
              const postInfos = await getPostById(id); 
              setPost(postInfos); 
              console.log(postInfos)
            } catch (error) {
              console.error("Error in useEffect from PostList.jsx:", error);
            }
          }
          fetchPosts();      
    },[])

    return (
        <div className='post_page'>
            <div className='post_page_input_container'>
                <p className='post_page_title_input'>
                    {post.title}
                </p>
                <p className='post_page_author_input'> 
                    {post.author}
                </p>

                <div className='like_container'>
                    <img src={thumbsUpImage} alt='Thumbs Up' className='thumbs_up_image' />
                    <div className='like_count'>200</div> {/* it will be chagned */}
                </div>
                <button onClick={handleBid} className='post_page_post_button'>
                    Bid
                </button>
            </div>
            <p className='post_page_content_textarea'>
                {post.content}
            </p>
    </div>
);

}

export default PostPage;
