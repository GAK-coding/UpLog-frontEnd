import { AiOutlinePlus } from 'react-icons/ai';

export default function ProductList() {
  const productList = ['AllFormU', 'hihi', 'hello'];

  return (
    <section
      className={
        'border-base w-[20rem] min-h-[8rem] max-h-[30rem] absolute top-[4rem] right-[-8rem] shadow-sign-up'
      }
    >
      {/*제품 list*/}
      {productList.map((product, index) => {
        return <div className={'flex-row-center justify-between w-full h-[4.5rem]'}>{product}</div>;
      })}

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
