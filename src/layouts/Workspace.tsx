import React from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import Chats from '@/components/Product/SideBar/Chats.tsx';
import Groups from '@/components/Product/SideBar/Groups.tsx';
import { Scrollbars } from 'rc-scrollbars';
import { ProductInfo } from '@/typings/product.ts';
import { Project } from '@/typings/project.ts';

export default function Workspace() {
  const { product, project, parentgroup, childgroup } = useParams();
  const { pathname } = useLocation();
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const nowProject: Project = JSON.parse(sessionStorage.getItem('nowProject')!);

  return (
    <section className={'w-h-full flex'}>
      <nav className={'w-[18.6rem] h-full border-r py-4'}>
        <div className={`h-[40%] ${product && project && 'border-b'}`}>
          <div className={'h-[35%] flex-col-center items-start px-10'}>
            <Link
              to={`/workspace/${nowProduct?.productName}`}
              className={'text-3xl font-bold ellipsis'}
            >
              {nowProduct?.productName}
            </Link>
            {project && (
              <span className={'self-start text-gray-dark text-xl font-bold mt-2 ellipsis'}>
                {project}
              </span>
            )}
          </div>
          <div className={'h-[60%] flex flex-col justify-evenly'}>
            <NavLink
              to={
                parentgroup
                  ? `/workspace/${product}/${project}/group/${parentgroup}/setting`
                  : `/workspace/${product}/members`
              }
              className={({ isActive }) => `base-menu ${isActive && 'base-menu-selected'}`}
            >
              <FiUser className={'text-[1.4rem] ml-2 mr-3'} /> 멤버
            </NavLink>
            <NavLink
              to={`/workspace/${product}/chats`}
              className={({ isActive }) => `base-menu ${isActive && 'base-menu-selected'}`}
            >
              <BsChatDots className={'text-[1.4rem] ml-2 mr-3'} /> 채팅방
            </NavLink>
            <NavLink
              to={`/workspace/${product}/calendar`}
              className={({ isActive }) => `base-menu ${isActive && 'base-menu-selected'}`}
            >
              <SlCalender className={'text-[1.4rem] ml-2 mr-3'} /> 캘린더
            </NavLink>
          </div>
        </div>
        {product && project && (
          <div className={'overflow-y-auto h-[65%]'}>
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
        )}
      </nav>
      <article className={'w-noneSideBar h-full'}>
        <Scrollbars
          style={{ width: '100%', height: '100%' }}
          autoHide
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
        >
          {/* 중첩 라우터 */}
          <Outlet />
        </Scrollbars>
      </article>
    </section>
  );
}
