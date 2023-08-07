import { SignUpInfo } from '@/typings/member.ts';
import { instance } from '@/api';

export const signUp = async (data: SignUpInfo) => {
  try {
    const res = await instance.post('/members', data);
    return res;
  } catch (err) {
    console.error(err);
  }
};
