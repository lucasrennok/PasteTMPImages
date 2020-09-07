import axios from 'axios';

//It is exported to connect to the API
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;