import { useEffect, useState } from 'react';

export default function useDarkSide() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    //html에 light, dark 클래스 적용
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    //localStorage에 theme 저장
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
