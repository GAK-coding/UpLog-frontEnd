import axios from 'axios';

const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';
const DEV_BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL;
const DEPLOYMENT_BACKEND_URL = import.meta.env.VITE_DEPLOYMENT_BACKEND_URL;

const URL = isDeployment ? DEPLOYMENT_BACKEND_URL : DEV_BACKEND_URL;
const jwt = sessionStorage.getItem('accessToken');
export const instance = axios.create({
  baseURL: URL,
  headers: { Authorization: `Bearer ${jwt}` },
});
