import React, { useEffect, useState } from 'react';
import '../css/PostPage.css';
import thumbsUpImage from '../images/thumbsUp.png'; // Path to your thumbs up image
import { getPostById, likePost } from '../API/Post';
import Post from '../model/PostInfo';
import { useParams } from 'react-router-dom';
import LikefillBtn from "../images/hand.thumbsup.fill.png"
import LikeBtn from "../images/hand.thumbsup.png"
import AskBid from './AskBid';
import { useWeb3 } from '../CustomHook/UseWeb3';

function PostPage() {
    const [post, setPost] = useState(new Post());
    const { id } = useParams();
    const [liked, setLiked] = useState(false);
    const [isBidding, setIsBidding] = useState(false);
    const web3 = useWeb3();
    const handleBid = () => {
        setIsBidding(true)
    };

    const closeBid = () => {
        setIsBidding(false)
    }

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

    const handleLike = async() => {
        if(!sessionStorage.getItem("userId")){
            alert("You need to login first");
            return;
        }
        setLiked(!liked)
        const res = await likePost(post.id, sessionStorage.getItem("userId"))
        if (res.status === 200) {
            try {
                const postInfos = await getPostById(id); 
                setPost(postInfos);
                const userID = sessionStorage.getItem("userId");
                await web3.methods.likePost(userID).send({from: userID})

                console.log(postInfos)
            } catch (error) {
                console.error("Error in handleLike from PostList.jsx:", error);
            }
        }
    }

    return (
        <div className='post_page'>
                    {isBidding && 
            <AskBid closeBid={closeBid}></AskBid>
        }
            <div className='post_page_info_area'>
                <div className='post_page_input_container_upper'>
                    <p className='post_page_title'>
                        {post.title}
                    </p>
                    <p className='post_page_author'> 
                        {post.author}
                    </p>
                </div>
                <div className='post_page_input_container_lower'>
                    <div className='like_container'>
                        <img src={thumbsUpImage} alt='Thumbs Up' className='thumbs_up_image' />
                        <p className='like_count'>{post.numberOfLikes}</p>
                    </div>
                    <button onClick={handleBid} className='post_page_post_button'>
                        Bid
                    </button>
                </div>
            </div>
            <div className='post_page_content'>
                <p>
                    {post.content}
                </p>
                <button className='post_page_like_button' onClick={handleLike}>
                    {liked ? 
                        <img src={LikefillBtn}></img>
                    :                    
                        <img src={LikeBtn}></img>
                    }
                    Like this post
                </button>
            </div>
        </div>
    );
}

export default PostPage;
