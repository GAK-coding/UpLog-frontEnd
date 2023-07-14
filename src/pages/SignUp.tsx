import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
} from 'react-icons/ai';
import { convertMinutes } from '../utils/convertMinutes.ts';
import { useMessage } from '../hooks/useMessage.ts';
const time = 300;
export default function SignUp() {
  const [name, onChangeName, setName] = useInput('');
  const [nickName, onChangeNickName, setNickName] = useInput('');
  const [email, onChangeEmail, setEmail] = useInput('');
  const [auth, onChangeAuth, setAuth] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  // 인증 클릭했는지
  const [isAuthClick, setIsAuthClick] = useState(false);
  // 인증 성공했는지
  const [isAuth, setIsAuth] = useState(false);
  const [timer, setTimer] = useState(time);
  // 개인 기업 선택
  const [isEach, setIsEach] = useState(true);
  const [isPwVisible, setIsPwVisible] = useState(false);
  const [isCheckPw, setIsCheckPw] = useState(false);
  const { showMessage, contextHolder } = useMessage();

  /** 인증번호 전송 함수, 재전송에서도 활용하기 위해서 밖으로 뺌 */
  const sendAuth = useCallback(() => {
    //TODO: 인증번호 전송

    showMessage('success', '인증번호가 전송되었습니다.');
    setTimer(time);
  }, []);

  /** 인증번호 버튼 */
  const onClickIsAuth = useCallback(() => {
    // 인증이 되어있으면 return
    if (isAuth) return;

    if (!email) return showMessage('warning', '이메일을 입력해주세요.');

    // 인증 번호 전송
    if (!isAuthClick) {
      sendAuth();

      setIsAuthClick(true);
      return;
    }

    // TODO: 인증번호 확인, 이메일 입력됐는지 확인 + 이메일 유효성 검사
    const check = true;

    if (check) {
      setIsAuth(true);
      showMessage('success', '인증되었습니다.');
    } else {
      showMessage('warning', '인증번호가 일치하지 않습니다.');
    }
  }, [isAuthClick, isAuth, email]);

  // 개인 기업 선택
  const onClickEach = useCallback((check: boolean) => setIsEach(check), []);
  const onClickPwVisible = useCallback(() => setIsPwVisible((prev) => !prev), []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!name || !nickName || !email || !isAuth || !isCheckPw) {
        showMessage('warning', '모든 정보를 입력해주세요.');

        return;
      }

      showMessage('success', '잘됨.');
    },
    [name, nickName, email, isAuth, isCheckPw]
  );

  // timer
  useEffect(() => {
    if (isAuthClick && !isAuth) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsAuthClick(false);

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

  return (
    <form onSubmit={onSubmit} className={'h-full flex-col-center min-h-[55rem]'}>
      {contextHolder}
      <section
        className={
          'border-solid border-[0.6px] border-header-gray w-[39rem] h-[42rem] min-h-[42rem] shadow-sign-up px-20'
        }
      >
        {/* logo */}
        <article className={'h-[18%] text-3xl flex items-center'}>
          <img className={'h-16 mr-6'} src={'logo.svg'} alt={'login logo'} />
          <span className={'font-bold'}>회원가입</span>
        </article>

        {/* infos */}
        <article className={'h-[82%] flex-col-center justify-evenly mt-[-1rem]'}>
          <div className={'flex-row-center w-full h-2/5'}>
            <div
              className={
                'border-base border-gray-light rounded-md w-h-full flex flex-col justify-around shadow-sign-up-info'
              }
            >
              {/*개인 기업 선택*/}
              <div
                className={
                  'w-full h-1/3 flex-row-center border-solid border-b border-gray-light font-bold'
                }
              >
                <button
                  type={'button'}
                  className={'w-1/2 h-full text-xl border-solid border-r border-gray-light'}
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
                className={'w-full h-1/3 flex-row-center border-solid border-b border-gray-light'}
              >
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-3xl '}>
                    <FiUser className={name ? 'stroke-orange' : 'stroke-gray-light'} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={onChangeName}
                    placeholder={'이름'}
                    maxLength={10}
                    required
                    className={'w-5/6 h-full text-xl'}
                  />
                </label>
              </span>
              {/*닉네임*/}
              <span className={'w-full h-1/3 flex-row-center'}>
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-3xl'}>
                    <FiUser className={nickName ? 'stroke-orange' : 'stroke-gray-light'} />
                  </span>
                  <input
                    type="text"
                    value={nickName}
                    onChange={onChangeNickName}
                    placeholder={'닉네임'}
                    maxLength={10}
                    required
                    className={'w-5/6 h-full text-xl rounded-br-md'}
                  />
                </label>
              </span>
            </div>
          </div>

          <div className={'flex-row-center w-full h-2/5'}>
            <div
              className={
                'border-base border-gray-light rounded-md w-h-full flex flex-col justify-around shadow-sign-up-info'
              }
            >
              {/* 이메일 */}
              <span
                className={'w-full h-1/3 flex-row-center border-solid border-b border-gray-light'}
              >
                <label className={'w-h-full flex-row-center '}>
                  <span className={'w-1/6 h-full flex-row-center text-3xl '}>
                    <MdOutlineMailOutline className={email ? 'fill-orange' : 'fill-gray-light'} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder={'이메일'}
                    required
                    maxLength={30}
                    className={'w-5/6 h-full text-xl rounded-tr-md'}
                  />
                </label>
              </span>
              {/* 인증번호 */}
              <span
                className={'w-full h-1/3 flex-row-center border-solid border-b border-gray-light'}
              >
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-3xl'}>
                    <AiOutlineCheckCircle
                      className={`${isAuth ? 'fill-orange' : 'fill-gray-light'}`}
                    />
                  </span>
                  <span className={'w-5/6 h-full flex'}>
                    <input
                      type="text"
                      value={auth}
                      onChange={onChangeAuth}
                      placeholder={'인증번호'}
                      required
                      disabled={isAuth}
                      maxLength={10}
                      className={'w-9/12 h-full text-xl disabled:bg-inherit'}
                    />
                    <span className={'w-3/12 h-full flex-col-center justify-evenly'}>
                      <button
                        type={'button'}
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
                        <span className={'text-xs text-gray-dark box-border'}>
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
                  <span className={'w-1/6 h-full flex-row-center text-3xl'}>
                    <AiOutlineLock className={`${isCheckPw ? 'fill-orange' : 'fill-gray-light'}`} />
                  </span>
                  <span className={'w-5/6 h-full flex relative'}>
                    <input
                      type={`${isPwVisible ? 'text' : 'password'}`}
                      value={password}
                      onChange={onChangePassword}
                      placeholder={'비밀번호'}
                      maxLength={15}
                      required
                      className={`w-9/12 h-full text-xl ${
                        password && !isPwVisible && 'tracking-[-0.3rem]'
                      }`}
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
                    <span className={'absolute text-[#E06469] text-xs bottom-[2px] left-0'}>
                      {!isCheckPw && password && '영어/숫자/특수문자 포함, 8~15자로 입력해주세요.'}
                    </span>
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
          'flex-row-center border-base border-header-gray rounded-md w-[39rem] h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
        }
      >
        회원가입
      </button>
    </form>
  );
}
