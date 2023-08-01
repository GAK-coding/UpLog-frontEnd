import React from 'react';
import { BsDot } from 'react-icons/bs';

export default function CompleteModalTooltip() {
  return (
    <section className={'p-4 text-gray-dark'}>
      <h1 className={'text-xl font-bold mb-8'}>버전명 - v.x.y.z</h1>
      <article>
        <div className={'flex items-start mb-4 font-normal'}>
          <span className={'flex items-center text-[1rem] w-[23%] '}>
            <BsDot className={'text-xl'} /> x(메이저) :
          </span>
          <span className={'w-[75%]'}>
            상품 또는 서비스 버전으로 신규 버전 (v.1.0.0)또는
            <br /> 이전 버전과 호환되지 않을 정도로 큰 변화가 발생한 경우
          </span>
        </div>
        <div className={'flex items-start mb-4 font-normal'}>
          <span className={'flex items-center text-[1rem] w-[23%] '}>
            <BsDot className={'text-xl'} /> y(마이너) :
          </span>
          <span className={'w-[75%]'}>
            이전 버전과 호환 가능한 상태에서 신규 기능의 추가 또는 기존 기능이 삭제된 경우를 의미
          </span>
        </div>
        <div className={'flex items-center font-normal mb-5'}>
          <span className={'flex items-center text-[1rem] w-[20%] '}>
            <BsDot className={'text-xl'} /> z(패치) :
          </span>
          <span className={'w-[80%]'}>API를 변경하지 않은 사소한 변경이나 버그 수정을 의미</span>
        </div>
      </article>
    </section>
  );
}
