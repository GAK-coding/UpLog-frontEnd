import axios from 'axios';

const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';
const DEV_BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL;
const DEPLOYMENT_BACKEND_URL = import.meta.env.VITE_DEPLOYMENT_BACKEND_URL;

const URL = isDeployment ? DEPLOYMENT_BACKEND_URL : DEV_BACKEND_URL;
export const instance = axios.create({
  baseURL: URL,
});

// test
instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken'); // localStorage에서 accessToken 값을 가져옴
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // headers에 accessToken을 추가함
    }
    return config;
  },
  (error) => Promise.reject(error)
);
