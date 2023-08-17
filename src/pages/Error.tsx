import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();
  return (
    <section className={'flex-col-center justify-start w-h-full pt-[10%]'}>
      <div className={'flex-row-center w-full'}>
        <img src={'/images/error.png'} alt="error" className={'w-[10rem]'} />
        <div className={'flex-col-center items-start ml-20'}>
          <span className={'mt-8 font-logo text-[6rem]'}>Error&nbsp;!</span>
          <span className={'-mt-8 ml-2 flex text-[1.5rem]'}>
            해당 페이지는 존재하지 않는 페이지입니다.
          </span>
        </div>
      </div>
      <div className={'pt-48'}>
        <button
          className={
            'flex-row-center w-[25rem] h-[5rem] cursor-pointer rounded-xl bg-orange font-logo font-bold shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] hover:scale-110 hover:bg-[#F86F03] focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] hover:text-[#f5f5f5]'
          }
          onClick={() => navigate('/')}
        >
          <span className={'mt-4 text-[2rem]'}>Move to MainPage</span>
        </button>
      </div>
    </section>
  );
}
