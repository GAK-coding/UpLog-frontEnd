import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  // 로그인, 회원가입이면 border-bottom을 보여주지 않기 위한 로직
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup');

  useEffect(() => {
    setIsLogin(pathname === '/login' || pathname === '/signup');
  }, [pathname]);

  return (
    <header
      className={`pt-5 flex-row h-full ${
        isLogin ? '' : 'border-solid border-b-2 border-header-gray'
      }`}
    >
      <img
        className={'h-12 ml-32'}
        src={'/images/mainLogo.png'}
        alt={'main-logo'}
        style={{ fontFamily: 'Baloo Tammudu 2' }}
      />
      <nav>upLog</nav>
      <Link to={'/'}>홈</Link> <br />
      <Link to={'/login'}>로그인</Link> <br />
      <Link to={'/signup'}>회원가입</Link>
    </header>
  );
}
