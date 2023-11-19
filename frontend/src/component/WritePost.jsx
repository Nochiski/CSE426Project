import React, { useState } from 'react';
import '../css/WritePost.css';
import { createPost } from '../API/Post';
import { useNavigate } from 'react-router-dom';

function WritePost(web3) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // This hook gives you access to navigate function.

    const handlePost = async() => {
        console.log(content)
        await createPost(title, content);

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