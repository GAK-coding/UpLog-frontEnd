import React from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import Chats from '@/components/Product/SideBar/Chats.tsx';
import Groups from '@/components/Product/SideBar/Groups.tsx';

export default function Workspace() {
  const { product } = useParams();
  const { pathname } = useLocation();

  return (
    <section className={'w-h-full flex '}>
      <nav className={'w-[18.6rem] h-full border-solid border-r border-header-gray'}>
        <div className={'h-80 border-solid border-b border-header-gray'}>
          <div className={'h-1/4 flex-row-center'}>
            <span className={'text-3xl font-bold mr-4'}>AllFromU</span>
            <span className={'text-gray-dark text-xl font-bold'}>v.1.0.0</span>
          </div>
          <div className={'h-3/4 flex flex-col justify-evenly'}>
            <NavLink
              to={`/workspace/${product}/members`}
              className={({ isActive }) =>
                `text-[1.4rem] flex items-center font-bold text-gray-dark w-56 h-12  mx-auto  ${
                  isActive &&
                  'border-solid border-[0.5px] border-orange-light-sideBar bg-orange-light-sideBar rounded-[0.31rem]'
                }`
              }
            >
              <FiUser className={'text-[1.8rem] ml-2 mr-3'} /> 멤버
            </NavLink>
            <NavLink
              to={`/workspace/${product}/chats`}
              className={({ isActive }) =>
                `text-[1.4rem] flex items-center font-bold text-gray-dark w-56 h-12  mx-auto  ${
                  isActive &&
                  'border-solid border-[0.5px] border-orange-light-sideBar bg-orange-light rounded-[0.31rem]'
                }`
              }
            >
              <BsChatDots className={'text-[1.8rem] ml-2 mr-3'} /> 채팅방
            </NavLink>
            <NavLink
              to={`/workspace/${product}/calendar`}
              className={({ isActive }) =>
                `text-[1.4rem] flex items-center font-bold text-gray-dark w-56 h-12  mx-auto  ${
                  isActive &&
                  'border-solid border-[0.5px] border-orange-light-sideBar bg-orange-light rounded-[0.31rem]'
                }`
              }
            >
              <SlCalender className={'text-[1.8rem] ml-2 mr-3'} /> 캘린더
            </NavLink>
          </div>
        </div>
        <div>{pathname === `/workspace/${product}/chats` ? <Chats /> : <Groups />}</div>
      </nav>
      <article className={'w-noneSideBar h-full'}>
        {/* 중첩 라우터 */}
        <Outlet />
      </article>
    </section>
  );
}
