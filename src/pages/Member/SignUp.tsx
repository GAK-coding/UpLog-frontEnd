import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import useInput from '@/hooks/useInput';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from 'react-icons/ai';
import { convertMinutes } from '@/utils/convertMinutes.ts';
import { useMutation } from 'react-query';
import { emailRequest, signUp } from '@/api/Members/Login-Signup.ts';
import { EmailInfo, SignUpInfo } from '@/typings/member.ts';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { message } from '@/recoil/Common/atom.ts';
const time = 300;
export default function SignUp() {
  const [name, onChangeName, setName] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [email, onChangeEmail, setEmail] = useInput('');
  const [auth, onChangeAuth, setAuth] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  // 인증 클릭했는지
  const [isAuthClick, setIsAuthClick] = useState(false);
  // 인증 성공했는지
  const [isAuth, setIsAuth] = useState(false);
  // 개인 기업 선택
  const [isEach, setIsEach] = useState(true);
  const [timer, setTimer] = useState(time);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isCheckPw, setIsCheckPw] = useState(false);
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const navigate = useNavigate();
  const [correctAuthNum, setCorrectAuthNum] = useState('');
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isLogin = useRecoilValue(loginStatus);

  const { mutate: sendAuthNumMutate } = useMutation(emailRequest, {
    onSuccess: (data) => {
      // TODO: 인증번호 지워야됨
      console.log('인증번호', data.message);
      setIsAuthClick(true);
      setCorrectAuthNum(data.message);
      setMessageInfo({ type: 'success', content: '인증번호가 전송되었습니다.' });
      setTimer(time);
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '잠시 후에 다시 시도해주세요.' });
      setIsAuthClick(false);
    },
  });

  const { mutate: signUpMutate, isSuccess } = useMutation(signUp, {
    onSuccess: (data) => {
      if ('message' in data) {
        setMessageInfo({ type: 'warning', content: data.message });
      } else {
        setName('');
        setNickname('');
        setEmail('');
        setAuth('');
        setPassword('');
        setIsAuthClick(false);
        setAuth('');
        setCorrectAuthNum('');
        setIsEach(true);
        setIsPwVisible(false);
        setIsCheckPw(false);

        navigate('/login');
      }
    },
    onError: () => {
      setMessageInfo({ type: 'error', content: '잠시 후에 다시 시도해주세요.' });
    },
  });

  const signUpInfo: SignUpInfo = {
    email,
    password,
    nickname,
    name,
    position: isEach ? 'INDIVIDUAL' : 'COMPANY',
    loginType: 'UPLOG',
  };

  /** 인증번호 전송 함수, 재전송에서도 활용하기 위해서 밖으로 뺌 */
  const sendAuth = useCallback(() => {
    const emailInfo: EmailInfo = { email, type: 0 };
    sendAuthNumMutate(emailInfo);
  }, [email]);

  /** 인증번호 버튼 */
  const onClickIsAuth = useCallback(() => {
    // 인증이 되어있으면 return
    if (isAuth) return;

    if (!email) return setMessageInfo({ type: 'warning', content: '이메일을 입력해주세요.' });

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setMessageInfo({ type: 'warning', content: '이메일이 유효하지 않습니다.' });

      return;
    }

    // 인증 번호 전송
    if (!isAuthClick) {
      sendAuth();

      return;
    }

    const check = auth === correctAuthNum;

    if (check) {
      setIsAuth(true);
      setMessageInfo({ type: 'success', content: '인증되었습니다.' });
    } else {
      setMessageInfo({ type: 'warning', content: '인증번호가 일치하지 않습니다.' });
    }
  }, [isAuthClick, isAuth, email, correctAuthNum, auth]);

  // 개인 기업 선택
  const onClickEach = useCallback((check: boolean) => setIsEach(check), []);
  const onClickPwVisible = useCallback(() => setIsPwVisible((prev) => !prev), []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!name && !nickname && !email && !isAuth && !isCheckPw) {
        setMessageInfo({ type: 'warning', content: '모든 정보를 입력해주세요.' });

        return;
      }

      if (!name) {
        setMessageInfo({ type: 'warning', content: '이름을 입력해주세요.' });
        return;
      }

      if (!nickname) {
        setMessageInfo({ type: 'warning', content: '닉네임을 입력해주세요.' });

        return;
      }

      if (!emailRegex.test(email)) {
        setMessageInfo({ type: 'warning', content: '이메일이 유효하지 않습니다.' });

        return;
      }

      if (!isAuth) {
        setMessageInfo({ type: 'warning', content: '인증번호 확인을 해주세요.' });

        return;
      }

      if (!isCheckPw) {
        setMessageInfo({ type: 'warning', content: '비밀번호를 확인 해주세요.' });

        return;
      }

      signUpMutate(signUpInfo);
    },
    [name, nickname, email, isAuth, isCheckPw, signUpInfo, isSuccess]
  );

  // timer
  useEffect(() => {
    if (isAuthClick && !isAuth) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsAuthClick(false);
            setCorrectAuthNum('');

            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isAuthClick, isAuth]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    setIsCheckPw(regex.test(password));
  }, [password, isCheckPw]);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  return (
    <form onSubmit={onSubmit} className={'h-full flex-col-center'}>
      <section
        className={'border-base w-[37rem] h-[42rem] min-h-[42rem] shadow-sign-up px-[4.5rem] py-4'}
      >
        {/* logo */}
        <article className={'h-[18%] text-3xl flex items-center'}>
          <img className={'h-16 mr-6'} src={'logo.svg'} alt={'login logo'} />
          <h1 className={'font-bold'}>회원가입</h1>
        </article>

        {/* infos */}
        <article className={'h-[82%] flex-col-center justify-evenly mt-[-1rem]'}>
          <div className={'flex-row-center w-full h-2/5'}>
            <div
              className={
                'border-base border-gray-border rounded-md w-h-full flex flex-col justify-around shadow-sign-up-info'
              }
            >
              {/*개인 기업 선택*/}
              <div
                className={
                  'w-full h-1/3 flex-row-center border-solid border-b border-gray-border font-bold'
                }
              >
                <button
                  type={'button'}
                  className={'w-1/2 h-full text-xl border-solid border-r border-gray-border'}
                  onClick={() => onClickEach(true)}
                >
                  <span
                    className={`w-h-full flex-row-center ${
                      isEach ? 'text-black bg-orange rounded-tl' : 'text-gray-light'
                    }`}
                  >
                    개인
                  </span>
                </button>
                <button
                  type={'button'}
                  className={`w-1/2 h-full text-xl ${
                    !isEach ? 'text-black bg-orange rounded-tl' : 'text-gray-light'
                  }`}
                  onClick={() => onClickEach(false)}
                >
                  <span
                    className={`w-h-full flex-row-center ${
                      !isEach ? 'text-black bg-orange rounded-tr' : 'text-gray-light'
                    }`}
                  >
                    기업
                  </span>
                </button>
              </div>
              {/* 이름 */}
              <span
                className={'w-full h-1/3 flex-row-center border-solid border-b border-gray-border'}
              >
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-[1.7rem] '}>
                    <FiUser className={name ? 'stroke-orange' : 'stroke-gray-light'} />
                  </span>
                  <input
                    type="text"
                    data-cy={'nameInput'}
                    value={name}
                    onChange={onChangeName}
                    placeholder={'이름'}
                    maxLength={10}
                    className={'w-5/6 h-full text-lg'}
                  />
                </label>
              </span>
              {/*닉네임*/}
              <span className={'w-full h-1/3 flex-row-center'}>
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-[1.7rem]'}>
                    <FiUser className={nickname ? 'stroke-orange' : 'stroke-gray-light'} />
                  </span>
                  <input
                    type="text"
                    data-cy={'nicknameInput'}
                    value={nickname}
                    onChange={onChangeNickname}
                    placeholder={'닉네임'}
                    maxLength={10}
                    className={'w-5/6 h-full text-lg rounded-br-md'}
                  />
                </label>
              </span>
            </div>
          </div>

          <div className={'flex-row-center w-full h-2/5'}>
            <div
              className={
                'border-base border-gray-border rounded-md w-h-full flex flex-col justify-around shadow-sign-up-info'
              }
            >
              {/* 이메일 */}
              <span
                className={'w-full h-1/3 flex-row-center border-solid border-b border-gray-border'}
              >
                <label className={'w-h-full flex-row-center '}>
                  <span className={'w-1/6 h-full flex-row-center text-[1.7rem]'}>
                    <MdOutlineMailOutline
                      className={emailRegex.test(email) ? 'fill-orange' : 'fill-gray-light'}
                    />
                  </span>
                  <input
                    type="text"
                    data-cy={'emailInput'}
                    value={email}
                    onChange={onChangeEmail}
                    placeholder={'이메일'}
                    maxLength={30}
                    className={'w-5/6 h-full text-lg rounded-tr-md'}
                  />
                </label>
              </span>
              {/* 인증번호 */}
              <span
                className={'w-full h-1/3 flex-row-center border-solid border-b border-gray-border'}
              >
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-[1.7rem]'}>
                    <AiOutlineCheckCircle
                      className={`${isAuth ? 'fill-orange' : 'fill-gray-light'}`}
                    />
                  </span>
                  <span className={'w-5/6 h-full flex'}>
                    <input
                      type="text"
                      data-cy={'authInput'}
                      value={auth}
                      onChange={onChangeAuth}
                      placeholder={'인증번호'}
                      disabled={isAuth}
                      maxLength={10}
                      className={'w-9/12 h-full text-lg disabled:bg-inherit'}
                    />
                    <span className={'w-3/12 h-full flex-col-center justify-evenly'}>
                      <button
                        type={'button'}
                        data-cy={'authButton'}
                        className={'w-16 h-9 rounded text-sm font-bold'}
                        onClick={onClickIsAuth}
                      >
                        <span
                          className={'w-h-full bg-orange rounded-md flex-row-center text-white'}
                        >
                          {isAuthClick ? '확인' : '전송'}
                        </span>
                      </button>
                      {isAuthClick && !isAuth && (
                        <span className={'text-xs text-gray-dark box-border flex-row-center'}>
                          <span className={'text-gray-dark'}>{convertMinutes(timer)}</span>
                          <span className={'text-xs text-gray-dark px-1'}>|</span>
                          <button type={'button'} onClick={sendAuth}>
                            재전송
                          </button>
                        </span>
                      )}
                    </span>
                  </span>
                </label>
              </span>
              {/*비밀번호*/}
              <span className={'w-full h-1/3 flex-row-center'}>
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-[1.7rem]'}>
                    <AiOutlineLock className={`${isCheckPw ? 'fill-orange' : 'fill-gray-light'}`} />
                  </span>
                  <span className={'w-5/6 h-full flex relative'}>
                    <input
                      type={`${isPwVisible ? 'text' : 'password'}`}
                      data-cy={'passwordInput'}
                      value={password}
                      onChange={onChangePassword}
                      placeholder={'비밀번호'}
                      maxLength={15}
                      className={`w-9/12 h-full text-lg`}
                    />
                    <button
                      type={'button'}
                      className={
                        'w-3/12 h-full flex-col-center justify-evenly text-2xl cursor-pointer'
                      }
                      onClick={onClickPwVisible}
                    >
                      {isPwVisible ? (
                        <AiOutlineEyeInvisible className={'fill-gray-light'} />
                      ) : (
                        <AiOutlineEye className={'fill-gray-light'} />
                      )}
                    </button>
                    {!isCheckPw && password && (
                      <span
                        className={'absolute text-[#E06469] text-xs bottom-[2px] left-0'}
                        data-message={'error-password'}
                      >
                        영어/숫자/특수문자 포함, 8~15자로 입력해주세요.
                      </span>
                    )}
                  </span>
                </label>
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* button */}
      <button
        className={
          'flex-row-center rounded-md w-[37rem] h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
        }
        data-cy={'singUpButton'}
      >
        회원가입
      </button>
    </form>
  );
}
