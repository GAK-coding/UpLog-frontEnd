import React, { FormEvent, useCallback } from 'react';
import { useMessage } from '../hooks/useMessage.ts';
import { MdOutlineMailOutline } from 'react-icons/md';
import useInput from '../hooks/useInput.ts';
import { AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function PwInquiry() {
  const { showMessage, contextHolder } = useMessage();
  const [email, onChangeEmail, setEmail] = useInput('');

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <section className={'h-full min-h-[55rem]'}>
      {contextHolder}
      <div className={'w-h-full flex-col-center mt-[-5rem]'}>
        <article>
          <img className={'w-[6.7rem] h-[7.7rem]'} src={'logo.svg'} alt={'로고'} />
        </article>
        <article
          className={
            'flex-row-center border-solid border-[0.6px] border-header-gray w-[39rem] h-[28.75rem] min-h-[28.75rem] shadow-sign-up px-20 my-10'
          }
        >
          <form onSubmit={onSubmit} className={'flex-col-center justify-center w-h-full'}>
            <div className={'w-full h-2/5 pb-12 flex flex-col justify-between'}>
              <h1 className={'text-gray-dark font-bold text-3xl'}>비밀번호 찾기</h1>
              <span className={'text-gray-dark text-xl'}>
                비밀번호를 찾고자 하는 아이디를 입력해 주세요.
              </span>
            </div>

            <div
              className={
                'border-gray-light w-full flex flex-col justify-around rounded-xl shadow-sign-up-info mb-[-1rem]'
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
            </div>

            <button
              className={
                'flex-row-center border-base border-header-gray rounded-md w-[29rem] h-12 mt-10 py-7 font-bold text-xl bg-orange text-white'
              }
            >
              다음
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}