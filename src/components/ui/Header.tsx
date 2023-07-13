import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSunFill } from 'react-icons/bs';

export default function Header() {
  // 로그인, 회원가입이면 border-bottom을 보여주지 않기 위한 로직
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup');

  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(pathname === '/login' || pathname === '/signup');
  }, [pathname]);

  return (
    <header
      className={`flex flex-row justify-between items-center ml-32 mr-12 pt-2 h-full border-solid border-red-400 ${
        isLogin ? '' : 'border-solid border border-header-gray'
      }`}
    >
      <nav
        className={'flex flex-row border-solid border-red-400 cursor-pointer'}
        onClick={() => navigate('/')}
      >
        <img
          className={'mr-4 h-12 border-solid border black'}
          src={'/images/mainLogo.png'}
          alt={'main-logo'}
        />
        <span
          className={
            'flex justify-center items-center font-logo text-4xl font-bold border-solid border black'
          }
        >
          upLog
        </span>
      </nav>

      {!isLogin && (
        <div className={'flex border-solid border black font-bold items-center cursor-pointer'}>
          <BsSunFill className={'text-3xl mr-4 fill-dark-gray'} />
          <span className={'text-bold text-dark-gray text-lg'} onClick={() => navigate('/login')}>
            로그인 •
          </span>

          <span className={'text-dark-gray text-lg'} onClick={() => navigate('/signup')}>
            &nbsp; 회원가입
          </span>
        </div>
      )}
    </header>
  );
}
