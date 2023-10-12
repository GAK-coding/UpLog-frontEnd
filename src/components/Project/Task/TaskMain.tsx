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
import { useEffect, useState } from 'react';
import { menuListData } from '@/recoil/Project/Menu.ts';
import { MenuTaskData, TaskData } from '@/typings/task.ts';
import { getProductMemberList } from '@/api/Product/Product.ts';
import { ProductInfo } from '@/typings/product.ts';
import { allMemberList, productMemberList } from '@/recoil/Product/atom.ts';
import { SaveProjectInfo } from '@/typings/project.ts';
import { FaUserCircle } from 'react-icons/fa';

export default function TaskMain() {
  const { product, project, menutitle } = useParams();
  const nowProduct: ProductInfo = JSON.parse(sessionStorage.getItem('nowProduct')!);
  const nowProject: SaveProjectInfo = JSON.parse(sessionStorage.getItem('nowProject')!);

  const navigate = useNavigate();
  // task 추가 모달창
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuList = useRecoilValue(menuListData);
  const menuId = menuList.find((menu) => menu.menuName === menutitle)?.id;
  const [taskList, setTaskList] = useRecoilState(taskAll);
  const [firstTaskList, setFirstTaskList] = useState<MenuTaskData[]>([]);
  const [memberList, setMemberList] = useRecoilState(productMemberList);
  const [memberListData, setMemberListData] = useRecoilState(allMemberList);

  // 날짜, 상태 필터링 데이터
  const dateData: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '마감날짜',
      label: '마감날짜',
    },
  ];

  const statusData: SelectMenu[] = [
    { value: 'done', label: '완료' },
    { value: 'before', label: '완료 전' },
    { value: 'all', label: '전체' },
  ];

  // 메뉴별 task 데이터 가져오기
  const getMenuTaskList = useQuery(['getMenuTaskList', menuId], () => menuTaskList(menuId!), {
    onSuccess: (data) => {
      if (typeof data !== 'string') {
        setTaskList(data);
        setFirstTaskList(data);
      }
    },

    staleTime: 0, // 10분
    cacheTime: 80000, // 12분
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
  });

  // 멤버 리스트 조회
  const { data } = useQuery(
    ['getMemberList', nowProduct.productId],
    () => getProductMemberList(nowProduct.productId),
    {
      onSuccess: (data) => {
        if (typeof data !== 'string') {
          setMemberList(data);
        }
      },
    }
  );

  // 날짜, 상태 데이터 필터링 값
  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    // task 상태
    if (type === 'status') {
      switch (value.value) {
        case 'done': {
          setTaskList(firstTaskList.filter((task) => task.taskStatus === 'PROGRESS_COMPLETE'));
          break;
        }
        case 'before': {
          setTaskList(
            firstTaskList.filter(
              (task) => task.taskStatus === 'PROGRESS_BEFORE' || task.taskStatus === 'PROGRESS_IN'
            )
          );
          break;
        }
        default: {
          setTaskList(firstTaskList);
          break;
        }
      }
    } else {
      switch (value.value) {
        case '마감날짜': {
          const sortedTaskList = firstTaskList.slice().sort((taskA, taskB) => {
            // endTime을 날짜 객체로 변환하여 시간 간격을 계산
            const endTimeA = new Date(taskA.endTime);
            const endTimeB = new Date(taskB.endTime);

            // 가장 마감일이 촉박한 순서대로 정렬함
            return endTimeA.getTime() - endTimeB.getTime();
          });
          setTaskList(sortedTaskList);
          break;
        }
        default: {
          setTaskList(firstTaskList!);
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (memberList !== undefined) {
      const updateList: SelectMenu[] = memberList
        .filter((member) => member.powerType !== 'CLIENT')
        .map((memberItem) => ({
          value: memberItem.memberId.toString(),
          label: `${memberItem.memberNickName}(${memberItem.memberName})`,
        }));

      setMemberListData(updateList);
    }
  }, [data]);

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
            {firstTaskList.filter((task) => task.taskStatus === 'PROGRESS_BEFORE').length}
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-going'
            }
          >
            {firstTaskList.filter((task) => task.taskStatus === 'PROGRESS_IN').length}
          </div>
          <div
            className={
              'flex-row-center text-[0.9rem] text-gray-dark task-status-ring border-status-done'
            }
          >
            {firstTaskList.filter((task) => task.taskStatus === 'PROGRESS_COMPLETE').length}
          </div>
        </div>
        <div className={'flex-row-center justify-between w-[18rem] px-4 z-10'}>
          {/*날짜, task 상태별 필터링 select*/}
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange('date')}
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
            onChange={handleChange('status')}
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
            'flex-col-center justify-start items-start w-full border-base border-gray-border bg-post-bg rounded-[5px] mt-6'
          }
        >
          {/*task 정보*/}
          {firstTaskList.map((task) => (
            <section
              key={task.id}
              className={
                'flex-row-center justify-start w-full min-h-[3.5rem] border-b px-4 border-gray-border cursor-pointer'
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
                {/*<span className={'mr-3'}>{task.teamName}</span>*/}
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
                  className={`flex items-center px-2 mr-5 h-[1.5rem] rounded-[0.31rem] text-[#292723] 
                    ${task.taskStatus === 'PROGRESS_BEFORE' && 'bg-status-before'}
                  ${task.taskStatus === 'PROGRESS_IN' && 'bg-status-going'}
                  ${task.taskStatus === 'PROGRESS_COMPLETE' && 'bg-status-done'}`}
                >
                  {task.taskStatus === 'PROGRESS_BEFORE' && '진행 전'}
                  {task.taskStatus === 'PROGRESS_IN' && '진행 중'}
                  {task.taskStatus === 'PROGRESS_COMPLETE' && '진행 후'}
                </span>
                {!task.targetMemberInfoDTO.image ? (
                  <FaUserCircle className={'flex text-[2.2rem] fill-gray-dark'} />
                ) : (
                  <img
                    src={task.targetMemberInfoDTO.image}
                    alt="userprofile"
                    className={'flex w-[2.2rem] h-[2.2rem]'}
                  />
                )}
              </div>
            </section>
          ))}
          {nowProject.projectStatus !== 'PROGRESS_COMPLETE' && (
            <section
              className={
                'flex-row-center justify-start w-full min-h-[3.5rem] px-4 bg-post-bg text-gray-dark cursor-pointer'
              }
              onClick={() => onOpen()}
            >
              <AiOutlinePlus className={'text-[1.7rem]'} />
              <span className={'ml-2 text-[1.1rem]'}>Task 생성하기</span>
            </section>
          )}
        </div>
      </section>
      <CreateTask isOpen={isOpen} onClose={onClose} menuId={menuId!} />
    </div>
  );
}
