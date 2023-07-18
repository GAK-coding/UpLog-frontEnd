import { AiOutlinePlus } from 'react-icons/ai';
import React, { useRef } from 'react';
import { productOpen } from '../recoil/Product/atom.tsx';
import { useRecoilState } from 'recoil';
import { useOutsideAlerter } from '../hooks/useOutsideAlerter.ts';
import { PiDotsSixVertical } from 'react-icons/pi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { BiPencil } from 'react-icons/bi';

export default function ProductList() {
  const productList = [
    { name: 'AllformU', img: '/images/test_userprofile.png' },
    { name: 'hello', img: '/images/test_userprofile.png' },
    { name: 'hi', img: '/images/test_userprofile.png' },
    { name: 'hi', img: '/images/test_userprofile.png' },
    { name: 'hi', img: '/images/test_userprofile.png' },
    { name: 'hi', img: '/images/test_userprofile.png' },
    { name: 'hi', img: '/images/test_userprofile.png' },
    { name: 'hi', img: '/images/test_userprofile.png' },
    // { name: 'hi', img: '/images/test_userprofile.png' },
  ];

  const [isProductClick, setIsProductClick] = useRecoilState(productOpen);
  const clickRef = useOutsideAlerter();

  return (
    <section
      className={
        'border-base w-[20rem] min-h-[8rem] max-h-[30rem] absolute top-[4rem] right-[-8.5rem] shadow-sign-up'
      }
    >
      <div className={'max-h-[26.7rem] overflow-y-auto'}>
        {/*제품 list*/}
        {productList.map((product, key) => {
          return (
            <div
              className={'flex-row-center justify-between w-full h-[4.5rem] hover:bg-orange-light'}
            >
              <RxDragHandleDots2 className={'flex items-center text-4xl ml-4 fill-gray-light'} />
              <img src={product.img} alt="userprofile" className={'ml-2 w-[2rem] h-[2rem]'} />
              <span className={'ml-3 text-xl font-bold w-full'}>{product.name}</span>
              <BiPencil className={'text-3xl mr-4 fill-gray-light'} />
            </div>
          );
        })}
      </div>

      {/*제품 추가하기*/}
      <div
        className={
          ' flex-row-center justify-between w-full h-[3.3rem] border-solid border-t border-gray-border'
        }
      >
        <AiOutlinePlus className={'flex items-center text-2xl ml-4 fill-gray-light'} />
        <span className={'flex items-center w-full text-base ml-3 text-gray-light font-medium'}>
          제품 추가하기
        </span>
      </div>
    </section>
  );
}
