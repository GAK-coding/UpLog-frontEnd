import { atom } from 'recoil';
import { UserInfo } from '@/typings/member.ts';
import { decrypt } from '@/utils/crypto.ts';

export const profileOpen = atom({ key: 'profileOpen', default: false });

const userInfo = decrypt(sessionStorage.getItem('userInfo'));
export const user = atom<UserInfo | null>({
  key: 'user',
  default: userInfo ? JSON.parse(userInfo) : null,
});
