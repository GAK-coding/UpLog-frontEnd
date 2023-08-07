import { DatePicker, DatePickerProps, Select } from 'antd';
import { SelectMenu } from '@/typings/project.ts';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  isEdit: boolean;
}
export default function TaskEditInfo({ isEdit }: Props) {
  const dateData: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '최신순',
      label: '최신순',
    },
  ];

  const userprofile = '';
  const [isTargetMember, setIsTargetMember] = useState(true);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //TODO : Task 상태, 날짜별로 필터링해서 보여주기
    console.log(value);
  };

  return (
    <section className={'flex-col justify-start items-start w-[80%] h-[15rem] pl-[3rem]'}>
      {/*시작날짜*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        {/*제목 | */}
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>시작날짜</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit}
        {isEdit ? (
          <DatePicker onChange={onChange} placement={'bottomLeft'} bordered={false} />
        ) : (
          <span className={'ml-3 text-gray-dark'}>2023.07.07</span>
        )}
      </div>

      {/*종료날짜*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>종료날짜</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <DatePicker onChange={onChange} placement={'bottomLeft'} bordered={false} />
        ) : (
          <span className={'ml-3 text-gray-dark'}>2023.07.07</span>
        )}
      </div>
      {/*메뉴*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>메뉴</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange}
            style={{ width: 100 }}
            bordered={false}
            options={dateData}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>요구사항</span>
        )}
      </div>

      {/*그룹*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>그룹</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange}
            style={{ width: 100 }}
            bordered={false}
            options={dateData}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>개발팀-frontend</span>
        )}
      </div>

      {/*할당자*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>할당자</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isTargetMember && userprofile === '' && (
          <FaUserCircle className={'ml-3 text-[2rem] fill-gray-dark'} />
        )}
        {isTargetMember && userprofile !== '' && (
          <img src={userprofile} className={'ml-3 w-[2rem] h-[2rem] rounded-full'} />
        )}
        {isEdit ? (
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange}
            style={{ width: 100 }}
            bordered={false}
            options={dateData}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        ) : (
          <span className={'ml-2 text-gray-dark'}>OCI(오채영)</span>
        )}
      </div>
    </section>
  );
}
