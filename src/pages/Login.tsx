import React from 'react';
import { useMessage } from '../hooks/useMessage.ts';
import { border } from '@chakra-ui/react';
import { convertMinutes } from '../utils/convertMinutes.ts';
import { MdOutlineMailOutline } from 'react-icons/md';
import useInput from '../hooks/useInput.ts';
import { AiOutlineLock } from 'react-icons/ai';

export default function Login() {
  const { showMessage, contextHolder } = useMessage();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  return (
    <form onSubmit={() => {}} className={'h-full flex-col-center min-h-[55rem]'}>
      {contextHolder}
      <section className={'border-base w-h-full flex-col-center'}>
        <div>
          <img src={'logo.svg'} alt={'로고'} />
        </div>
        <div
          className={
            'flex-row-center border-solid border-[0.6px] border-header-gray w-[39rem] h-[23.5rem] min-h-[23.5rem] shadow-sign-up px-20'
          }
        >
          <form className={'flex-col-center justify-center w-h-full'}>
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
        </div>
      </section>
    </form>
  );
}
