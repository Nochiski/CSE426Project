import React, { useState } from 'react';
import '../css/WritePost.css';
import { createPost } from '../API/Post';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../CustomHook/UseWeb3';
import { CallERC721 } from '../CustomHook/CallERC721';

function WritePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); 
    const web3 = useWeb3()
    //const erc = CallERC721();

    const handlePost = async() => {
        const response = await createPost(title, content);
        async function postNFT() {
            if (web3 && response.status === 201){
                try{
                    const userID = sessionStorage.getItem("userId");
                    await web3.methods.rewardPublisher(userID).send({from: userID});
                    const metaDataURI = `localhost:8080/uri/${response.data._id}`;
                    console.log(metaDataURI);
                    web3.methods.createPostNFT(userID, metaDataURI).estimateGas({from: userID})
                    .then(gasAmount => {
                        console.log("Estimated gas: ", gasAmount);
                        web3.methods.createPostNFT(userID, metaDataURI).send({ from: userID, gasLimit: gasAmount})
                        .then(result => {
                            console.log(result);
                        })
                        .catch(error => {
                            console.error("error in createPostNFT", error);
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });


                }catch(error){                                              //http://localhost:8080/uri/6559a708d00fa50fc2879535
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