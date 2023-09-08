// import axios, { AxiosRequestConfig } from 'axios';
// import moment from 'moment';
// import { useCookies } from 'react-cookie';
//
// const [cookies, setCookie, removeCookie] = useCookies();
// const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
//   // const refreshToken = Cookie.get('refreshToken');
//   const refreshToken = cookies.refreshToken;
//   const accessToken = sessionStorage.getItem('accessToken');
//   const expireAt = sessionStorage.getItem('expiresAt');
//   let token = sessionStorage.getItem('accessToken');
//
//   // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
//   if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
//     const body = {
//       refreshToken,
//       accessToken,
//     };
//
//     // 토큰 갱신 서버통신
//     const { data } = await axios.post('/members/refresh', body);
//
//     token = data.data.accessToken;
//     sessionStorage.setItem('accessToken', data.data.accessToken);
//     sessionStorage.setItem('expiresAt', moment().add(30, 'minutes').format('yyyy-MM-DD HH:mm:ss'));
//   }
//
//   config.headers['Authorization'] = `Bearer ${token}`;
//
//   return config;
// };
//
// const refreshErrorHandle = (err: any) => {
//   removeCookie('refreshToken');
// };
//
// export { refresh, refreshErrorHandle };
