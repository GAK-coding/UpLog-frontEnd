import { AiOutlinePlus } from 'react-icons/ai';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { productOpen } from '../recoil/Product/atom.tsx';
import { useRecoilState } from 'recoil';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { BiPencil } from 'react-icons/bi';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { ProductInfo } from '../types/product.ts';

export default function ProductList() {
  const product: ProductInfo[] = [
    {
      id: 1,
      draggableId: '1',
      name: 'Product1',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 2,
      draggableId: '2',
      name: 'Product2',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 3,
      draggableId: '3',
      name: 'Product3',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 4,
      draggableId: '4',
      name: 'Product4',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
    {
      id: 5,
      draggableId: '5',
      name: 'Product5',
      image: '/images/test_userprofile.png',
      master: 'master',
      client: 'client',
    },
  ];
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    ...draggableStyle,
  });

  const [productList, setProductList] = useState<ProductInfo[]>(product);

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

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result);
      const { destination, draggableId, source } = result;
      console.log('des', destination);
      console.log('drag', draggableId);

      // 이상한 곳에 드래그하면 return
      if (!destination) return;

      // 출발지와 도착지가 같으면 return
      if (destination.droppableId === source.droppableId && source.index === destination.index)
        return;

      // 출발지와 도착지가 다르면 재정렬
      const updatedProduct = Array.from(product);
      const [movedItem] = updatedProduct.splice(source.index, 1);
      updatedProduct.splice(destination.index, 0, movedItem);

      // 이제 'updatedProduct'에는 항목이 새 인덱스로 이동한 배열이 들어 있습니다.
      console.log('재정렬된 물품:', updatedProduct);
      setProductList(updatedProduct);
    },
    [product]
  );

  return (
    <section
      className={
        'border-base w-[20rem] min-h-[3.3rem] max-h-[30rem] block absolute top-[4rem] right-[-8.5rem] shadow-sign-up'
      }
      onClick={onChildClick}
    >
      <div className={'max-h-[26.7rem] overflow-y-auto'}>
        {/*제품 list*/}
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={'flex-col-center justify-between w-full h-[4.5ㅎrem] hover:bg-hover'}
              >
                {productList.map((product, index) => {
                  return (
                    <Draggable draggableId={product.draggableId} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          className={'flex-row-center justify-between w-full h-[4.5rem]'}
                        >
                          <RxDragHandleDots2
                            className={'flex w-[2.6rem] items-center text-4xl ml-4 fill-gray-light'}
                          />
                          <img
                            src={product.image}
                            alt="userprofile"
                            className={'ml-2 w-[2rem] h-[2rem]'}
                          />
                          <span className={'ml-3 text-xl font-bold w-full'}>{product.name}</span>
                          <BiPencil className={'w-20 text-xl mr-4 fill-gray-light'} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
