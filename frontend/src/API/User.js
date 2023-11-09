import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

//userId must be a metamaskId
const logIn = async (id) => {
  const data = {
    id : id,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(API_BASE_URL+`/login`, data, config);
    return response; 
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return error.response; // 404 
    }
    throw error;
  }
};

const reqSignUp = async (userId, userName) =>{
  const data = {
    userId : userId,
    userName : userName
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try{
    const response = await axios.post(API_BASE_URL+'/signUp', data, config)
    return response;
  }catch (error) {
    throw error
  }
}


export { logIn, reqSignUp };
