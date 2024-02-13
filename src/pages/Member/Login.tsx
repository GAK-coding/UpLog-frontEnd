import React, { FormEvent, useCallback, useEffect } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import useInput from '@/hooks/useInput.ts';
import { AiOutlineLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FailResponse, GetUserInfo, LoginInfo, UserInfo } from '@/typings/member.ts';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { loginStatus, user } from '@/recoil/User/atom.ts';
import { loginAPI, logout } from '@/api/Members/Login-Signup.ts';
import { message } from '@/recoil/Common/atom.ts';
import { useGetAllProduct } from '@/components/Product/hooks/useGetAllProduct';
import { decrypt, encrypt } from '../../utils/crypto';

export default function Login() {
  const [messageInfo, setMessageInfo] = useRecoilState(message);

  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const [userInfo, setUserInfo] = useRecoilState(user);

  const { mutate } = useMutation(loginAPI, {
    onSuccess: (data: GetUserInfo | FailResponse) => {
      if ('message' in data) {
        setMessageInfo({ type: 'error', content: '아이디 또는 비밀번호를 잘못 입력하셨습니다.' });
        return;
      }

      const { id, email, nickname, name, position, accessToken, image } = data;
      const userInfo: UserInfo = {
        id,
        nickname,
        name,
        position,
        email,
        image,
        auth: encrypt(import.meta.env.VITE_USERINFO_AUTH),
      };

      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLogin(true);
      setUserInfo(userInfo);

      navigate('/workspace/-1');
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '잠시후에 다시 시도해주세요.' });
    },
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email && !password) {
        setMessageInfo({ type: 'warning', content: '이메일과 비밀번호를 입력해주세요.' });
        return;
      }

      if (!email) {
        setMessageInfo({ type: 'warning', content: '이메일을 입력해주세요.' });
        return;
      }

      if (!password) {
        setMessageInfo({ type: 'warning', content: '비밀번호를 입력해주세요.' });
        return;
      }

      const loginInfo: LoginInfo = { email, password };
      mutate(loginInfo);
    },
    [email, password]
  );

  // 세션 스토리지의 userInfo가 조작되면 로그아웃
  useEffect(() => {
    if (isLogin && !(decrypt(userInfo.auth) === import.meta.env.VITE_USERINFO_AUTH)) {
      setIsLogin(false);
      navigate('/');
    }
  }, [isLogin, userInfo]);

  return (
    <section className={'h-full'}>
      {/*{contextHolder}*/}
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
                    data-cy="emailInput"
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
                      data-cy="passwordInput"
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
              data-cy="LoginButton"
            >
              로그인
            </button>
          </form>
        </article>

        <article className={'w-[37rem] flex-col-center text-lg font-bold'}>
          <nav className={'flex-row-center w-full pb-7 mb-5'}>
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
        </article>
      </div>
    </section>
  );
}
