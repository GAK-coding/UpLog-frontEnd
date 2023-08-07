import { SignUpInfo } from '@/typings/member.ts';
import { instance } from '@/api';

export const signUp = async (data: SignUpInfo) => {
  try {
    await instance.post('/members', data);
    return '회원가입 성공';
  } catch (err) {
    return '회원가입 실패';
  }
};
