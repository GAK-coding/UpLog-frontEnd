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
      className={`flex flex-row justify-between items-center ml-32 mr-6 pt-2 h-full border-solid border-red-400 ${
        isLogin ? '' : 'border-solid border border-header-gray'
      }`}
    >
      {/*<Link to={'/'}>*/}
      <div className={'flex flex-row border-solid border-red-400'}>
        <img
          className={'mr-4 h-12 border-solid border black'}
          src={'/images/mainLogo.png'}
          alt={'main-logo'}
        />
        <nav className={'font-logo text-4xl font-bold border-solid border black'}>upLog</nav>
      </div>
      {/*</Link>*/}

      {!isLogin && (
        <div className={'flex border-solid border-red-400'}>
          <Link to={'/login'} className={''}>
            로그인 •
          </Link>

          <Link to={'/signup'} className={''}>
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
}
