import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import loadable from '@loadable/component';
import { RecoilRoot } from 'recoil';
import { worker } from '@/mock/browser.ts';

const App = loadable(() => import('@/layouts/App.tsx'));

if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

if (import.meta.env.VITE_IS_MSW === 'true') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <GlobalStyles />
    <App />
  </RecoilRoot>
);
