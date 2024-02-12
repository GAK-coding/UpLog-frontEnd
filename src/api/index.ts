import axios from 'axios';

const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';
const DEV_BACKEND_URL = import.meta.env.VITE_DEV_BACKEND_URL;
const DEPLOYMENT_BACKEND_URL = import.meta.env.VITE_DEPLOYMENT_BACKEND_URL;

const URL = isDeployment ? DEPLOYMENT_BACKEND_URL : DEV_BACKEND_URL;
let accessToken: string;

export const instance = axios.create({
  // baseURL: URL,
  withCredentials: true,
});

export async function reissuanceJwt() {
  const res = await axios.post(`/members/refresh`, null, { withCredentials: true });
  return res;
}

// 토큰을 함께보내는 privateApi에 interceptor를 적용합니다
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
    if (status === 409 || status === 410) {
      const originRequest = config;
      const response = await reissuanceJwt();

      //리프레시 토큰 요청이 성공할 때
      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
        accessToken = newAccessToken;

        //진행중이던 요청 이어서하기
        originRequest.headers.Authorization = `Access=${newAccessToken}`;
        return axios(originRequest);
        //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
      } else {
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Access=${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
