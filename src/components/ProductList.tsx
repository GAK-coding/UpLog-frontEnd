import { AiOutlinePlus } from 'react-icons/ai';
import React, { useCallback, useEffect, useRef } from 'react';
import { productOpen } from '../recoil/Product/atom.tsx';
import { useRecoilState } from 'recoil';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { BiPencil } from 'react-icons/bi';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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
    { name: 'hi', img: '/images/test_userprofile.png' },
  ];

  const [isProductClick, setIsProductClick] = useRecoilState(productOpen);

  useEffect(() => {
    if (!isProductClick) return;

    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [isProductClick]);

  // 제품 list 클릭해도 꺼지지않게함
  const onChildClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onDragEnd = useCallback((result: any) => {
    // TODO: 작성필요
  }, []);

  return (
    <section
      className={
        'border-base w-[20rem] min-h-[3.3rem] max-h-[30rem] block absolute top-[4rem] right-[-8.5rem] shadow-sign-up'
      }
      onClick={onChildClick}
    >
      <div className={'max-h-[26.7rem] overflow-y-auto'}>
        {/*제품 list*/}
        <DragDropContext onDragEnd={onDragEnd}>
          {productList.map((product, index) => {
            return (
              <Droppable droppableId="inbox-column">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={index}
                    className={'flex-row-center justify-between w-full h-[4.5rem] hover:bg-hover'}
                  >
                    <Draggable draggableId={productList[0].name} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={'flex-row-center justify-between w-full h-[4.5rem]'}
                        >
                          <RxDragHandleDots2
                            className={'flex w-[2.6rem] items-center text-4xl ml-4 fill-gray-light'}
                          />
                          <img
                            src={product.img}
                            alt="userprofile"
                            className={'ml-2 w-[2rem] h-[2rem]'}
                          />
                          <span className={'ml-3 text-xl font-bold w-full'}>{product.name}</span>
                          <BiPencil className={'w-20 text-xl mr-4 fill-gray-light'} />
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>

      {/*제품 추가하기*/}
      <div
        className={
          'flex-row-center justify-between w-full h-[3.3rem] border-solid border-t border-gray-border'
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
