import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { Select, Textarea } from '@chakra-ui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import TaskEditInfo from '@/components/Project/Task/TaskEditInfo.tsx';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { formatStatus } from '@/utils/formatStatus.ts';
import { useRecoilValue } from 'recoil';
import { taskAll } from '@/recoil/Project/atom.ts';
import useInput from '@/hooks/useInput.ts';
import { TaskStatus } from '@/typings/project.ts';

export default function TaskDetail() {
  const { product, project, menutitle, taskid } = useParams();

  // 현재 task 데이터 가져오기
  const taskData = useRecoilValue(taskAll);
  const taskInfo = taskData.filter((task) => task.id === parseInt(taskid!));
  const status = formatStatus(taskInfo[0].taskStatus);

  // 수정 여부
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 새로 수정한 task 데이터 값 저장
  const [editTask, setEditTask] = useState(taskInfo[0]);

  // taskname input 값
  const [taskName, onChangeTaskName] = useInput(taskInfo[0].taskName);
  // task description input 값
  // const [taskDescription, onChangeTaskDescription] = useInput(taskInfo[0].taskDetail);

  console.log('taskInfo', taskInfo[0]);
  console.log('edit', editTask);
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

  const onChangeTaskDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
              <span className={'text-3xl mr-4'}>{taskInfo[0].taskName}</span>
            ) : (
              <input
                className={'w-[70%] h-full text-3xl mr-4 border-b border-orange pb-2'}
                type="text"
                placeholder="Task 제목을 입력해주세요."
                value={taskName}
                onChange={onChangeTaskName}
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
                <span className={'text-[0.93rem] text-gray-dark'}>{status}</span>
              </div>
            )}
          </div>
        </section>
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*부가 내용 detail*/}
        <TaskEditInfo isEdit={isEdit} />
        <div className={'w-[80%] border-b border-gray-spring my-4'}></div>
        {/*세부 내용 */}
        <section className={'w-[70%] h-auto text-[2rem] pt-4 pb-8'}>
          {!isEdit ? (
            <span className={'w-auto h-auto ml-4 text-2xl'}>{taskInfo[0].taskDetail}</span>
          ) : (
            <Textarea
              defaultValue={editTask.taskDetail}
              onChange={onChangeTaskDescription}
              border={'1px solid var(--border-line)'}
              height={'100%'}
              focusBorderColor={'none'}
              placeholder={'Task에 대한 상세 설명을 입력해주세요.'}
              color={'var(--black)'}
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
            <button className={'w-[5rem] rounded h-9 bg-orange'} onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? '완료' : '삭제'}
            </button>
          </nav>
        </section>
      </article>
    </section>
  );
}
