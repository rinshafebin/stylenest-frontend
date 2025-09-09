import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const setUpInterceptors = (token) =>{
  axiosInstance.interceptors.request.use(
    (config)=>{
      if (token){
        config.headers.Authorization =`Bearer ${token}`;
      }
      return config;
    },
    (error)=>Promise.reject(error)
  )
} 

export default axiosInstance;