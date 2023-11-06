import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

//userId must be a metamaskId
const getUserById = (userId) => {
  return axios.get(`${API_BASE_URL}/users/{userId}`);
};

export { getUserById };
