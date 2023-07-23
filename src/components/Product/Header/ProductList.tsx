import { AiOutlinePlus } from 'react-icons/ai';
import React, { useCallback, useEffect } from 'react';
import { product, productOpen } from '@recoil/Product/atom.tsx';
import { useRecoilState } from 'recoil';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { BiPencil } from 'react-icons/bi';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

export default function ProductList() {
  const [productList, setProductList] = useRecoilState(product);

  const [isProductClick] = useRecoilState(productOpen);

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

  // const onDragEnd = useCallback(
  //   (result: DropResult) => {
  //     console.log(result);
  //     const { destination, draggableId, source } = result;
  //     console.log('drag', draggableId);
  //     console.log('des', destination);
  //
  //     // 이상한 곳에 드래그하면 return
  //     if (!destination) return;
  //
  //     // 출발지와 도착지가 다르면 재정렬
  //     // 깊은 복사
  //     const updatedProduct = JSON.parse(JSON.stringify(product)) as typeof product;
  //     // 기존 아이템 뽑아내기
  //     const [movedItem] = updatedProduct.splice(source.index, 1);
  //     // 기존 아이템을 새로운 위치에 삽입하기
  //     updatedProduct.splice(destination.index, 0, movedItem);
  //
  //     // 상태 변경
  //     console.log('updateList', updatedProduct);
  //     setProductList(updatedProduct);
  //   },
  //   [product]
  // );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      // 이상한 곳에 드래그하면 return
      if (!destination) return;

      // 출발지와 도착지가 다르면 재정렬
      // 깊은 복사
      if (Array.isArray(productList)) {
        const updatedProduct = JSON.parse(JSON.stringify(productList)) as typeof productList;
        // 기존 아이템 뽑아내기
        const [movedItem] = updatedProduct.splice(source.index, 1);
        // 기존 아이템을 새로운 위치에 삽입하기
        updatedProduct.splice(destination.index, 0, movedItem);

        // 상태 변경
        setProductList(updatedProduct);
      }
    },
    [productList]
  );

  return (
    <section
      className={
        'border-base w-[20rem] min-h-[3.3rem] max-h-[27.3rem] block absolute top-[4rem] right-[-8.5rem] shadow-sign-up'
      }
      onClick={onChildClick}
    >
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className={'max-h-[23.7rem] overflow-y-auto'}>
          {/*제품 list*/}
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={'flex-col-center justify-between w-full'}
              >
                {productList.map((product, index) => {
                  return (
                    <Draggable
                      draggableId={product.draggableId}
                      key={product.draggableId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            'flex-row-center justify-between w-full h-[4.5rem] hover:bg-hover'
                          }
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
        </div>
      </DragDropContext>

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
