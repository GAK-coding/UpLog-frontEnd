import { LoginInfo, SignUpInfo, GetUserInfo } from '@/typings/member.ts';
import { instance } from '@/api';
import { AxiosResponse } from 'axios';

export const signUp = async (data: SignUpInfo) => {
  try {
    await instance.post('/members', data);
    return '회원가입 성공';
  } catch (err) {
    return '회원가입 실패';
  }
};

export const loginUp = async (data: LoginInfo): Promise<GetUserInfo> => {
  try {
    const res = await instance.post('/members/login', data);

    return res.data;
  } catch (err) {
    console.log('회원가입 실패');
    throw err;
  }
};
