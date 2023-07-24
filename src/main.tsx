import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import loadable from '@loadable/component';

const App = loadable(() => import('@layouts/App.tsx'));

if (localStorage.theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <GlobalStyles />
    <App />
  </>
);
