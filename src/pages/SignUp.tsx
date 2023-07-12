import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { FiUser } from 'react-icons/fi';
import { IconContext } from 'react-icons';

export default function SignUp() {
  const [isEach, , setIsEach] = useInput(true);
  const onChangeIsEach = useCallback((check: boolean) => setIsEach(check), []);

  return (
    <>
      <main className={'h-full flex flex-col justify-center items-center'}>
        <section
          className={
            'border-solid border-0.6 border-header-gray w-39rem h-42rem min-h-42rem shadow-sign-up px-20'
          }
        >
          {/* logo */}
          <article className={'h-18% text-3xl flex items-center'}>
            <img className={'h-16 mr-6'} src={'/images/login.png'} alt={'login logo'} />
            <span className={'font-bold'}>회원가입</span>
          </article>

          {/* infos */}
          <article className={'h-82% flex flex-col justify-evenly items-center mt-[-1rem]'}>
            <div className={'flex justify-center items-center w-full h-2/5'}>
              <div
                className={
                  'border-solid border border-light-gray rounded-md w-full h-full flex flex-col justify-around shadow-sign-up-info'
                }
              >
                <div
                  className={
                    'w-full h-1/3 flex items-center border-solid border-b border-light-gray font-bold'
                  }
                >
                  <button
                    className={`w-1/2 h-full text-xl border-solid border-r ${
                      isEach ? 'bg-orange text-black rounded-md' : 'text-light-gray'
                    }`}
                    onClick={() => onChangeIsEach(true)}
                  >
                    개인
                  </button>
                  <button
                    className={`w-1/2 h-full text-xl border-solid border-r ${
                      !isEach ? 'bg-orange text-black rounded-md' : 'text-light-gray'
                    }`}
                    onClick={() => onChangeIsEach(false)}
                  >
                    기업
                  </button>
                </div>
                <span
                  className={
                    'w-full h-1/3 flex items-center border-solid border-b border-light-gray'
                  }
                >
                  <label className={'w-full h-full border-solid border flex items-center'}>
                    <span className={'w-1/6 flex h-full justify-center items-center text-3xl '}>
                      <div>
                        <FiUser className={''} />
                      </div>
                    </span>
                    <input
                      type="text"
                      placeholder={'이름'}
                      className={'w-full h-full focus:outline-none text-xl'}
                    />
                  </label>
                </span>
                <span className={'w-full h-1/3 flex items-center'}>
                  <input type="text" placeholder={'닉네임'} />
                </span>
              </div>
            </div>

            <div className={'flex justify-center items-center w-full h-2/5'}>
              <div
                className={
                  'border-solid border border-light-gray rounded-md w-full h-full flex flex-col justify-around shadow-sign-up-info'
                }
              >
                <div>
                  <span>
                    <input type="text" placeholder={'이메일'} />
                  </span>
                  <span>
                    <input type="text" placeholder={'인증번호'} />
                  </span>
                  <span>
                    <input type="text" placeholder={'비밀번호'} />
                  </span>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* button */}
        <button
          className={
            'flex justify-center items-center border-solid border border-header-gray rounded-md w-39rem h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
          }
        >
          회원가입
        </button>
      </main>
    </>
  );
}
