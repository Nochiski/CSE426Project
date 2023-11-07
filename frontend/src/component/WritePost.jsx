import React, { useState } from 'react';
import '../css/WritePost.css';

function WritePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlePost = () => {
        // Action when 'Post' button is clicked
        // For example: Submit the post data to the backend
        console.log('Title:', title);
        console.log('Content:', content);
        // Add functionality to send the post data to the backend/manage locally
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