import { SelectMenu } from '@/typings/menu.ts';
import { Select } from 'antd';
import { taskAll } from '@/recoil/Project/Task.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { RiCheckboxLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import CreateTask from '@/components/Project/Task/CreateTask.tsx';
import { useQuery } from 'react-query';
import { menuTaskList } from '@/api/Project/Task.ts';
import { useEffect } from 'react';
import { menuListData } from '@/recoil/Project/Menu.ts';

export default function TaskMain() {
  const { product, project, menutitle } = useParams();
  const navigate = useNavigate();
  // task 추가 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuList = useRecoilValue(menuListData);
  const menuId = menuList.find((menu) => menu.menuName === menutitle)?.id;
  const [taskList, setTaskList] = useRecoilState(taskAll);

  // 날짜, 상태 필터링 데이터
  const dateData: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '최신순',
      label: '최신순',
    },
  ];
  const statusData: SelectMenu[] = [
    { value: 'done', label: '완료' },
    { value: 'before', label: '완료 전' },
    { value: 'all', label: '전체' },
  ];

  // 메뉴별 task 데이터 가져오기
  const getMenuTaskList = useQuery(['getMenuTaskList', menuId], () => menuTaskList(menuId!), {
    staleTime: 0, // 10분
    cacheTime: 80000, // 12분
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    select: (data) => {
      if (data !== undefined) {
        if (typeof data !== 'string') {
          return data.tasks;
        }
      }
    },
  });

  // 날짜, 상태 데이터 필터링 값
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //TODO : Task 상태, 날짜별로 필터링해서 보여주기
    console.log(value);
  };

  useEffect(() => {
    // 메뉴별 task get 데이터 가져오기 성공 시 데이터 지정함
    if (getMenuTaskList.data !== undefined) {
      setTaskList(getMenuTaskList.data);
      console.log(getMenuTaskList.data);
    }
  }, [getMenuTaskList.data]);

  return (
    <div className={'flex-col-center justify-start w-full h-auto mb-8'}>
      {/*상태별 개수 링 + 날짜, 상태 필터링*/}
      <section className={'flex-row-center justify-between w-full h-[4rem] mt-4 px-6'}>
        <div className={'flex justify-between w-[13rem] px-8'}>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-before'
            }
          >
            {taskList.filter((task) => task.taskStatus === 'PROGRESS_BEFORE').length}
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-going'
            }
          >
            {taskList.filter((task) => task.taskStatus === 'PROGRESS_IN').length}
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-done'
            }
          >
            {taskList.filter((task) => task.taskStatus === 'PROGRESS_COMPLETE').length}
          </div>
        </div>
        <div className={'flex-row-center justify-between w-[18rem] px-4 z-10'}>
          {/*날짜, task 상태별 필터링 select*/}
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange}
            style={{ width: 90 }}
            options={dateData}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
          <Select
            labelInValue
            defaultValue={statusData[2]}
            onChange={handleChange}
            style={{ width: 90 }}
            options={statusData}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        </div>
      </section>
      <section
        className={'flex-col-center justify-start items-start w-[70%] min-w-[60rem] h-[90%] pt-6'}
      >
        {/*task list border*/}
        <div
          className={
            'flex-col-center justify-start items-start w-full border-base rounded-[5px] mt-6'
          }
        >
          {/*task 정보*/}
          {taskList.map((task) => (
            <section
              key={task.id}
              className={
                'flex-row-center justify-start w-full min-h-[3.5rem] px-4 border-b border-line cursor-pointer'
              }
              onClick={() =>
                navigate(`/workspace/${product}/${project}/menu/${menutitle}/task/${task.id}`)
              }
            >
              {/*체크박스 + task 이름*/}
              <div className={'flex-row-center justify-start w-[14rem] pr-1'}>
                <RiCheckboxLine
                  className={`text-[1.7rem] ${
                    task.taskStatus === 'PROGRESS_COMPLETE' ? 'text-orange' : 'text-gray-light'
                  }`}
                />
                <span className={'ml-2 text-gray-light text-[1.1rem]'}>{`Task ${task.id}`}</span>
              </div>
              <div className={'w-[45rem] ml-1 text-[1.1rem] font-bold'}>{task.taskName}</div>

              {/*task 메뉴, 상태, 할당자*/}
              <div className={'flex-row-center w-h-full justify-end text-gray-dark text-[0.93rem]'}>
                <span className={'mr-3'}>{task.teamName}</span>
                <span
                  className={
                    'flex items-center px-2 h-[1.5rem] rounded-[0.31rem] bg-orange-light-sideBar'
                  }
                >
                  {task.menuName}
                </span>
                <div
                  className={'mx-3 h-5 border-solid border-r border-[0.5px] border-gray-light'}
                />
                <span
                  className={`flex items-center px-2 mr-3 h-[1.5rem] rounded-[0.31rem] text-[#292723] 
                    ${task.taskStatus === 'PROGRESS_BEFORE' && 'bg-status-before'}
                  ${task.taskStatus === 'PROGRESS_IN' && 'bg-status-going'}
                  ${task.taskStatus === 'PROGRESS_COMPLETE' && 'bg-status-done'}`}
                >
                  {task.taskStatus === 'PROGRESS_BEFORE' && '진행 전'}
                  {task.taskStatus === 'PROGRESS_IN' && '진행 중'}
                  {task.taskStatus === 'PROGRESS_COMPLETE' && '진행 후'}
                </span>
                {/*{!task.targetMember.image ? (*/}
                {/*  <FaUserCircle className={'flex text-[2.2rem] fill-gray-dark'} />*/}
                {/*) : (*/}
                {/*  <img*/}
                {/*    src={task.targetMember.image}*/}
                {/*    alt="userprofile"*/}
                {/*    className={'flex w-[2.2rem] h-[2.2rem]'}*/}
                {/*  />*/}
                {/*)}*/}
              </div>
            </section>
          ))}
          <section
            className={
              'flex-row-center justify-start w-full min-h-[3.5rem] px-4 text-gray-dark cursor-pointer'
            }
            onClick={() => onOpen()}
          >
            <AiOutlinePlus className={'text-[1.7rem]'} />
            <span className={'ml-2 text-[1.1rem]'}>Task 생성하기</span>
          </section>
        </div>
      </section>
      <CreateTask isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
