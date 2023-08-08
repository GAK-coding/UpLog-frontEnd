import { atom } from 'recoil';

export const themeState = atom<boolean>({
  key: 'themeState',
  default: localStorage.getItem('theme') === 'dark',
});

export const postEditor = atom<string>({
  key: 'postEditor',
  default: '',
});
