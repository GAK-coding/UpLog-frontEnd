import { EmailInfo, FailLogin, GetUserInfo, LoginInfo, SignUpInfo } from '@/typings/member.ts';
import axios, { AxiosResponse } from 'axios';

export const signUp = async (data: SignUpInfo) => {
  const res: AxiosResponse<FailLogin | SignUpInfo> = await axios.post('/members', data);

  return res.data;
};

export const loginAPI = async (data: LoginInfo): Promise<GetUserInfo | string> => {
  try {
    const res: AxiosResponse<GetUserInfo> = await axios.post('/members/login', data);

    return res.data;
  } catch (err) {
    return 'login fail';
  }
};

export const emailRequest = async (data: EmailInfo) => {
  const res: AxiosResponse<{ message: string }> = await axios.post('/members/email-request', {
    email: data.email,
    type: data.type,
  });

  return res.data;
};

export const logout = async (data: { accessToken: string; refreshToken: string }) => {
  try {
    const { accessToken, refreshToken } = data;
    await axios.post('/members/logout', { accessToken, refreshToken });
  } catch (err) {
    // if (axios.isAxiosError(err) && err instanceof CustomError<a>) {
    // }
  }
};
