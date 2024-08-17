import axios from'axios';

constAxiosInstance = axios.create({
    baseURL: '/api', 
    timeout: 1000,
});

export default AxiosInstance;
