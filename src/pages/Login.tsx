import React, { FormEvent, useCallback } from 'react';
import { useMessage } from '../hooks/useMessage.ts';
import { MdOutlineMailOutline } from 'react-icons/md';
import useInput from '../hooks/useInput.ts';
import { AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Login() {
  const { showMessage, contextHolder } = useMessage();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) showMessage('warning', '이메일과 비밀번호를 입력해주세요.');
  }, []);

  return (
    <section className={'h-full min-h-[55rem] mt-[-1.7rem]'}>
      {contextHolder}
      <div className={'w-h-full flex-col-center'}>
        <article>
          <img className={'w-[6.7rem] h-[7.7rem]'} src={'logo.svg'} alt={'로고'} />
        </article>
        <article
          className={
            'flex-row-center border-solid border-[0.6px] border-header-gray w-[39rem] h-[23.5rem] min-h-[23.5rem] shadow-sign-up px-20 my-10'
          }
        >
          <form onSubmit={onSubmit} className={'flex-col-center justify-center w-h-full'}>
            <div
              className={
                'border-gray-light w-full flex flex-col justify-around rounded-xl shadow-sign-up-info mb-[1rem]'
              }
            >
              {/* 이메일 */}
              <span
                className={
                  'w-full h-[4.5rem] flex-row-center border-solid border-b border-gray-light'
                }
              >
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-3xl '}>
                    <MdOutlineMailOutline className={'fill-gray-light'} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder={'이메일'}
                    required
                    maxLength={30}
                    className={'w-5/6 h-full text-xl rounded-xl'}
                  />
                </label>
              </span>

              {/*비밀번호*/}
              <span className={'w-full h-[4.5rem] flex-row-center'}>
                <label className={'w-h-full flex-row-center'}>
                  <span className={'w-1/6 h-full flex-row-center text-3xl'}>
                    <AiOutlineLock className={'fill-gray-light'} />
                  </span>
                  <span className={'w-5/6 h-full flex'}>
                    <input
                      type={'password'}
                      value={password}
                      onChange={onChangePassword}
                      placeholder={'비밀번호'}
                      maxLength={15}
                      required
                      className={`w-h-full text-xl rounded-xl ${password && 'tracking-[-0.3rem]'}`}
                    />
                  </span>
                </label>
              </span>
            </div>

            <button
              className={
                'flex-row-center border-base border-header-gray rounded-md w-[29rem] h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
              }
            >
              로그인
            </button>
          </form>
        </article>

        <article className={'w-[39rem] flex-col-center text-xl font-bold'}>
          <div
            className={'flex-row-center w-full border-solid border-b border-gray-spring pb-7 mb-5'}
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
          </div>
          <div className={'flex-col-center w-full'}>
            <button className={'mb-7'}>
              <span>간편 로그인</span>
            </button>
            <div className={'w-3/5 flex-row-center justify-evenly'}>
              <button>
                <img className={'w-14'} src={'google.svg'} alt={'google'} />
              </button>
              <button>
                <img className={'w-14'} src={'kakao.svg'} alt={'kakao'} />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
