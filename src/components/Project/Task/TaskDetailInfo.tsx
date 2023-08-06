import { DatePicker, DatePickerProps } from 'antd';

export default function TaskDetailInfo() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <section
      className={
        'flex-col justify-start items-start w-[80%] h-[15rem] pl-[3rem] border border-red-400'
      }
    >
      {/*시작날짜*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        {/*제목 | */}
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>시작날짜</span>
          <div className={'mx-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        <DatePicker onChange={onChange} placement={'bottomLeft'} bordered={false} />
      </div>

      {/*종료날짜*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>종료날짜</span>
          <div className={'mx-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
      </div>
      {/*메뉴*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>메뉴</span>
          <div className={'mx-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
      </div>

      {/*그룹*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>그룹</span>
          <div className={'mx-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
      </div>

      {/*할당자*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>할당자</span>
          <div className={'mx-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
      </div>
    </section>
  );
}
