import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsBellFill, BsMoonFill, BsQuestionCircle, BsSearch, BsSunFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import useInput from '@/hooks/useInput.ts';
import { useRecoilState } from 'recoil';
import { loginStatus, profileOpen } from '@/recoil/User/atom.ts';
import { PiCaretUpDownLight } from 'react-icons/pi';
import { productOpen } from '@/recoil/Product/atom.ts';
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter.ts';
import ProductList from '@/components/Product/Info/ProductList.tsx';
import UserProfile from '@/components/Member/Header/UserProfile.tsx';
import { themeState } from '@/recoil/Common/atom.ts';
import { ProductInfo } from '@/typings/product.ts';
import { BiChevronDown } from 'react-icons/bi';

export default function Header() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useRecoilState(themeState);
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);

  // TODO: 실제 userprofile 값으로 변경하기
  const userprofile = '';
  // 검색
  const [searchTag, onChangeSearchTag] = useInput('');
  // 다크모드 localstorage에서 체크
  const [isChecked, setIsChecked] = useState(localStorage.theme === 'dark');
  // 헤더 bottom
  const { pathname } = useLocation();
  // 빈 헤더 페이지 경로
  const [isNoneHeader, setIsNoneHeader] = useState(
    pathname === '/login' || pathname === '/signup' || pathname === '/pwinquiry'
  );

  // 현재 url에서 제품 이름 가져오기
  const parts = pathname.split('/');
  const product = parts[2];

  // 로그인 여부
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);

  // userProfile click
  const [isProfileClick, setIsProfileClick] = useRecoilState(profileOpen);
  // 제품 List click
  const [isProductClick, setIsProductClick] = useRecoilState(productOpen);

  // 검색창에서 엔터를 눌렀을 때, 검색 페이지로 이동
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      navigate(`/search/${searchTag}`);
    }
  };

  // 다크모드 변경
  const themeModeHandler = useCallback(() => {
    if (!isChecked) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
    setIsChecked(!isChecked);
    setDarkMode(!darkMode);
  }, [isChecked, darkMode]);

  // 제품 list click
  const onClickProductList = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsProductClick(!isProductClick);
    },
    [isProductClick]
  );

  // 프로필 clickRef
  const profileRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(profileRef, 'profile');

  // 로그인 하기 전, border-bottom을 보여주지 않기 위한 로직
  useEffect(() => {
    setIsNoneHeader(pathname === '/login' || pathname === '/signup' || pathname === '/pwinquiry');
  }, [pathname]);

  useEffect(() => {
    const nowLogin = !!sessionStorage.getItem('userInfo');
    setIsLogin(nowLogin);

    if (pathname === '/login' || pathname === '/signup') return;

    if (!nowLogin) {
      navigate('/', { replace: true });
    }
  }, [isLogin]);

  return (
    <header
      className={`fixed top-0 flex-row-center justify-between pt-[0.5rem] w-full h-[5.7rem] z-50
      ${isNoneHeader ? 'bg-none-header' : 'border-solid border-b border-header-gray'}`}
    >
      {/*로고 + 글자 (메인페이지로 이동)*/}
      <div
        className={'relative flex-row-center justify-start w-[60%] h-full md:w-auto ml-12 md:ml-12'}
      >
        <nav className={'flex-row-center cursor-pointer'} onClick={() => navigate('/')}>
          <img className={'flex mr-4 h-12'} src={'/images/mainLogo.png'} alt={'main-logo'} />
          <span className={'flex font-logo text-[2.4rem] font-semibold text-gray-dark mt-2'}>
            upLog
          </span>
        </nav>

        {isLogin && product !== '' && (
          <div className={'flex-row-center ml-4 h-full'} onClick={onClickProductList}>
            <div className={'flex-row-center h-9 border-solid border-r border-gray-light'} />
            <div
              className={'flex-row-center cursor-pointer '}
              onClick={() => {
                setIsProductClick(!isProductClick);
              }}
            >
              {pathname !== '/' && (
                <span className={'flex-row-center -mt-2 ml-4 text-[2rem] font-bold text-gray-dark'}>
                  {decodeURI(nowProduct?.productName)}
                </span>
              )}
              <BiChevronDown className={'flex-row-center text-[2rem] fill-gray-light ml-2'} />
              {isProductClick && <ProductList />}
            </div>
          </div>
        )}
      </div>

      {/*TODO : 스토리지 값 체크후에 변경하기 (조건으로 렌더링 여부 바꿔야함)*/}
      {/*로그인 상태*/}
      {isLogin && (
        <div
          className={
            'flex-row-center justify-end gap-6 w-[40%] h-full mr-4 md:mr-12 font-bold items-center '
          }
        >
          {/*검색창*/}
          <div
            className={
              'flex-row-center justify-between w-48 h-3/5 p-2 border-solid border border-gray-light rounded-lg hidden md:flex'
            }
          >
            <BsSearch className={'ml-2 text-base fill-gray-dark '} />

            <input
              type="text"
              value={searchTag}
              onChange={onChangeSearchTag}
              onKeyDown={(e) => activeEnter(e)}
              placeholder={'태그 검색'}
              maxLength={20}
              required
              className={`w-[8.7rem] h-full font-medium text-gray-dark ${
                isChecked ? 'bg-[#292723]' : 'bg-[#ffffff]'
              }`}
            />
          </div>
          {/*아이콘*/}
          <div className={'text-[2rem] '} onClick={themeModeHandler}>
            {isChecked ? (
              <BsMoonFill className={'fill-gray-dark cursor-pointer'} />
            ) : (
              <BsSunFill className={'fill-gray-dark cursor-pointer'} />
            )}
          </div>
          <BsBellFill
            className={'text-[2rem] fill-gray-dark cursor-pointer'}
            onClick={() => navigate('/')}
          />
          <BsQuestionCircle
            className={'text-[2rem] fill-gray-dark cursor-pointer'}
            onClick={() => navigate('/')}
          />

          <div className={'relative'} ref={profileRef}>
            {!userprofile ? (
              <FaUserCircle
                className={'text-[2.1rem] fill-gray-dark cursor-pointer'}
                onClick={() => setIsProfileClick(!isProfileClick)}
              />
            ) : (
              <img
                src={userprofile}
                alt="userprofile"
                onClick={() => setIsProfileClick(!isProfileClick)}
                className={'w-[2.1rem] h-[2.1rem] cursor-pointer ml-3'}
              />
            )}
            {isProfileClick && <UserProfile />}
          </div>
        </div>
      )}

      {/*로그인 X */}
      {!isLogin && !isNoneHeader && (
        <div className={'flex mr-12 font-bold'}>
          <div className={'text-[1.8rem] mr-6'} onClick={themeModeHandler}>
            {isChecked ? (
              <BsMoonFill className={'fill-gray-dark cursor-pointer'} />
            ) : (
              <BsSunFill className={'fill-gray-dark cursor-pointer'} />
            )}
          </div>

          <span
            className={'flex self-end text-gray-dark text-xl cursor-pointer'}
            onClick={() => navigate('/login')}
          >
            로그인
          </span>
          <span className={'flex self-end text-gray-dark text-xl'}>&nbsp;•</span>
          <span
            className={'flex self-end text-gray-dark text-xl cursor-pointer'}
            onClick={() => navigate('/signup')}
          >
            &nbsp;회원가입
          </span>
        </div>
      )}
    </header>
  );
}
