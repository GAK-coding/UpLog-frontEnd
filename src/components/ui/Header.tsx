import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsSunFill } from 'react-icons/bs';

export default function Header() {
  // 로그인 하기 전, border-bottom을 보여주지 않기 위한 로직
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup');

  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(pathname === '/login' || pathname === '/signup');
  }, [pathname]);

  return (
    <header
      className={`flex flex-row justify-between items-center pt-2 h-full ${
        isLogin ? '' : 'border-solid border-b border-header-gray'
      }`}
    >
      {/*로고 + 글자 (메인페이지로 이동)*/}
      <nav className={'flex flex-row cursor-pointer ml-32'} onClick={() => navigate('/')}>
        <img className={'mr-4 h-12'} src={'/images/mainLogo.png'} alt={'main-logo'} />
        <span className={'flex justify-center items-center font-logo text-4xl font-bold'}>
          upLog
        </span>
      </nav>

      {/*로그인하지 않은상태*/}
      {!isLogin && (
        <div
          className={'flex mr-12 font-bold items-center cursor-pointer border-solid border black'}
        >
          <BsSunFill className={'text-3xl mr-4 fill-dark-gray'} />
          <span className={'text-bold text-dark-gray text-lg'} onClick={() => navigate('/login')}>
            로그인 •
          </span>

          <span className={'text-dark-gray text-lg'} onClick={() => navigate('/signup')}>
            &nbsp; 회원가입
          </span>
        </div>
      )}

      {/*로그인 후*/}
      {isLogin && (
        <div
          className={'flex mr-12 font-bold items-center cursor-pointer border-solid border black'}
        >
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
