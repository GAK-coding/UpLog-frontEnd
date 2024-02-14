import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { user } from '@/recoil/User/atom.ts';
import { useRecoilState } from 'recoil';
import { message } from '@/recoil/Common/atom.ts';

export default function Home() {
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useRecoilState(loginStatus);
  const [messageInfo, setMessageInfo] = useRecoilState(message);
  const [userInfo, setUserInfo] = useRecoilState(user);

  return (
    <section className={'flex-col-center justify-start w-h-full min-w-[30em]'}>
      <div className={'flex-col w-full h-[55%] pt-[8%]'}>
        <div className={'flex-col-center font-logo font-bold text-[5.5rem]'}>
          <div className={'flex-row-center'}>
            <span>Post, Task, Iss</span>{' '}
            <img src={'/logo.svg'} alt={'logo'} className={'-mt-10 w-[3rem]'} />
            <span>e</span>
          </div>
          <div className={'flex'}>
            <span>And Release</span>
            <span className={'text-[#F86F03]'}>&nbsp;Together!</span>
          </div>
        </div>
        <div className={'flex-row-center font-bold mt-2 text-[1.8rem] text-gray-main'}>
          <div className={'flex-col-center'}>
            <span>기업, 개인, 의뢰인 소통은</span>
            <div className={'flex'}>
              <span className={'font-logo text-[3rem] text-orange'}>upLog &nbsp;</span>
              <span className={'mt-2'}>와 함께하세요!</span>
            </div>
          </div>
          {/*<img src={'/logo.svg'} alt={'logo'} className={'ml-8 w-[5rem]'} />*/}
        </div>
      </div>

      <div className={'flex-row-center w-full h-[45%]'}>
        <button
          className={
            'flex-row-center justify-between w-[30rem] h-[6.5rem] pl-28 pr-8 cursor-pointer rounded-xl bg-orange font-logo font-bold shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] hover:scale-110 hover:bg-[#F86F03] focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] hover:text-white'
          }
          onClick={() => {
            userInfo
              ? setMessageInfo({ type: 'warning', content: '제품을 만들어 주세요!' })
              : navigate('/login');
          }}
        >
          <span className={'mt-4 text-[2.5rem]'}>Get Started&nbsp;!</span>
          <BsArrowRightShort className={'text-[4rem]'} />
        </button>
      </div>
    </section>
  );
}
