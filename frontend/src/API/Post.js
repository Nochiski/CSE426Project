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

export {getPost};