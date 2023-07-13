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
      className={`flex flex-row pt-5 h-full ${
        isLogin ? '' : 'border-solid border border-header-gray'
      }`}
    >
      <div className={'flex flex-row'}>
        <Link to={'/'} className={'border-solid border black'}>
          <img
            className={'mr-4 h-12 ml-32 border-solid border black'}
            src={'/images/mainLogo.png'}
            alt={'main-logo'}
          />
          {/*<nav*/}
          {/*  className={*/}
          {/*    'font-['"Baloo Tammudu 2", "cursive"'] text-4xl font-bold border-solid border black'*/}
          {/*  }*/}
          {/*>    */}
          <nav
            className={
              'font-["Baloo Tammudu 2", "cursive"] text-4xl font-bold border-solid border black'
            }
          >
            upLog
          </nav>
        </Link>
      </div>

      {!isLogin && (
        <>
          <div className={'flex flex-end'}>
            <Link to={'/login'} className={'border-solid border black'}>
              로그인 •
            </Link>

            <Link to={'/signup'} className={'border-solid border black'}>
              회원가입
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
