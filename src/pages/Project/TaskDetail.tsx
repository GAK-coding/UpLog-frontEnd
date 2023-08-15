import { IoIosArrowBack } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { Select, Textarea, useDisclosure } from '@chakra-ui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import TaskEditInfo from '@/components/Project/Task/TaskEditInfo.tsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { formatStatus } from '@/utils/formatStatus.ts';
import useInput from '@/hooks/useInput.ts';
import { TaskStatus, UpdateTaskBody } from '@/typings/task.ts';
import DeleteDialog from '@/components/Common/DeleteDialog.tsx';
import { eachTask, editTask } from '@/api/Project/Task.ts';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useMessage } from '@/hooks/useMessage.ts';
import { checkTaskEditValue } from '@/utils/checkTaskEditValue.ts';
import { useRecoilState } from 'recoil';
import { eachTaskInfo, editTaskInfo } from '@/recoil/Project/Task.ts';

export default function TaskDetail() {
  const { product, project, menutitle, taskid } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showMessage, contextHolder } = useMessage();
  const [editSuccess, setEditSuccess] = useState<boolean>(true);
  const queryClient = useQueryClient();

  // 현재 task 데이터 가져오기
  const [taskInfo, setTaskInfo] = useRecoilState(eachTaskInfo);
  const status = formatStatus(taskInfo.taskStatus);

  // taskname input 값
  const [taskName, onChangeTaskName, setTaskName] = useInput<string | null>(null);
  // 수정 여부
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 새로 수정한 task 데이터 값 저장
  const [editTaskData, setEditTask] = useRecoilState(editTaskInfo);

  // TODO : staleTime 확인 필요 + 시간 다시 설정하기
  // task 한개 데이터 get
  const getTaskData = useQuery(['getTaskEach', taskid], () => eachTask(+taskid!), {
    onSuccess: (data) => {
      // 메뉴별 task get 데이터 가져오기 성공 시 데이터 지정함
      if (typeof data !== 'string' && 'taskName' in data) {
        setTaskInfo(data);
        setTaskName(data.taskName);
      }
    },
    // staleTime: 6000, // 1분
    // cacheTime: 8000, // 1분 20초
    // refetchOnMount: false,
    // refetchOnWindowFocus: false, // 브라우저를 포커싱했을때 데이터를 가져오지 않음
  });

  // task update
  const { mutate: editTaskMutate } = useMutation(
    (editTaskData: UpdateTaskBody) => editTask(editTaskData, +taskid!),
    {
      onSuccess: (data) => {
        if (typeof data === 'string') {
          setEditSuccess(false);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['getTaskEach', taskid]);
      },
    }
  );

  // 수정 버튼 클릭 시
  const onChangeEdit = useCallback(() => {
    setIsEdit(true);
  }, [isEdit]);

  // 수정 완료 버튼 클릭 시
  const onSubmitEdit = useCallback(() => {
    // 변경된 값이 비어있는 경우
    const checkEmpty = checkTaskEditValue(editTaskData);

    if (!checkEmpty) {
      showMessage('warning', 'Task의 정보를 모두 작성해주세요');
      return;
    }
    editTaskMutate(editTaskData);

    if (!editSuccess) {
      showMessage('error', 'Task 수정에 실패했습니다.');
      return;
    }

    showMessage('success', 'Task 수정에 성공했습니다.');
    setTimeout(() => onClose(), 2000);
    setIsEdit(false);
  }, [isEdit, editTaskData, editSuccess]);

  // 수정한 task status 데이터 값 저장
  const onChangeSelectedType = (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedTask = {
      ...editTaskData,
      updateTaskStatus: e.target.value as TaskStatus,
    };

    setEditTask(updatedTask);
  };

  // taskDetail 내용 수정된 값 저장
  const onChangeTaskDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTask = {
      ...editTaskData,
      updateTaskDetail: e.target.value,
    };
    console.log();
    setEditTask(updatedTask);
  };

  // input 값이 바뀔 때마다 editTask에 저장
  useEffect(() => {
    const updatedTask = {
      ...editTaskData,
      updateTaskName: taskName,
    };

    setEditTask(updatedTask);
  }, [taskName]);

  return (
    <section className={'flex w-full h-auto py-20'}>
      {contextHolder}
      {/*돌아가기 버튼*/}
      <article className={'pt-4 flex justify-center w-[10%] min-w-[6rem] lg:w-[16%]'}>
        <div className={'flex justify-center text-[1.3rem] text-gray-dark font-bold'}>
          <IoIosArrowBack
            className={'text-[2.3rem] block'}
            onClick={() => {
              history.back();
            }}
          />
          <span className={'hidden xl:block'}>돌아가기</span>
        </div>
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
                value={taskName ?? ''}
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
                backgroundColor={`${
                  editTaskData.updateTaskStatus === null
                    ? `var(--${taskInfo.taskStatus})`
                    : `var(--${editTaskData.updateTaskStatus})`
                } `}
                fontSize={'1rem'}
                border={'none'}
                fontWeight={700}
                color={'#292723'}
                marginLeft={'0.5rem'}
                defaultValue={taskInfo.taskStatus}
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
