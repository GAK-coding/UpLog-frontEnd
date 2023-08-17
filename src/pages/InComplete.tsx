import { useNavigate } from 'react-router-dom';

export default function InComplete() {
  return (
    <section className={'flex-col-center w-h-full pb-[10%]'}>
      <div className={'flex-row-center w-full'}>
        <img src={'/images/coming.png'} alt="error" className={'w-[15rem]'} />
        <div className={'flex-col-center items-start ml-20'}>
          <span className={'mt-8 font-logo text-[6rem]'}>Coming ...</span>
          <span className={'-mt-4 ml-2 flex text-[1.5rem]'}>서비스가 곧 제공될 예정입니다.</span>
        </div>
      </div>
    </section>
  );
}
