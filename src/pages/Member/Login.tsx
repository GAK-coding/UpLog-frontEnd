import React, { FormEvent, useCallback, useEffect } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import useInput from '@/hooks/useInput.ts';
import { AiOutlineLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useMessage } from '@/hooks/useMessage.ts';
import { GetUserInfo, LoginInfo, SaveUserInfo } from '@/typings/member.ts';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { loginStatus } from '@/recoil/User/atom.ts';
import { useCookies } from 'react-cookie';
import { loginAPI } from '@/api/Members/Login-Signup.ts';
import { useGetAllProduct } from '@/components/Product/hooks/useGetAllProduct.ts';

export default function Login() {
  const { showMessage, contextHolder } = useMessage();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const [cookies, setCookie, removeCookie] = useCookies();

  const { mutate, isSuccess } = useMutation(loginAPI, {
    onSuccess: (data: GetUserInfo | string) => {
      if (typeof data === 'string') {
        showMessage('error', '아이디 또는 비밀번호를 잘못 입력하셨습니다.');
        return;
      }

      const { id, email, nickname, name, position, accessToken, refreshToken, image } = data;
      const userInfo: SaveUserInfo = {
        id,
        nickname,
        name,
        position,
        email,
        image,
      };

      console.log(image);

      sessionStorage.setItem('accessToken', accessToken);
      setCookie('refreshToken', refreshToken, { path: '/' });
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLogin(true);

      // const productList = useGetAllProduct();
      // console.log(productList);
      navigate('/workspace/1', { state: { isLogin: true } });
    },
    onError: () => {
      showMessage('error', '아이디 또는 비밀번호를 잘못 입력하셨습니다.');
    },
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email || !password) {
        showMessage('warning', '이메일과 비밀번호를 입력해주세요.');
        return;
      }

      const loginInfo: LoginInfo = { email, password };
      mutate(loginInfo);
    },
    [email, password]
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

  useEffect(() => {
    if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('userInfo')) navigate('/');
  }, []);

  return (
    <section className={'h-full'}>
      {contextHolder}
      <div className={'w-h-full flex-col-center'}>
        <article>
          <img className={'w-[5.7rem] h-[6.7rem]'} src={'logo.svg'} alt={'logo'} />
        </article>
        <article
          className={
            'flex-row-center border-base w-[37rem] h-[23.5rem] min-h-[23.5rem] shadow-sign-up px-[4.5rem] py-4 my-10'
          }
        >
          <form onSubmit={onSubmit} className={'flex-col-center justify-center w-h-full'}>
            <div
              className={
                'border-solid border-[0.6px] border-gray-border w-full flex flex-col justify-around rounded-xl shadow-sign-up-info mb-[1rem]'
              }
            >
              {/* 이메일 */}
              <span
                className={
                  'w-full h-[4.5rem] flex-row-center border-solid border-b border-gray-border'
                }
              >
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-2xl '}>
                    <MdOutlineMailOutline
                      className={`${email ? 'fill-orange' : 'fill-gray-light'}`}
                    />
                  </span>
                  <input
                    type="text"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder={'이메일'}
                    maxLength={30}
                    className={'w-5/6 h-full text-lg rounded-xl'}
                  />
                </label>
              </span>

              {/*비밀번호*/}
              <span className={'w-full h-[4.5rem] flex-row-center'}>
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-2xl'}>
                    <AiOutlineLock className={`${password ? 'fill-orange' : 'fill-gray-light'}`} />
                  </span>
                  <span className={'w-5/6 h-full flex'}>
                    <input
                      type={'password'}
                      value={password}
                      onChange={onChangePassword}
                      placeholder={'비밀번호'}
                      maxLength={15}
                      className={`w-h-full text-lg rounded-xl`}
                    />
                  </span>
                </label>
              </span>
            </div>

            <button
              className={
                'flex-row-center rounded-md w-[28rem] h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
              }
            >
              로그인
            </button>
          </form>
        </article>

        <article className={'w-[37rem] flex-col-center text-lg font-bold'}>
          <nav
            // className={'flex-row-center w-full border-solid border-b border-gray-spring pb-7 mb-5'}
            className={'flex-row-center w-full pb-7 mb-5'}
          >
            <Link to={'/pwinquiry'} className={'w-[46%] text-right'}>
              <button>비밀번호 찾기</button>
            </Link>
            <div className={'w-[8%] text-center'}>
              <span className={''}>|</span>
            </div>
            <Link to={'/signup'} className={'w-[46%]'}>
              <button>회원가입</button>
            </Link>
          </nav>
          {/*<div className={'flex-col-center w-full'}>*/}
          {/*  <span className={'mb-7 text-lg font-bold'}>간편 로그인</span>*/}
          {/*  <div className={'w-3/5 flex-row-center justify-evenly'}>*/}
          {/*    <button onClick={() => login()}>*/}
          {/*      <img className={'w-12'} src={'google.svg'} alt={'google'} />*/}
          {/*    </button>*/}
          {/*    <button>*/}
          {/*      <img className={'w-12'} src={'kakao.svg'} alt={'kakao'} />*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </article>
      </div>
    </section>
  );
}
