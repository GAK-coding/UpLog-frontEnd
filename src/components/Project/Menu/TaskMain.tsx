import { SelectMenu } from '@/typings/project.ts';
import { Select } from 'antd';
import { taskState } from '@/recoil/Project/atom.ts';
import { useRecoilState } from 'recoil';
import { RiCheckboxLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

export default function TaskMain() {
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

  const [taskStatusList, setTaskStatusList] = useRecoilState(taskState);
  // 날짜, 상태 데이터 필터링 값
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //TODO : Task 상태, 날짜별로 필터링해서 보여주기
    console.log(value);
  };

  return (
    <div className={'flex-col-center w-h-full overflow-y-auto'}>
      {/*상태별 개수 링 + 날짜, 상태 필터링*/}
      <section className={'flex-row-center justify-between w-full h-[4rem]'}>
        <div className={'flex justify-between w-[13rem] px-8'}>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-before'
            }
          >
            {taskStatusList['before'].length}
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-going'
            }
          >
            {taskStatusList['going'].length}
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-done'
            }
          >
            {taskStatusList['done'].length}
          </div>
        </div>
        <div className={'flex-row-center justify-between w-[18rem] px-4'}>
          {/*날짜, task 상태별 필터링 select*/}
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange}
            style={{ width: 90 }}
            options={dateData}
          />
          <Select
            labelInValue
            defaultValue={statusData[2]}
            onChange={handleChange}
            style={{ width: 90 }}
            options={statusData}
          />
        </div>
      </section>
      <section
        className={
          'flex-col-center justify-start items-start w-[70%] min-w-[60rem] h-content-board pt-6'
        }
      >
        <div
          className={
            'flex-col-center justify-start items-start w-full min-h-[7rem] border-base rounded-[5px]'
          }
        >
          <section
            className={'flex-row-center justify-start w-full h-[3.5rem] px-4 border-b border-line'}
          >
            <div className={'flex-row-center justify-start w-[14rem] pr-1'}>
              <RiCheckboxLine className={`text-[1.7rem] text-gray-light`} />
              <span className={'ml-2 text-gray-light text-[1.1rem]'}>{`Task 1`}</span>
            </div>
            <div className={'w-[45rem] ml-1 text-[1.1rem] font-bold'}>Task name</div>
            <div
              className={
                'flex-row-center w-h-full justify-end text-gray-dark text-[0.93rem] border border-red-400'
              }
            >
              <span className={'mr-3'}>그룹이름</span>
              <span
                className={
                  'flex items-center px-2 h-[1.5rem] rounded-[0.31rem] bg-orange-light-sideBar'
                }
              >
                메뉴 이름
              </span>
              <div className={'mx-3 h-5 border-solid border-r border-[0.5px] border-gray-light'} />
              <span
                className={
                  'flex items-center px-2 mr-3 h-[1.5rem] rounded-[0.31rem] bg-orange-light-sideBar'
                }
              >
                진행 중
              </span>
              {!userprofile ? (
                <FaUserCircle className={'flex text-[2.2rem] fill-gray-dark'} />
              ) : (
                <img src={userprofile} alt="userprofile" className={'flex w-[2.2rem] h-[2.2rem]'} />
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
