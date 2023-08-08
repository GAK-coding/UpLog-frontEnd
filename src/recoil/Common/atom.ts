import { atom } from 'recoil';

export const themeState = atom<boolean>({
  key: 'themeState',
  default: localStorage.getItem('theme') === 'dark',
});

export const editorPost = atom<string>({
  key: 'editorPost',
  default: '',
});

export const editorChangeLog = atom<string>({
  key: 'editorChangeLog',
  default: '',
});
