import { EmailInfo, FailResponse, GetUserInfo, LoginInfo, SignUpInfo } from '@/typings/member.ts';
import axios, { AxiosResponse } from 'axios';

export const signUp = async (data: SignUpInfo) => {
  const res: AxiosResponse<FailResponse | SignUpInfo> = await axios.post('/members', data);
  return res.data;
};

export const loginAPI = async (data: LoginInfo): Promise<GetUserInfo | FailResponse> => {
  const res: AxiosResponse<GetUserInfo | FailResponse> = await axios.post('/members/login', data);
  return res.data;
};

export const emailRequest = async (data: EmailInfo) => {
  const res: AxiosResponse<{ message: string }> = await axios.post('/members/email-request', {
    email: data.email,
    type: data.type,
  });

  return res.data;
};

export const logout = async (data: { accessToken: string }) => {
  const { accessToken } = data;
  await axios.post('/members/logout', { accessToken });
};
