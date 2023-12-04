import React, { useState } from 'react';
import '../css/WritePost.css';
import { createPost } from '../API/Post';
import { useNavigate } from 'react-router-dom';
import { UseWeb3 } from '../CustomHook/UseWeb3';

function WritePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); 
    const web3 = UseWeb3()

    const handlePost = async() => {
        const response = await createPost(title, content);
        async function postNFT() {
            if (web3 && response.status === 201){
                try{
                    await window.ethereum.request({ method: 'eth_requestAccounts' });    
                    const userID = sessionStorage.getItem("userId");
                    await web3.methods.rewardPublisher(userID).send({from: userID});
                }catch(error){                                             
                    console.log("error in handlePost of WirtePost.jsx", error);
                }
            }
        }
        await postNFT()
        navigate('/');
    };

    return (
        <div className='write_post'>
            <div className='write_post_input_container'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'
                    className='write_post_title_input'
                />
                <button onClick={handlePost} className='write_post_post_button'>
                    Post
                </button>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Content text holder'
                className='write_post_content_textarea'
            />
        </div>
    );
}

export default WritePost;