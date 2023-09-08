import axios from 'axios';
import Cookies from 'js-cookie';

const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';
const DEV_BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL;
const DEPLOYMENT_BACKEND_URL = import.meta.env.VITE_DEPLOYMENT_BACKEND_URL;

const URL = isDeployment ? DEPLOYMENT_BACKEND_URL : DEV_BACKEND_URL;
export const instance = axios.create({
  baseURL: URL,
});

// const [cookies, setCookie, removeCookie] = useCookies();
export async function reissuanceJwt() {
  const refreshToken = Cookies.get('refreshToken');
  const accessToken = sessionStorage.getItem('accessToken');

  const res = await axios.post(`${URL}/members/refresh`, { refreshToken, accessToken });

  return res;
}

//토큰을 함께보내는 privateApi에 interceptor를 적용합니다
instance.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => {
    return response;
  },
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    //토큰이 만료되을 때
    if (status === 401) {
      console.log(error);
      // if (error.response.data.message === 'Unauthorized') {
      const originRequest = config;
      //리프레시 토큰 api
      const response = await reissuanceJwt();
      //리프레시 토큰 요청이 성공할 때
      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
        sessionStorage.setItem('accessToken', response.data.accessToken);
        // setCookie('refreshToken', response.data.refreshToken);
        Cookies.set('refreshToken', response.data.refreshToken, { expires: 14, path: '/' });
        // localStorage.setItem('refreshToken', response.data.refreshToken);
        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        //진행중이던 요청 이어서하기
        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originRequest);
        //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
      } else if (response.status === 404) {
        alert('로그인 다시 해주세요.');
        window.location.replace('/login');
      } else {
        alert('로그인 다시 해주세요.');
      }
    }
    // }
    return Promise.reject(error);
  }
);

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
