import { atom } from 'recoil';
import { UserInfo } from '@/typings/member.ts';

export const loginStatus = atom({ key: 'loginStatus', default: false });
export const profileOpen = atom({ key: 'profileOpen', default: false });

export const user = atom<UserInfo>({
  key: 'key',
  default: JSON.parse(sessionStorage.getItem('userInfo')!) ?? {},
});
