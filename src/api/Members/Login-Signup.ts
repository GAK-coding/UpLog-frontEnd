import { EmailInfo, FailLogin, GetUserInfo, LoginInfo, SignUpInfo } from '@/typings/member.ts';
import { instance } from '@/api';
import axios, { AxiosResponse } from 'axios';
import { CustomError } from '@/typings';

export const signUp = async (data: SignUpInfo) => {
  try {
    const res: AxiosResponse<FailLogin | SignUpInfo> = await instance.post('/members', data);

    return res.data;
  } catch (err) {
    return 'signup fail';
  }
};

export const loginUp = async (data: LoginInfo): Promise<GetUserInfo | string> => {
  try {
    const res: AxiosResponse<GetUserInfo> = await instance.post('/members/login', data);

    return res.data;
  } catch (err) {
    return 'login fail';
  }
};

export const emailRequest = async (data: EmailInfo) => {
  try {
    const res: AxiosResponse<{ message: string }> = await instance.post('/members/email-request', {
      email: data.email,
      type: data.type,
    });

    return res.data.message;
  } catch (err) {
    return 'email fail';
  }
};

interface a {
  response: { message: string };
}

export const logout = async (data: { accessToken: string; refreshToken: string }) => {
  try {
    const { accessToken, refreshToken } = data;
    await instance.post('/members/logout', { accessToken, refreshToken });
  } catch (err) {
    // if (axios.isAxiosError(err) && err instanceof CustomError<a>) {
    // }
  }
};
