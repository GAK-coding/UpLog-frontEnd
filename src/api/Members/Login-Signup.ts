import axios from 'axios';
import { SignUpInfo } from '@/typings/member.ts';

export const signUp = async (data: SignUpInfo) => {
  try {
    const res = await axios.post('http://localhost:8080/members', data);
    return res;
  } catch (err) {
    console.error(err);
  }
};
