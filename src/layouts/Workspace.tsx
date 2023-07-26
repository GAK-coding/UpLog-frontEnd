import React from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import Chats from '@/components/Product/SideBar/Chats.tsx';
import Groups from '@/components/Product/SideBar/Groups.tsx';
import { Scrollbars } from 'rc-scrollbars';

export default function Workspace() {
  const { product } = useParams();
  const { pathname } = useLocation();

  return (
    <section className={'w-h-full flex '}>
      <nav className={'w-[18.6rem] h-full border-r border-gray-sideBar]'}>
        <div className={'h-[34%] border-b'}>
          <div className={'h-1/4 flex-row-center'}>
            <span className={'text-3xl font-bold mr-4'}>AllFromU</span>
            <span className={'text-gray-dark text-xl font-bold'}>v.1.0.0</span>
          </div>
          <div className={'h-3/4 flex flex-col justify-evenly'}>
            <NavLink
              to={`/workspace/${product}/members`}
              className={({ isActive }) => `base-menu ${isActive && 'base-menu-selected'}`}
            >
              <FiUser className={'text-[1.8rem] ml-2 mr-3'} /> 멤버
            </NavLink>
            <NavLink
              to={`/workspace/${product}/chats`}
              className={({ isActive }) => `base-menu ${isActive && 'base-menu-selected'}`}
            >
              <BsChatDots className={'text-[1.8rem] ml-2 mr-3'} /> 채팅방
            </NavLink>
            <NavLink
              to={`/workspace/${product}/calendar`}
              className={({ isActive }) => `base-menu ${isActive && 'base-menu-selected'}`}
            >
              <SlCalender className={'text-[1.8rem] ml-2 mr-3'} /> 캘린더
            </NavLink>
          </div>
        </div>
        <div className={'overflow-y-auto h-[66%]'}>
          <Scrollbars
            style={{ height: '100%' }}
            autoHide
            autoHideTimeout={1000}
            // Duration for hide animation in ms.
            autoHideDuration={200}
          >
            {pathname === `/workspace/${product}/chats` ? <Chats /> : <Groups />}
          </Scrollbars>
        </div>
      </nav>
      <article className={'w-noneSideBar h-full'}>
        {/* 중첩 라우터 */}
        <Outlet />
      </article>
    </section>
  );
}
