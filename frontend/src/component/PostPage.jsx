import React, { useEffect, useState } from 'react';
import '../css/PostPage.css';
import thumbsUpImage from '../images/thumbsUp.png'; 
import { getPostById, likePost, addNFT } from '../API/Post';
import Post from '../model/PostInfo';
import { useParams } from 'react-router-dom';
import LikefillBtn from "../images/hand.thumbsup.fill.png"
import LikeBtn from "../images/hand.thumbsup.png"
import AskBid from './AskBid';
import { UseWeb3 } from '../CustomHook/UseWeb3';

function PostPage() {
    const [post, setPost] = useState(new Post());
    const { id } = useParams();
    const [liked, setLiked] = useState(false);
    const [isBidding, setIsBidding] = useState(false);
    const web3 = UseWeb3();
    const [isMyPost, setIsMyPost] = useState(false);
    const [isNFTCreated, setIsNFTCreated] = useState(false);

    const handleBid = async () => {
        setIsBidding(true);
        const uri = `${post.id}`;
        const tokenId = post.tokenId;
        console.log(tokenId);
    };

    const createNFT = async () => {
        try {
            const userID = sessionStorage.getItem("userId");
            const metaDataURI = `${post._id}`;
            
            const gasAmount = await web3.methods.createPostNFT(userID, metaDataURI).estimateGas({ from: userID });
            const result = await web3.methods.createPostNFT(userID, metaDataURI).send({ from: userID, gasLimit: gasAmount });
            
            const tokenId = Number(result.events.postnftcreated.returnValues.tokenId);
            console.log(tokenId);
    
            const response = await addNFT(post.id, tokenId);
            if (response.status !== 500) {
                setIsNFTCreated(true);
                setPost(response.data)
            }
        } catch (error) {
            console.error("error in createPostNFT", error);
        }
    };
    
    const closeBid = async (bidMessage, bidAmount) => {
        const userId = sessionStorage.getItem("userId")
        
        try{
            const tokenId = post.tokenId
            if(tokenId){
                console.log("tokenid", post.tokenId)
                await web3.methods.makeOffer(tokenId, bidAmount, bidMessage).send({from: userId});
            }else{
                console.log("erorr: fail to make an offer")
            }
       
        }catch(error){
            console.log("fail to get tokenID:", error)
        } 
        setIsBidding(false)
    };

    useEffect(() => {
        async function fetchPosts() {
            try {
                const postInfos = await getPostById(id);
                setPost(postInfos);
                console.log(postInfos)
                if(postInfos.tokenId !== 0) {
                    setIsNFTCreated(true);
                } 
                if(sessionStorage.getItem("userId") === postInfos.authorId ){
                    setIsMyPost(true);
                }
            } catch (error) {
                console.error("Error in useEffect from PostList.jsx:", error);
            }
        }
        fetchPosts();
        /*
        const web3Instance = new Web3('ws://127.0.0.1:7545');
        const contractABI = getABI();
        const contractAddress = getAddress();
    
        if (web3Instance && contractABI && contractAddress) {
            const myContract = new web3Instance.eth.Contract(contractABI, contractAddress);
    
            try {
                if (myContract && myContract.events) {
                    const eventSubscription = myContract.events.LikedPost({
                        filter: { viewer: sessionStorage.getItem("userId") },
                        fromBlock: 0
                    })
                    .on('data', function(event) {
                        console.log('New LikedPost Event:', event);
                    })
                    .on('error', console.error);
            
                    return () => {
                        eventSubscription.unsubscribe();
                    };
                }
            } catch (error) {
                console.error("Error :", error);
            }        
        }*/
        }, []);
    
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
                if(!isMyPost){
                    await web3.methods.likePost(userID).send({from: userID})
                }
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
                    <div className='post_page_title_div'>
                        <p className='post_page_title'>
                            {post.title}
                        </p>
                        {isNFTCreated &&
                       <div className='post_page_nft_mark'>
                            NFT
                        </div>
                        }
                    </div>
                    <p className='post_page_author'> 
                        {post.author}
                    </p>
                </div>
                <div className='post_page_input_container_lower'>
                    <div className='like_container'>
                        <img src={thumbsUpImage} alt='Thumbs Up' className='thumbs_up_image' />
                        <p className='like_count'>{post.numberOfLikes}</p>
                    </div>
                    {!isMyPost &&
                    <button onClick={handleBid} className='post_page_post_button'>
                        Bid
                    </button>
                    }
                    {!isNFTCreated && isMyPost &&
                    <button onClick={createNFT} className='post_page_post_button'>
                        Create NFT
                    </button>
                    }
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
