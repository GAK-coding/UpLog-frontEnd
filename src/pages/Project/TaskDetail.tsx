import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { Select, Textarea, useDisclosure } from '@chakra-ui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import TaskEditInfo from '@/components/Project/Task/TaskEditInfo.tsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { formatStatus } from '@/utils/formatStatus.ts';
import useInput from '@/hooks/useInput.ts';
import { TaskData, TaskStatus } from '@/typings/task.ts';
import DeleteDialog from '@/components/Common/DeleteDialog.tsx';
import { eachTask } from '@/api/Project/Task.ts';
import { useQuery } from 'react-query';

export default function TaskDetail() {
  const { product, project, menutitle, taskid } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // 현재 task 데이터 가져오기
  const [taskInfo, setTaskInfo] = useState<TaskData>({
    id: 0,
    taskName: '',
    targetMember: {
      id: 0,
      name: '',
      image: '',
      nickname: '',
    },
    menuId: 0,
    menuName: '',
    projectId: 0,
    projectTeamName: '',
    projectTeamParentId: 0,
    taskStatus: 'PROGRESS_BEFORE',
    taskDetail: '',
    startTime: '',
    endTime: '',
  });
  const status = formatStatus(taskInfo.taskStatus);

  // TODO : staleTime 확인 필요 + 시간 다시 설정하기
  const getTaskData = useQuery(['task', taskid], () => eachTask(parseInt(taskid!)), {
    staleTime: 6000, // 1분
    cacheTime: 8000, // 1분 20초
    refetchOnMount: false, // 마운트(리렌더링)될 때 데이터를 다시 가져오지 않음
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
    refetchOnReconnect: false, // 네트워크가 다시 연결되었을때 다시 가져오지 않음
  });

  // get 해온 데이터로 taskInfo 지정
  if (getTaskData.isSuccess) {
    if (typeof getTaskData.data !== 'string' && 'id' in getTaskData.data) {
      setTaskInfo(getTaskData.data);
    }
  }

  // 새로 수정한 task 데이터 값 저장
  const [editTask, setEditTask] = useState(taskInfo);

  // 수정 여부
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // taskname input 값
  const [taskName, onChangeTaskName] = useInput(taskInfo.taskName);

  console.log('taskInfo', taskInfo);
  console.log('edit', editTask);

  // 수정 버튼 클릭 시
  const onChangeEdit = useCallback(() => {
    setIsEdit(true);
  }, [isEdit]);

  // 수정한 task 상태 데이터 값 저장
  const onChangeSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedTask = {
      ...editTask,
      taskStatus: e.target.value as TaskStatus,
    };

    setEditTask(updatedTask);
  };

  const onChangeTaskDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTask = {
      ...editTask,
      taskDetail: e.target.value,
    };

    setEditTask(updatedTask);
  };

  // input 값이 바뀔 때마다 editTask에 저장
  useEffect(() => {
    const updatedTask = {
      ...editTask,
      taskName: taskName,
    };

    setEditTask(updatedTask);
  }, [taskName]);

  return (
    <section className={'flex w-full h-auto py-20'}>
      {/*돌아가기 버튼*/}
      <article className={'pt-4 flex justify-center w-[10%] min-w-[6rem] lg:w-[16%]'}>
        <Link
          to={`/workspace/${product}/${project}/menu/${menutitle}`}
          className={'flex justify-center text-[1.3rem] text-gray-dark font-bold'}
        >
          <IoIosArrowBack className={'text-[2.3rem] block'} />
          <span className={'hidden xl:block'}>돌아가기</span>
        </Link>
      </article>
      <article
        className={
          'flex-col-center min-w-[50rem] w-[80%] lg:w-[68%] h-auto border-base border-[0.6px] ml-4 shadow-sign-up'
        }
      >
        <section
          className={'flex-row-center justify-between w-full h-[7rem] pt-[3.2rem] px-[7.2rem]'}
        >
          {/*task 제목, id*/}
          <div className={'flex items-center w-[70%] h-auto font-bold'}>
            {!isEdit ? (
              <span className={'text-3xl mr-4'}>{taskInfo.taskName}</span>
            ) : (
              <input
                className={'w-[70%] h-full text-3xl mr-4 pb-2'}
                type="text"
                placeholder="Task 제목을 입력해주세요."
                value={taskName}
                onChange={onChangeTaskName}
                maxLength={20}
              />
            )}
            <span className={'text-[1.4rem] text-gray-light'}>{`task ${taskid}`}</span>
          </div>
          {/*진행상태 select*/}
          <div className={'w-[30%] h-auto flex justify-end'}>
            {isEdit ? (
              <Select
                onChange={onChangeSelectedType}
                width={'8rem'}
                height={'2rem'}
                backgroundColor={`var(--${editTask.taskStatus})`}
                fontSize={'1rem'}
                border={'none'}
                fontWeight={700}
                color={'#292723'}
                marginLeft={'0.5rem'}
                icon={<AiFillCaretDown fill={'var(--gray-light)'} />}
              >
                <option value={'PROGRESS_BEFORE'}>진행 전</option>
                <option value={'PROGRESS_IN'}>진행 중</option>
                <option value={'PROGRESS_COMPLETE'}>진행 후</option>
              </Select>
            ) : (
              <div
                className={`flex-row-center w-[4.8rem] h-[1.7rem] rounded bg-status-${
                  status === '진행 전' ? 'before' : status === '진행 중' ? 'going' : 'done'
                }`}
              >
                <span className={'text-[0.93rem] text-[#292723]'}>{status}</span>
              </div>
            )}
          </div>
        </section>
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*부가 내용 detail*/}
        <TaskEditInfo isEdit={isEdit} editTask={editTask} setEditTask={setEditTask} />
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*세부 내용 */}
        <section className={'w-[70%] h-auto text-[2rem] pt-4 pb-8'}>
          {!isEdit ? (
            <span className={'w-auto h-auto ml-4 text-2xl'}>{taskInfo.taskDetail}</span>
          ) : (
            <Textarea
              defaultValue={editTask.taskDetail}
              onChange={onChangeTaskDetail}
              border={'1px solid var(--border-line)'}
              height={'100%'}
              focusBorderColor={'none'}
              placeholder={'Task에 대한 상세 설명을 입력해주세요.'}
              color={'var(--black)'}
              maxLength={1000}
            />
          )}
        </section>

        {/*수정 삭제 버튼*/}
        <section className={'flex-row-center justify-end w-full h-[4.5rem] mb-4'}>
          <nav
            className={`flex-row-center ${
              isEdit ? 'justify-end' : 'justify-between'
            } w-[13rem] h-auto py-4 px-4 mr-6 font-bold text-white`}
          >
            {!isEdit && (
              <button className={'w-[5rem] rounded h-9 bg-orange'} onClick={onChangeEdit}>
                수정
              </button>
            )}
            <button
              className={'w-[5rem] rounded h-9 bg-orange'}
              onClick={() => {
                if (!isEdit) {
                  onOpen();
                  return;
                }
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? '완료' : '삭제'}
            </button>
            <DeleteDialog isOpen={isOpen} onClose={onClose} isTask={true} task={+taskid!} />
          </nav>
        </section>
      </article>
    </section>
  );
}
