import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';
import { SubGroup, Task, TaskStatus } from '@/typings/project.ts';
import { Progress, Select, Space } from 'antd';
import StatusBoard from '@/components/Project/Board/StatusBoard.tsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { taskState } from '@/recoil/Project/atom.ts';

export default function Project() {
  const { product, project } = useParams();
  const navigate = useNavigate();

  // recoil에서 받아올 값
  const [taskStatusList, setTaskStatusList] = useRecoilState(taskState);
  const taskList: Task[] = [
    {
      id: 0,
      dragId: '0',
      taskName: 'task1',
      targetMember: {
        id: 1,
        name: '오채영',
        nickname: 'OCI',
        image: '',
      },
      menuId: 1,
      menuName: '요구사항',
      projectId: 1,
      projectTeamName: '개발팀',
      projectTeamParentId: null,
      taskStatus: 'PROGRESS_BEFORE',
      taskDetail: 'task1 입니다롱',
      startTime: '2023-08-01',
      endTime: '2023-08-04',
    },
    {
      id: 1,
      dragId: '1',
      taskName: 'task2',
      targetMember: {
        id: 1,
        name: '오채영',
        nickname: 'OCI',
        image: '',
      },
      menuId: 1,
      menuName: '요구사항',
      projectId: 1,
      projectTeamName: '프론트엔드',
      projectTeamParentId: 1,
      taskStatus: 'PROGRESS_IN',
      taskDetail: 'task2 입니다롱',
      startTime: '2023-08-03',
      endTime: '2023-08-10',
    },
    {
      id: 3,
      dragId: '3',
      taskName: 'task3',
      targetMember: {
        id: 1,
        name: '오채영',
        nickname: 'OCI',
        image: '',
      },
      menuId: 2,
      menuName: '개발',
      projectId: 1,
      projectTeamName: '개발팀',
      projectTeamParentId: null,
      taskStatus: 'PROGRESS_COMPLETE',
      taskDetail: 'task3 입니다롱',
      startTime: '2023-08-01',
      endTime: '2023-08-15',
    },
  ];

  // 진행률 퍼센트
  const [progress, setProgress] = useState(0);

  // 칸반 | 스크럼
  const [isKanban, setIsKanban] = useState(true);

  const onClickKanban = useCallback((check: boolean) => {
    setIsKanban(check);
  }, []);

  const pGroup: string[] = ['그룹', '개발팀', '마케팅팀', '홍보팀'];
  const cGroup: SubGroup = {
    그룹: ['하위그룹'],
    개발팀: ['전체', '프론트엔드', '백엔드', '풀스택'],
    마케팅팀: ['전체', 'SNS', '디자인'],
    홍보팀: ['전체', 'SNS', '기사'],
  };

  type ChildGroup = keyof typeof cGroup;

  const [parentGroup, setParentGroup] = useState(cGroup[pGroup[0] as ChildGroup]);
  const [childGroup, setChildGroup] = useState(cGroup[pGroup[0] as ChildGroup][0]);

  const [filterGroup, setFilterGroup] = useState(pGroup[0]);

  // const [filterTaskList, setFilterTaskList] = useState(taskList);

  const handleParentGroupChange = (value: string) => {
    // 선택한 상위그룹내용으로 하위 그룹 option으로 변경
    setParentGroup(cGroup[value]);
    setChildGroup(cGroup[value][0]);

    // 선택한 상위 그룹으로 필터링된 페이지로 이동
    setFilterGroup(value);
  };

  const onChildGroupChange = (value: string) => {
    // 선택한 하위 그룹으로 필터링된 페이지로 이동
    setChildGroup(value);
  };

  // dnd - 드래그 끝나면 실행되는 함수
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      // 이상한 곳에 드래그하면 return
      if (!destination) return;

      // 출발지, 도착지의 board 상태 (전, 중, 후)
      const sourceKey = source.droppableId as TaskStatus;
      const destinationKey = destination.droppableId as TaskStatus;

      // 재정렬
      const items = JSON.parse(JSON.stringify(taskStatusList)) as typeof taskStatusList;
      const [targetItem] = items[sourceKey].splice(source.index, 1);
      items[destinationKey].splice(destination.index, 0, targetItem);

      setTaskStatusList(items);
    },
    [taskStatusList]
  );

  // TODO : 그룹 필터링 되는거 확인하고 utils 함수로 빼기
  useEffect(() => {
    const totalTasks = [...taskStatusList.before, ...taskStatusList.going, ...taskStatusList.done]
      .length;
    const doneTasks = taskStatusList.done.length;
    const percent = (doneTasks / totalTasks) * 100;
    setProgress(Math.floor(percent));
  }, [taskStatusList]);

  // 필터링 된 페이지로 이동
  useEffect(() => {
    if (filterGroup === '그룹') {
      navigate(`/workspace/${product}/${project}`);
    } else {
      childGroup === '전체'
        ? navigate(`/workspace/${product}/${project}/group/${filterGroup}`)
        : navigate(`/workspace/${product}/${project}/group/${filterGroup}/${childGroup}`);
    }
  }, [filterGroup, childGroup]);

  // task 데이터 필터링된 그룹에 맞게 필터링
  useEffect(() => {
    if (filterGroup === '그룹') return;

    // const tempFilterGroup: Tasks = {};
    //
    // if (childGroup === '전체') {
    //   Object.keys(taskStatusList).map((key) => {
    //     const filterTasks = taskStatusList[key as TaskStatus].filter(
    //       (task: Task) => task.group === filterGroup
    //     );
    //     console.log(filterTasks);
    //     tempFilterGroup.key = filterTasks;
    //   });
    // } else {
    //   Object.keys(taskStatusList).map((key) => {
    //     const filterTasks = taskStatusList[key as TaskStatus].filter(
    //       (task: Task) => task.group === childGroup
    //     );
    //     console.log(filterTasks);
    //     tempFilterGroup.key = filterTasks;
    //   });
    // }
    //
    // setTaskStatusList(tempFilterGroup);
    // console.log(tempFilterGroup);

    // Object.keys(taskStatusList).map((key) => {
    //   if (childGroup === '전체') {
    //     const filterTasks = taskStatusList[key as TaskStatus].filter(
    //       (task: Task) => task.group === filterGroup
    //     );
    //     console.log(filterTasks);
    //     tempFilterGroup.key = filterTasks;
    //   } else {
    //     const filterTasks = taskStatusList[key as TaskStatus].filter(
    //       (task: Task) => task.group === childGroup
    //     );
    //     console.log(filterTasks);
    //     tempFilterGroup.key = filterTasks;
    //   }
    // console.log('key', key);
    // console.log('taskStatusList[key]', taskStatusList[key]);
    // console.log('taskStatusList', taskStatusList);
    // });

    // if (childGroup === '전체') {
    //   const allGroup = cGroup[filterGroup];
    //
    //   // 현재 Group name으로 필터링 한 결과
    //   const firstGroup = taskList.filter((task) => task.group === filterGroup);
    //
    //   // 현재 Group에 해당하는 subGroup들도 포함해서 필터링 한 결과
    //   for (let i = 1; i < allGroup.length; i++) {
    //     firstGroup.push(...taskList.filter((task) => task.group === allGroup[i]));
    //     // console.log(i, firstGroup);
    //   }
    //   setFilterTaskList(firstGroup);
    // } else {
    //   //TODO : 하위그룹 이름 중복 가능하게 한다면 p_id로 먼저 필터링 해야함
    //   setFilterTaskList(taskList.filter((task) => task.group === childGroup));
    // }
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
                dropdownStyle={{
                  backgroundColor: 'var(--gray-sideBar)',
                  color: 'var(--black)',
                  borderColor: 'var(--border-line)',
                }}
              />
              <Select
                style={{ width: 110 }}
                value={childGroup}
                onChange={onChildGroupChange}
                options={parentGroup.map((group) => ({ label: group, value: group }))}
                dropdownStyle={{
                  backgroundColor: 'var(--gray-sideBar)',
                  color: 'var(--black)',
                  borderColor: 'var(--border-line)',
                }}
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
                  isKanban ? 'text-black font-bold' : 'text-gray-border font-semibold'
                } transition ease-in-out duration-300 hover:scale-110 hover:-translate-y-1`}
              >
                칸반
              </span>
            </button>

            <div className={'mx-4 h-8 border-solid border-r border-[1px] border-gray-border'} />

            <button type={'button'} onClick={() => onClickKanban(false)}>
              <span
                className={`text-3xl transition ease-in-out duration-300 hover:scale-110  ${
                  !isKanban ? 'text-black font-bold' : 'text-gray-border font-semibold'
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
          {/*dnd*/}
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <div
              className={
                'flex-row-center justify-between w-full h-full pt-8 px-[12rem] overflow-x-auto'
              }
            >
              <StatusBoard status={'PROGRESS_BEFORE'} tasks={taskStatusList['before']} />
              <StatusBoard status={'PROGRESS_IN'} tasks={taskStatusList['going']} />
              <StatusBoard status={'PROGRESS_COMPLETE'} tasks={taskStatusList['done']} />
            </div>
          </DragDropContext>
        </section>
        {/*하단페이지로 이동*/}
        <section className={'flex-row-center w-full h-[10%]'}>
          <BsChevronCompactDown
            className={'text-[4rem] text-gray-light cursor-pointer'}
            onClick={() => navigate(`/workspace/${product}/${project}/menu/결과물`)}
          />
        </section>
      </div>
    </section>
  );
}
