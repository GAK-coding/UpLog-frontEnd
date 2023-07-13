import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsSunFill } from 'react-icons/bs';

export default function Header() {
  // 로그인 하기 전, border-bottom을 보여주지 않기 위한 로직
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup');

  const navigate = useNavigate();

  const userprofile = '/images/test_userprofile.png';

  useEffect(() => {
    setIsLogin(pathname === '/login' || pathname === '/signup');
  }, [pathname]);

  return (
    <header
      className={`flex flex-row justify-between items-center pt-[1.7rem] h-full ${
        isLogin ? '' : 'border-solid border-b border-header-gray'
      }`}
    >
      {/*로고 + 글자 (메인페이지로 이동)*/}
      <nav className={'flex flex-row cursor-pointer ml-32'} onClick={() => navigate('/')}>
        <img className={'mr-4 h-12'} src={'/images/mainLogo.png'} alt={'main-logo'} />
        <span
          className={
            'flex justify-center items-center font-logo text-[30px] font-semibold text-gray-dark'
          }
        >
          upLog
        </span>
        {/*TODO : 스토리지 값 체크후에 변경하기*/}

        <div
          className={
            'flex justify-center items-center ml-4 h-11 border-solid border-r border-header-gray'
          }
        ></div>
      </nav>

      {/*로그인하지 않은상태*/}
      {!isLogin && (
        // <div className={'flex mr-12 font-bold items-center border-solid border black'}>
        //   <BsSunFill className={'text-3xl mr-4 fill-gray-dark cursor-pointer'} />
        //   <span
        //     className={'font-bold text-gray-dark text-lg cursor-pointer'}
        //     onClick={() => navigate('/login')}
        //   >
        //     로그인&nbsp;
        //   </span>
        //   <span className={'text-bold text-gray-dark text-lg'}>•</span>
        //   <span
        //     className={'text-gray-dark text-lg cursor-pointer'}
        //     onClick={() => navigate('/signup')}
        //   >
        //     &nbsp; 회원가입
        //   </span>
        // </div>
        <div className={'flex mr-12 font-bold items-center border-solid border black'}>
          <img src={userprofile} alt="userprofile" className={'h-11'} />
          {/*<BsSunFill className={'text-3xl mr-4 fill-gray-dark cursor-pointer'} />*/}
          {/*<span*/}
          {/*  className={'font-bold text-gray-dark text-lg cursor-pointer'}*/}
          {/*  onClick={() => navigate('/login')}*/}
          {/*>*/}
          {/*  로그인&nbsp;*/}
          {/*</span>*/}
          {/*<span className={'text-bold text-gray-dark text-lg'}>•</span>*/}
          {/*<span*/}
          {/*  className={'text-gray-dark text-lg cursor-pointer'}*/}
          {/*  onClick={() => navigate('/signup')}*/}
          {/*>*/}
          {/*  &nbsp; 회원가입*/}
          {/*</span>*/}
        </div>
      )}

      {/*로그인 후*/}
      {isLogin && (
        <div
          className={'flex mr-12 font-bold items-center cursor-pointer border-solid border black'}
        >
          <BsSunFill className={'text-3xl mr-4 fill-gray-dark'} />
          <span className={'text-bold text-gray-dark text-lg'} onClick={() => navigate('/login')}>
            로그인 •
          </span>

          <span className={'text-gray-dark text-lg'} onClick={() => navigate('/signup')}>
            &nbsp; 회원가입
          </span>
        </div>
      )}
    </header>
  );
}
