import { atom } from 'recoil';

export const postMain = atom({
  key: 'postMain',
  default: true,
});

export const postTagList = atom<string[]>({ key: 'postTagList', default: [] });
