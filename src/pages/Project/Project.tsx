import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Select } from '@chakra-ui/react';
import CustomSelect from '@/components/UI/CustomSelect.tsx';

export default function Project() {
  // const { project } = useParams();
  const items = [
    { label: '그룹', value: 'group' },
    { label: '개발팀', value: 'develop' },
    { label: '마케팅팀', value: 'marketing' },
    { label: '홍보팀', value: 'promotion' },
  ];
  const [groupValue, setGroupValue] = useState(items[0].label);
  const [isKanban, setIsKanban] = useState(true);

  const onClickKanban = useCallback((check: boolean) => {
    setIsKanban(check);
  }, []);

  return (
    <section className={'flex-col-center justify-start w-full h-full'}>
      <section
        className={'flex-row-center justify-start w-full h-[3.5rem] px-2 border border-red-400'}
      >
        <div className={'border-red-400 border flex-row w-[30rem] justify-between'}>
          {/*<Select placeholder="그룹">*/}
          {/*  <option value="option1">Option 1</option>*/}
          {/*  <option value="option2">Option 2</option>*/}
          {/*  <option value="option3">Option 3</option>*/}
          {/*</Select>*/}
          {/*<div className={'flex-row w-[5rem]'}>*/}
          <CustomSelect
            items={items}
            value={groupValue}
            placeholder={'그룹'}
            onChange={(newValue) => setGroupValue(newValue)}
          />
          <CustomSelect
            items={items}
            value={groupValue}
            placeholder={'그룹'}
            onChange={(newValue) => setGroupValue(newValue)}
          />
          {/*</div>*/}
        </div>
      </section>
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
      <section className={'w-full h-[4.3rem] border border-red-400'}></section>
      <section className={'w-full h-[40rem] border border-red-400'}></section>
    </section>
  );
}
