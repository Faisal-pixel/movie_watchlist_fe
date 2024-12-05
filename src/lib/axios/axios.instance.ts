import axios from "axios";
import { getToken } from "../../auth/auth";

// Then no we need to create an axios instance

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // This is the base URL of the API that we defined in the .env
    timeout: 10000, // This is the timeout for the request. That is if no response is sent back in 10seconds, throw an error
});

// We need to add a request interceptor to add the token to the request

axiosInstance.interceptors.request.use(
    // This recieves two function, the first one receives a config object sent by axios which contains the request details
    // The second is an error function that will be called if there is an error
    (config) => {
        const token = getToken(); // This gets the token from the cookie
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`; // This adds the token to the header
        }
        
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
)

// Then we can add a response to handle errors globally

axiosInstance.interceptors.response.use(
    (response) => response, // This returns the response if there is no error
    (error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          
        }
        return Promise.reject(error);
      }
)

export default axiosInstance;