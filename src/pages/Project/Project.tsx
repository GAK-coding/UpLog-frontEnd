import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';
import { ProjectGroupFilter } from '@/typings/project.ts';
import { Progress, Select } from 'antd';

export default function Project() {
  // const { project } = useParams();

  const pGroup: ProjectGroupFilter[] = [
    { value: 'all', label: '그룹' },
    { value: 'develop', label: '개발팀' },
    { value: 'marketing', label: '마케팅' },
    { value: 'promotion', label: '홍보' },
  ];

  const cGroup: ProjectGroupFilter[] = [
    { value: 'all', label: '하위그룹' },
    { value: 'develop', label: '개발팀' },
    { value: 'marketing', label: '마케팅' },
    { value: 'promotion', label: '홍보' },
  ];

  const progress = 77;
  const [isKanban, setIsKanban] = useState(true);

  const onClickKanban = useCallback((check: boolean) => {
    setIsKanban(check);
  }, []);

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };
  return (
    <section className={'flex-col-center justify-start w-full h-full'}>
      <section
        className={'flex-row-center justify-start w-full h-[3.5rem] px-12 border border-red-400'}
      >
        {/*그룹 필터링*/}
        <div className={'fixed flex-row-center w-[18rem] justify-between'}>
          {/*그룹 -> 하위로 바꾸기*/}
          <Select
            labelInValue
            defaultValue={{ value: pGroup[0].value, label: pGroup[0].label }}
            style={{ width: 100 }}
            onChange={handleChange}
            options={pGroup}
          ></Select>

          <Select
            labelInValue
            defaultValue={{ value: cGroup[0].value, label: cGroup[0].label }}
            style={{ width: 100 }}
            onChange={handleChange}
            options={cGroup}
          ></Select>
        </div>
      </section>
      {/*칸반, 스크럼 선택*/}
      <section className={'w-full h-[4rem] border border-red-400'}>
        <div className={'flex-row-center justify-center w-full h-full px-2'}>
          <button type={'button'} onClick={() => onClickKanban(true)}>
            <span
              className={`text-3xl  ${
                isKanban ? 'text-black font-bold' : 'text-gray-board font-semibold'
              }`}
            >
              칸반
            </span>
          </button>

          <div className={'mx-4 h-8 border-solid border-r border-[1px] border-gray-board'} />

          <button type={'button'} onClick={() => onClickKanban(false)}>
            <span
              className={`text-3xl  ${
                !isKanban ? 'text-black font-bold' : 'text-gray-board font-semibold'
              }`}
            >
              스크럼
            </span>
          </button>
        </div>
      </section>
      {/*진행률*/}
      <section
        className={
          'flex-row-center justify-end w-full h-[4.3rem] pr-[4.5rem] border border-red-400'
        }
      >
        <span
          className={'flex-row-center self-center text-[0.93rem] font-bold mr-4 text-gray-dark'}
        >
          진행률
        </span>
        <div className={'mt-2 self-center w-[15.6rem]'}>
          <Progress className={'progress'} percent={progress} />
        </div>
      </section>
      {/*보드*/}
      <section className={'flex-row-center w-full h-board border border-red-400'}>
        <div
          className={'flex-row-center justify-between w-[80rem] h-full py-12 border border-red-400'}
        >
          <section className={'w-[24rem] h-full border border-t-amber-200'}>보드 1</section>
          <section className={'w-[24rem] h-full border border-t-amber-200'}>보드 2</section>
          <section className={'w-[24rem] h-full border border-t-amber-200'}>보드 3</section>
        </div>
      </section>
      {/*하단페이지로 이동*/}
      <section className={'flex-row-center w-full h-[4rem]'}>
        <BsChevronCompactDown className={'text-[4rem] text-gray-light'} />
      </section>
    </section>
  );
}
