import React, { FormEvent, useCallback, useState } from 'react';
import { useMessage } from '../hooks/useMessage.ts';
import { MdOutlineMailOutline } from 'react-icons/md';
import useInput from '../hooks/useInput.ts';
import { useNavigate } from 'react-router-dom';

export default function PwInquiry() {
  const navigate = useNavigate();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [isSend, setIsSend] = useState(false);
  const { showMessage, contextHolder } = useMessage();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSend) navigate('/login');

      if (!email) {
        showMessage('warning', '이메일을 입력해주세요.');
        return;
      }

      setIsSend((prev) => !prev);
    },
    [email, isSend]
  );

  return (
    <section className={'h-full'}>
      {contextHolder}
      <div className={'w-h-full flex-col-center'}>
        <article>
          <img className={'w-[6.7rem] h-[7.7rem]'} src={'logo.svg'} alt={'로고'} />
        </article>
        <article
          className={
            'flex-row-center border-solid border-[0.6px] border-header-gray w-[39rem] h-[28.75rem] min-h-[28.75rem] shadow-sign-up px-20 my-10'
          }
        >
          <form onSubmit={onSubmit} className={'flex-col-center justify-center w-h-full'}>
            <div
              className={`w-full h-2/5 pb-12 flex flex-col justify-between ${
                isSend && 'mt-[-0rem] mb-[3.5rem]  pb-0'
              }`}
            >
              <h1 className={'text-gray-dark font-bold text-3xl'}>
                {isSend ? '비밀번호 재설정 완료' : '비밀번호 찾기'}
              </h1>
              <span className={'text-gray-dark text-xl'}>
                {isSend ? (
                  <span className={'flex-row-center text-center'}>
                    입력한 이메일 주소로
                    <br /> 임시 비밀번호가 발급되었습니다.
                  </span>
                ) : (
                  '비밀번호를 찾고자 하는 아이디를 입력해 주세요.'
                )}
              </span>
            </div>

            {!isSend && (
              <div
                className={
                  'border-gray-light w-full flex flex-col justify-around rounded-xl shadow-sign-up-info mb-[-1rem]'
                }
              >
                {/* 이메일 */}
                <span className={'w-full h-[4.5rem] flex-row-center'}>
                  <label className={'w-h-full flex-row-center'}>
                    <span className={'w-1/6 h-full flex-row-center text-3xl '}>
                      <MdOutlineMailOutline className={'fill-gray-light'} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={onChangeEmail}
                      placeholder={'이메일'}
                      maxLength={30}
                      className={'w-5/6 h-full text-xl rounded-xl'}
                    />
                  </label>
                </span>
              </div>
            )}

            <button
              className={
                'flex-row-center border-base border-header-gray rounded-md w-[29rem] h-12 mt-10 bg-orange text-white font-bold text-xl'
              }
            >
              {isSend ? '로그인으로 이동' : '다음'}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
