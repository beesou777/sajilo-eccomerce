
import axios from 'axios';
import Cookies from  "js-cookie"
// // Set the base URL for all requests
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Set the Authorization header dynamically with the token from cookies
axios.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default axios;
