import { SelectMenu } from '@/typings/project.ts';
import { Select } from 'antd';
import { taskAll } from '@/recoil/Project/atom.ts';
import { useRecoilState } from 'recoil';
import { RiCheckboxLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import CreateTask from '@/components/Project/Task/CreateTask.tsx';

export default function TaskMain() {
  const { product, project, menutitle } = useParams();
  const navigate = useNavigate();

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

  const userprofile = '';
  // const [taskStatusList, setTaskStatusList] = useRecoilState(taskState);

  const [taskList, setTaskList] = useRecoilState(taskAll);

  // task 추가 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 날짜, 상태 데이터 필터링 값
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //TODO : Task 상태, 날짜별로 필터링해서 보여주기
    console.log(value);
  };

  return (
    <div className={'flex-col-center justify-start w-h-full'}>
      {/*상태별 개수 링 + 날짜, 상태 필터링*/}
      <section className={'flex-row-center justify-between w-full h-[4rem] mt-4 px-6'}>
        <div className={'flex justify-between w-[13rem] px-8'}>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-before'
            }
          >
            {
              taskList.filter(
                (task) => task.menuName === menutitle && task.taskStatus === 'PROGRESS_BEFORE'
              ).length
            }
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-going'
            }
          >
            {
              taskList.filter(
                (task) => task.menuName === menutitle && task.taskStatus === 'PROGRESS_IN'
              ).length
            }
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-done'
            }
          >
            {
              taskList.filter(
                (task) => task.menuName === menutitle && task.taskStatus === 'PROGRESS_COMPLETE'
              ).length
            }
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
          {taskList
            .filter((task) => task.menuName === menutitle)
            .map((task, index) => (
              <section
                key={index}
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
                <div
                  className={'flex-row-center w-h-full justify-end text-gray-dark text-[0.93rem]'}
                >
                  <span className={'mr-3'}>{task.projectTeamName}</span>
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
                  {!userprofile ? (
                    <FaUserCircle className={'flex text-[2.2rem] fill-gray-dark'} />
                  ) : (
                    <img
                      src={userprofile}
                      alt="userprofile"
                      className={'flex w-[2.2rem] h-[2.2rem]'}
                    />
                  )}
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
