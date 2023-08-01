import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';
import { Task } from '@/typings/project.ts';
import { Progress, Select, Space } from 'antd';
import StatusBoard from '@/components/Project/Board/StatusBoard.tsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import type = Mocha.utils.type;
import { useNavigate } from 'react-router-dom';
import { product } from '@/recoil/Product/atom.tsx';

export default function Project() {
  const { product, project, parentgroup, childgroup } = useParams();

  const navigate = useNavigate();

  const taskList: Task[] = [
    {
      id: 0,
      name: 'task1',
      status: 'before',
      group: 'develop',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 1,
      name: 'task2',
      status: 'before',
      group: 'develop',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 2,
      name: 'task3',
      status: 'before',
      group: 'develop',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 3,
      name: 'task4',
      status: 'going',
      group: 'develop',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 4,
      name: 'task5',
      status: 'going',
      group: 'develop',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 5,
      name: 'task6',
      status: 'going',
      group: 'develop',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 6,
      name: 'task7',
      status: 'done',
      group: 'develop',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 7,
      name: 'task8',
      status: 'before',
      group: 'develop',
      menu: '요구사항',
      targetMember: 'OCI(오채영)',
    },
    {
      id: 8,
      name: 'task9',
      status: 'before',
      group: 'develop',
      menu: '테스트',
      targetMember: 'OCI(오채영)',
    },
  ];

  const progress = 77;
  const [isKanban, setIsKanban] = useState(true);

  const onClickKanban = useCallback((check: boolean) => {
    setIsKanban(check);
  }, []);

  const pGroup = ['그룹', '개발팀', '마케팅', '홍보팀'];
  const cGroup = {
    그룹: ['하위그룹'],
    개발팀: ['전체', '하위개발1', '하위개발2'],
    마케팅: ['전체', '하위마케팅1', '하위마케팅2'],
    홍보팀: ['전체', '하위홍보1', '하위홍보2'],
  };

  type ChildGroup = keyof typeof cGroup;

  const [parentGroup, setParentGroup] = useState(cGroup[pGroup[0] as ChildGroup]);
  const [childGroup, setChildGroup] = useState(cGroup[pGroup[0] as ChildGroup][0]);

  const [filterGroup, setFilterGroup] = useState(pGroup[0]);

  const handleParentGroupChange = (value: ChildGroup) => {
    // 선택한 상위그룹내용으로 하위 그룹 option으로 변경
    setParentGroup(cGroup[value]);
    setChildGroup(cGroup[value][0]);

    // 선택한 상위 그룹으로 필터링된 페이지로 이동
    setFilterGroup(value);
  };

  const onChildGroupChange = (value: ChildGroup) => {
    // 선택한 하위 그룹으로 필터링된 페이지로 이동
    setChildGroup(value);
  };

  useEffect(() => {
    if (filterGroup === '그룹') {
      navigate(`/workspace/${product}/${project}`);
    } else {
      childGroup === '전체'
        ? navigate(`/workspace/${product}/${project}/group/${filterGroup}`)
        : navigate(`/workspace/${product}/${project}/group/${filterGroup}/${childGroup}`);
    }
  }, [filterGroup, childGroup]);

  return (
    <section className={'flex-col justify-start w-noneSideBar h-full relative overflow-x-hidden'}>
      <div className={'w-noneSideBar h-[13.8rem] flex-col'}>
        <section className={'flex-row-center justify-start w-full h-[3.5rem] px-12 pt-4'}>
          {/*그룹 필터링*/}
          <div className={'flex-row-center w-[25rem] justify-between'}>
            {/*그룹 -> 하위로 바꾸기*/}
            <Space wrap>
              <Select
                defaultValue={pGroup[0]}
                style={{ width: 110 }}
                onChange={handleParentGroupChange}
                options={pGroup.map((group) => ({ label: group, value: group }))}
              />
              <Select
                style={{ width: 110 }}
                value={childGroup}
                onChange={onChildGroupChange}
                options={parentGroup.map((group) => ({ label: group, value: group }))}
              />
            </Space>
          </div>
        </section>
        {/*칸반, 스크럼 선택*/}
        <section className={'w-full h-[6rem]'}>
          <div className={'flex-row-center justify-center w-full h-full px-2 '}>
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

        <section className={'flex-row-center justify-between w-noneSideBar h-[4.3rem]'}>
          {/*TODO : 스크럼 주차 정보 데이터로 처리 + 화살표 기능 추가*/}
          <div className={'flex w-1/3 h-full'} />
          <div className={'flex-row-center w-1/3 h-full'}>
            {!isKanban && (
              <div className={'flex-row-center w-full'}>
                <IoIosArrowBack className={'text-[1.5rem] text-gray-dark mr-2'} />
                <span className={'text-[1rem] text-gray-dark'}>1주차</span>
                <IoIosArrowForward className={'text-[1.5rem] text-gray-dark ml-2'} />
              </div>
            )}
          </div>

          <div className={'flex-row-center justify-end w-1/3 h-full pr-12'}>
            <span className={'flex-row-center text-[0.93rem] font-bold mr-4 text-gray-dark'}>
              진행률
            </span>
            <div className={'mt-2 self-center w-[15.6rem]'}>
              <Progress className={'progress'} percent={progress} />
            </div>
          </div>
        </section>
      </div>

      {/*보드*/}
      <div className={'w-noneSideBar h-board flex-col'}>
        <section className={'flex-col-center w-noneSideBar h-[90%]'}>
          <div className={'flex-row-center justify-between w-full h-full pt-8 px-[12rem]'}>
            <StatusBoard status={'before'} tasks={taskList} />
            <StatusBoard status={'going'} tasks={taskList} />
            <StatusBoard status={'done'} tasks={taskList} />
          </div>
        </section>
        {/*하단페이지로 이동*/}
        <section className={'flex-row-center w-full h-[10%]'}>
          <BsChevronCompactDown className={'text-[4rem] text-gray-light'} />
        </section>
      </div>
    </section>
  );
}
