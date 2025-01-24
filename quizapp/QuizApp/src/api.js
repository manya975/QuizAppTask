import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8787/basicLoginSignupProject/login.jsp', 
});

export default api;
