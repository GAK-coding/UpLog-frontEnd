import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Workspace() {
  return (
    <section className={'border-solid border w-h-full flex'}>
      <nav className={'border-solid border w-[18.6rem] h-full'}>사이드 바</nav>
      <article className={'border-solid border w-noneSideBar h-full'}>
        {/* 중첩 라우터 */}
        <Outlet />
      </article>
    </section>
  );
}
