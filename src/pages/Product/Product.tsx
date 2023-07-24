import React from 'react';
import Goods from '@pages/Product/Goods.tsx';
import Project from '@pages/Project/Project.tsx';
import { Route, Routes, useParams } from 'react-router-dom';

export default function Product() {
  return (
    <section className={'border-solid border-4 w-h-full flex'}>
      <nav className={'border-solid border-2 w-[18.6rem] h-full'}>사이드 바</nav>
      <article className={'border-solid border-2 w-noneSideBar h-full'}>
        <Routes>
          <Route path={'/'} element={<Goods />} />
          <Route path={'/product/:productName'} element={<Goods />} />
          <Route path={'/product/:productName/:projectName'} element={<Project />} />
        </Routes>
      </article>
    </section>
  );
}
