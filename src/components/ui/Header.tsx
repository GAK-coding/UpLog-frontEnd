import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsBellFill, BsQuestionCircle, BsSearch, BsSunFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  // 로그인 하기 전, border-bottom을 보여주지 않기 위한 로직
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState(pathname === '/login' || pathname === '/signup');

  const navigate = useNavigate();

  // TODO: 실제 userprofile 값으로 변경하기
  const userprofile = '';

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
      <div className={'flex ml-32'}>
        <nav className={'flex flex-row cursor-pointer'} onClick={() => navigate('/')}>
          <img className={'mr-4 h-12'} src={'/images/mainLogo.png'} alt={'main-logo'} />
          <span
            className={
              'flex justify-items-center items-center font-logo text-[2.5rem] font-semibold text-gray-dark'
            }
          >
            upLog
          </span>
        </nav>

        {/*TODO : 스토리지 값 체크후에 변경하기 (조건으로 렌더링 여부 바꿔야함)*/}
        <div
          className={
            'flex flex-row justify-center items-center ml-4 h-11 border-solid border-r border-header-gray'
          }
        ></div>
      </div>

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
        <div
          className={
            'flex w-[31rem] h-full justify-between mr-12 font-bold items-center border-solid border black'
          }
        >
          <div className={'w-48 mt-1.5 h-3/5 border-solid border border-gray-light rounded-lg'}>
            <BsSearch className={'text-2xl fill-gray-dark '} />
          </div>
          <BsSunFill className={'text-[2.5rem] fill-gray-dark cursor-pointer'} />
          <BsBellFill className={'text-[2.5rem] fill-gray-dark cursor-pointer'} />
          <BsQuestionCircle className={'text-[2.5rem] fill-gray-dark cursor-pointer'} />
          {userprofile === '' ? (
            <FaUserCircle className={'text-[2.5rem] fill-gray-dark cursor-pointer'} />
          ) : (
            <img src={userprofile} alt="userprofile" className={'h-[2.6rem] cursor-pointer'} />
          )}
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
