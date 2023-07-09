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
    <header className={` ${isLogin ? '' : 'border-solid border-b-2 border-header-gray'} `}>
      <Link to={'/'}>홈</Link> <br />
      <Link to={'/login'}>로그인</Link> <br />
      <Link to={'/signup'}>회원가입</Link>
    </header>
  );
}
