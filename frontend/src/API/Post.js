import axios from 'axios'
import PostInfo from "../model/PostInfo"

const API_BASE_URL = 'http://localhost:8080';

const getPost = async () => {
    const response = await axios.get(API_BASE_URL+'/post');
    if (response.status === 200){
        const postInfos = response.data.map(item =>
             new PostInfo(item._id, 
                item.title, 
                item.userName, 
                item.createdAt, 
                item.content
        ));
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

export {getPost, createPost};