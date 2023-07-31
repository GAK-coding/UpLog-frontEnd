import { Task } from '@/typings/project.ts';
import BoardTaskDetail from '@/components/Project/Board/BoardTaskDetail.tsx';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface Props {
  status: 'before' | 'going' | 'done';
  tasks: Task[];
}
export default function StatusBoard({ status, tasks }: Props) {
  //status에 따라 필터링
  const filteredTasks = tasks.filter((task) => task.status === status);

  const [statusInfo, setStatusInfo] = useState('');
  // 유저 프로필 존재하는지 안하는지
  const userprofile = '';
  // task detail 클릭 여부
  const [isClickTaskDetail, setIsClickTaskDetail] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (status === 'before') {
      setStatusInfo('진행 전');
    } else if (status === 'going') {
      setStatusInfo('진행 중');
    } else {
      setStatusInfo('진행 후');
    }
  }, []);

  return (
    <section className={'w-[24rem] h-full task-border'}>
      {/*제목, 개수*/}
      <div
        className={
          'flex-row-center justify-between h-[3.5rem] px-[2.3rem] text-gray-dark text-[0.93rem]'
        }
      >
        <span className={'font-bold'}>{statusInfo}</span>
        <span>{`${filteredTasks.length}개`}</span>
      </div>

      {/*태스크들*/}
      <div className={'flex-col max-h-[90%] px-[1.8rem] overflow-y-auto'}>
        {filteredTasks.map((task) => (
          <section
            className={
              'flex-col w-[19.5rem] h-[8rem] bg-white rounded-[10px] my-[0.5rem] px-[1.12rem] py-[0.5rem]'
            }
            key={task.id}
          >
            {/*케밥 버튼*/}
            <div className={'flex justify-end h-[0.7rem] relative'}>
              <GoKebabHorizontal
                className={'fill-gray-dark cursor-pointer'}
                onClick={() =>
                  setIsClickTaskDetail((prevState) => ({
                    ...prevState,
                    [task.id]: !prevState[task.id],
                  }))
                }
              />
              {
                /*케밥 버튼 클릭시*/
                isClickTaskDetail[task.id] && <BoardTaskDetail />
              }
            </div>
            {/*task제목*/}
            <div className={'flex justify-start h-[2.5rem]'}>
              <span className={'text-[1rem]'}>{task.name}</span>
            </div>
            {/*그룹정보*/}
            <div className={'flex justify-start items-center mb-2'}>
              <span className={'text-gray-dark text-[0.65rem]'}>{task.group}</span>
            </div>
            {/*menu, 할당자 정보 */}
            <div className={'flex-row-center justify-between text-[0.65rem] text-gray-dark'}>
              <span
                className={
                  'flex items-center px-2 h-[1.5rem] rounded-[0.31rem] bg-orange-light-sideBar '
                }
              >
                {task.menu}
              </span>
              <div className={'flex-row-center justify-between items-center'}>
                <span className={'px-2 text-[0.65rem] text-gray-dark'}>{task.targetMember}</span>
                {!userprofile ? (
                  <FaUserCircle className={'flex-row text-[1.7rem] fill-gray-dark'} />
                ) : (
                  <img
                    src={userprofile}
                    alt="userprofile"
                    className={'flex w-[1.7rem] h-[1.7rem]'}
                  />
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}