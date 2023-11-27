import axios from 'axios'
import PostInfo from "../model/PostInfo"

const API_BASE_URL = 'http://localhost:8080';

const setPost = (item) => {
    const post = new PostInfo(item._id, 
        item.title, 
        item.userName,
        item.userId, 
        item.createdAt, 
        item.content,
        item.likedUsers, 
        item.NFTID
    )
    return post;
}

const getPost = async () => {
    const response = await axios.get(API_BASE_URL+'/post');
    if (response.status === 200){
        const postInfos = response.data.map(item =>
            setPost(item)
        );
        return postInfos;
    }
}

const createPost = async (title, content) => {
    try{
        const data = {
            userId : sessionStorage.getItem("userId"),
            userName : sessionStorage.getItem("userName"),
            title : title,
            content : content
          };
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization' : 'Bearer '+sessionStorage.getItem("authToken")
            }
          };
        const response = await axios.post(API_BASE_URL+'/post', data, config)    
        return response
    }catch(err){
        console.log(err)
    }
}

const getPostById = async (id) => {
    const response = await axios.get(API_BASE_URL+`/post/${id}`);
    if (response.status === 200){
        const postInfos = setPost(response.data);
        return postInfos;
    }
}

const likePost = async (postId, userId) => {
    try{
        const data = {
            userId : sessionStorage.getItem("userId"),
            userName : sessionStorage.getItem("userName"),
            postId : postId,
            userId : userId
          };
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization' : 'Bearer '+sessionStorage.getItem("authToken")
            }
          };

        const response = await axios.post(API_BASE_URL+`/posts/${postId}/like`, data, config);
        return response
    }catch(err){
        console.log(err)
    }
}

const addNFT = async (postId, nftID) => {
    try{
        const data = {
            postId : postId,
            nftID : nftID
          };
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization' : 'Bearer '+sessionStorage.getItem("authToken")
            }
          };

        const response = await axios.post(API_BASE_URL+`/posts/${postId}/nft`, data, config);
        return response
    }catch(err){
        console.log(err)
    }
}


export {likePost, getPost, createPost, getPostById, addNFT};