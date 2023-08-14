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
import {
  eachTask,
  editTaskContent,
  editTaskDate,
  editTaskMenu,
  editTaskStatus,
  editTaskTargetMember,
  editTaskTeam,
  editTaskTitle,
} from '@/api/Project/Task.ts';
import { useMutation, useQuery } from 'react-query';
import { useMessage } from '@/hooks/useMessage.ts';
import { checkTaskEditValue } from '@/utils/checkTaskEditValue.ts';
import { useRecoilState } from 'recoil';
import { eachTaskInfo, editTaskInfo } from '@/recoil/Project/Task.ts';

export default function TaskDetail() {
  const { product, project, menutitle, taskid } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage, contextHolder } = useMessage();
  const [editSuccess, setEditSuccess] = useState<boolean>(true);

  // 현재 task 데이터 가져오기
  const [taskInfo, setTaskInfo] = useRecoilState(eachTaskInfo);
  const status = formatStatus(taskInfo.taskStatus);

  // TODO : staleTime 확인 필요 + 시간 다시 설정하기
  // task 한개 데이터 get
  const getTaskData = useQuery(['getTaskEach', taskid], () => eachTask(+taskid!), {
    onSuccess: (data) => {
      // 메뉴별 task get 데이터 가져오기 성공 시 데이터 지정함
      if (typeof data !== 'string' && 'taskName' in data) {
        setTaskInfo(data);
        setEditTask(data);
        setTaskName(data.taskName);
        console.log('가져온 정보', data);
        console.log(editTask, taskName);
      }
    },
    // staleTime: 6000, // 1분
    // cacheTime: 8000, // 1분 20초
    // refetchOnMount: false,
    refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
  });

  // taskname input 값
  const [taskName, onChangeTaskName, setTaskName] = useInput('');
  // 수정 여부
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 새로 수정한 task 데이터 값 저장
  const [editTask, setEditTask] = useRecoilState(editTaskInfo);

  // task (date, title, taskTeam, target-Member, status, menu, content) update 요청
  const { mutate: editDateMutate } = useMutation(
    () => editTaskDate(+taskid!, editTask.startTime, editTask.endTime),
    {
      onSuccess: (data) => {
        if (typeof data === 'string') {
          setEditSuccess(false);
        }
      },
    }
  );

  const { mutate: editTitleMutate } = useMutation(
    () => editTaskTitle(+taskid!, editTask.taskName),
    {
      onSuccess: (data) => {
        if (typeof data === 'string') {
          setEditSuccess(false);
        } else {
          console.log(editTask.taskName);
        }
      },
    }
  );

  const { mutate: editTeamMutate } = useMutation(() => editTaskTeam(+taskid!, +editTask.teamId), {
    onSuccess: (data) => {
      if (typeof data === 'string') {
        setEditSuccess(false);
      } else {
        setTaskInfo({ ...taskInfo, startTime: editTask.startTime, endTime: editTask.endTime });
      }
    },
  });

  const { mutate: editTargetMemberMutate } = useMutation(
    () => editTaskTargetMember(+taskid!, editTask.targetMemberInfoDTO.id),
    {
      onSuccess: (data) => {
        if (typeof data === 'string') {
          setEditSuccess(false);
        } else {
          setTaskInfo({ ...taskInfo, targetMemberInfoDTO: editTask.targetMemberInfoDTO });
        }
      },
    }
  );

  const { mutate: editStatusMutate } = useMutation(
    () => editTaskStatus(+taskid!, editTask.taskStatus),
    {
      onSuccess: (data) => {
        if (typeof data === 'string') {
          setEditSuccess(false);
        } else {
          setTaskInfo({ ...taskInfo, taskStatus: editTask.taskStatus });
        }
      },
    }
  );

  const { mutate: editMenuMutate } = useMutation(() => editTaskMenu(+taskid!, editTask.menuId), {
    onSuccess: (data) => {
      if (typeof data === 'string') {
        setEditSuccess(false);
      } else {
        setTaskInfo({ ...taskInfo, menuId: editTask.menuId });
      }
    },
  });

  const { mutate: editContentMutate } = useMutation(
    () => editTaskContent(+taskid!, editTask.taskDetail),
    {
      onSuccess: (data) => {
        if (typeof data === 'string') {
          setEditSuccess(false);
        } else {
          setTaskInfo({ ...taskInfo, taskDetail: editTask.taskDetail });
        }
      },
    }
  );

  // 수정 버튼 클릭 시
  const onChangeEdit = useCallback(() => {
    setIsEdit(true);
    console.log('여기', editTask, taskName);
  }, [isEdit]);

  // 수정 완료 버튼 클릭 시
  const onSubmitEdit = useCallback(() => {
    // 변경된 값이 비어있는 경우
    const checkEmpty = checkTaskEditValue(editTask);

    if (!checkEmpty) {
      showMessage('warning', 'Task의 정보를 모두 작성해주세요');
      return;
    }

    // 변경된 값만 task update요청 보냄
    const handleMutate = (
      newValue: TaskData[keyof TaskData],
      originalValue: TaskData[keyof TaskData],
      mutateFunction: () => void
    ) => {
      if (newValue !== originalValue && newValue !== null) {
        mutateFunction();
      }
    };

    console.log('변경되는 보내는 값', editTask);
    handleMutate(editTask.taskName, taskInfo.taskName, editTitleMutate);
    handleMutate(editTask.startTime, taskInfo.startTime, editDateMutate);
    handleMutate(editTask.endTime, taskInfo.endTime, editDateMutate);
    handleMutate(editTask.teamId, taskInfo.teamId, editTeamMutate);
    handleMutate(
      editTask.targetMemberInfoDTO.id,
      taskInfo.targetMemberInfoDTO.id,
      editTargetMemberMutate
    );
    handleMutate(editTask.taskStatus, taskInfo.taskStatus, editStatusMutate);
    handleMutate(editTask.menuId, taskInfo.menuId, editMenuMutate);
    handleMutate(editTask.taskDetail, taskInfo.taskDetail, editContentMutate);

    if (!editSuccess) {
      showMessage('error', 'Task 수정에 실패했습니다.');
      return;
    }

    showMessage('success', 'Task 수정에 성공했습니다.');
    setTimeout(() => onClose(), 2000);
    setIsEdit(false);
  }, [isEdit, editTask, editSuccess]);

  // 수정한 task status 데이터 값 저장
  const onChangeSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedTask = {
      ...editTask,
      taskStatus: e.target.value as TaskStatus,
    };

    setEditTask(updatedTask);
  };

  // taskDetail 내용 수정된 값 저장
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

  // // get 해온 데이터로 taskInfo 지정
  // useEffect(() => {
  //   // 메뉴별 task get 데이터 가져오기 성공 시 데이터 지정함
  //   if (getTaskData.data !== undefined && typeof getTaskData.data !== 'string') {
  //     setTaskInfo(getTaskData.data);
  //     console.log('가져온 정보', getTaskData.data);
  //     // setEditTask(getTaskData.data);
  //     setTaskName(getTaskData.data.taskName);
  //   }
  // }, [getTaskData.data]);

  return (
    <section className={'flex w-full h-auto py-20'}>
      {contextHolder}
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
            {isEdit ? (
              <input
                className={'w-[70%] h-full text-3xl mr-4 pb-2'}
                type="text"
                placeholder="Task 제목을 입력해주세요."
                value={taskName}
                onChange={onChangeTaskName}
                maxLength={20}
              />
            ) : (
              <span className={'text-3xl mr-4'}>{taskInfo.taskName}</span>
            )}
            <span className={'text-[1.4rem] text-gray-light'}>{`task ${taskInfo.id}`}</span>
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
        <TaskEditInfo isEdit={isEdit} taskInfo={taskInfo} />
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*세부 내용 */}
        <section className={'w-[70%] h-auto text-[2rem] pt-4 pb-8'}>
          {!isEdit ? (
            <span className={'w-auto h-auto ml-4 text-2xl'}>{taskInfo.taskDetail}</span>
          ) : (
            <Textarea
              defaultValue={taskInfo.taskDetail}
              onChange={onChangeTaskDetail}
              border={'1px solid var(--border-line)'}
              minH={'10rem'}
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
            className={
              'flex-row-center justify-between w-[13rem] h-auto py-4 px-4 mr-6 font-bold text-white'
            }
          >
            <button
              className={'w-[5rem] rounded h-9 bg-orange'}
              onClick={() => {
                if (!isEdit) onChangeEdit();
                else setIsEdit(false);
              }}
            >
              {isEdit ? '취소' : '수정'}
            </button>

            <button
              className={'w-[5rem] rounded h-9 bg-orange'}
              onClick={() => {
                if (!isEdit) {
                  onOpen();
                  return;
                }
                onSubmitEdit();
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
