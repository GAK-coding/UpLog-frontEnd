import { atom } from 'recoil';

export const themeState = atom<boolean>({
  key: 'themeState',
  default: localStorage.getItem('theme') === 'dark',
});
