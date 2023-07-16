import { useEffect, useState } from 'react';

interface Theme {
  theme: string;
}
export default function useDarkSide() {
  const [theme, setTheme] = useState<Theme>(localStorage.theme);
  const colorTheme = theme.theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    //html에 light, dark 클래스 적용
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme.theme);

    //localStorage에 theme 저장
    localStorage.setItem('theme', theme.theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
