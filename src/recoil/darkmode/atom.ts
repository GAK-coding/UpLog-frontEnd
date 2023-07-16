import { atom } from 'recoil';
import { ThemeEnums } from '../../types/darkmode.ts';

const { LIGHT, DARK } = ThemeEnums;

export const getTheme = (): ThemeEnums => {
  const theme: number = Number(localStorage.getItem('theme'));

  if (theme === DARK) {
    return DARK;
  }

  // localStorage에 있는 값이 DARK가 아니라면, 모든 경우에도 LIGHT를 반환함
  return LIGHT;
};

export const themeMode = atom<ThemeEnums>({
  // 기본값은 localStorage에 있는 값에 따라 설정함
  key: 'themeMode',
  default: getTheme(),
});
