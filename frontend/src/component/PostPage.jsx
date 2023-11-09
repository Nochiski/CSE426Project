import React, { useState } from 'react';
import '../css/PostPage.css';
import thumbsUpImage from '/Users/garrett/Desktop/Senior Year/CSE426/CSE426Project/frontend/src/component/img.png'; // Path to your thumbs up image

function PostPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [likeCount, setLikeCount] = useState(0); // State for like count

    const handlePost = () => {
        // Functionality to handle post submission
        console.log('Title:', title);
        console.log('Author:', author);
        console.log('Content:', content);
        // Add functionality to send the post data to the backend/manage locally
    };

    return (
        <div className='post_page'>
            <div className='post_page_input_container'>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'
                    className='post_page_title_input'
                    readOnly // set input as read-only
                />
                <input
                    type='text'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder='Author'
                    className='post_page_author_input'
                    readOnly // set input as read-only
                />
                <img src={thumbsUpImage} alt='Thumbs Up' className='thumbs_up_image' />
                <div className='like_count'>{likeCount}</div>
                <button onClick={handlePost} className='post_page_post_button'>
                    Bid
                </button>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
                className='post_page_content_textarea'
                readOnly // set textarea as read-only
            />
        </div>
    );
}

export default PostPage;
