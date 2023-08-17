import { TaskData, TaskStatus } from '@/typings/task.ts';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { formatStatus } from '@/utils/formatStatus.ts';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMessage } from '@/hooks/useMessage.ts';
import { setClipBoardUrl } from '@/utils/setClipBoardUrl.ts';

interface Props {
  status: TaskStatus;
  tasks: TaskData[];
}
export default function StatusBoard({ status, tasks }: Props) {
  const convertStatus = formatStatus(status);
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();
  // task detail 클릭 여부
  const [isClickTaskDetail, setIsClickTaskDetail] = useState<{ [key: number]: boolean }>({});

  const location = useLocation();

  // task 링크복사
  const handleCopyClipBoard = (task: TaskData) => {
    try {
      navigator.clipboard.writeText(setClipBoardUrl(task, location.pathname));
      showMessage('success', '링크가 복사되었습니다.');
    } catch (error) {
      console.log(error);
      showMessage('error', '링크복사에 실패했습니다.');
    }
  };

  // task 수정
  return (
    //TODO : 보드 max-w 적용시키기
    <Droppable droppableId={status} isDropDisabled={false}>
      {(provided) => (
        <section
          className={'min-w-[24rem] max-w-[40rem] w-auto h-full mx-6 task-border'}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {contextHolder}
          {/*제목, 개수*/}
          <div
            className={
              'flex-row-center justify-between h-[3.5rem] px-[2.3rem] text-gray-dark text-[0.93rem]'
            }
          >
            <span className={'font-bold'}>{convertStatus}</span>
            {tasks && <span>{`${tasks.length}개`}</span>}
          </div>

          {/*태스크들*/}
          <div className={'flex-col items-center max-h-[85%] overflow-y-auto'}>
            {tasks &&
              tasks.map((task, index) => (
                <Draggable draggableId={task.id.toString()} index={index} key={task.id.toString()}>
                  {(provided, snapshot) => (
                    <section
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={task.id}
                      className={`flex-col min-w-[19.5rem] w-[85%] h-[8rem] bg-white rounded-[10px] mx-auto my-[0.5rem] px-[1.12rem] py-[0.5rem]
                      ${snapshot.isDragging ? 'shadow-2xl shadow-gray-400' : ''}`}
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   navigate(
                      //     `/workspace/${product}/${project}/menu/${task.menuName}/task/${task.id}`
                      //   );
                      // }}
                    >
                      {/*케밥 버튼*/}
                      <div className={'flex justify-end h-[0.7rem] relative'}>
                        <GoKebabHorizontal
                          className={'fill-gray-dark cursor-pointer z-50'}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsClickTaskDetail((prevState) => ({
                              ...prevState,
                              [task.id]: !prevState[task.id],
                            }));
                          }}
                        />

                        {
                          /*케밥 버튼 클릭시*/
                          isClickTaskDetail[task.id] && (
                            <section
                              className={
                                'absolute flex-col-center w-[5rem] h-[4.5rem] top-[1rem] task-detail-border cursor-pointer text-[0.5rem] text-gray-dark'
                              }
                            >
                              <div
                                className={
                                  'flex-row-center w-full h-1/2 hover:bg-orange-light-sideBar'
                                }
                                onClick={() => handleCopyClipBoard(task)}
                              >
                                링크복사
                              </div>
                              <div
                                className={
                                  'flex-row-center w-full h-1/2 hover:bg-orange-light-sideBar'
                                }
                                onClick={() => {
                                  navigate(
                                    `${location.pathname}/menu/${task.menuName}/task/${task.id}`
                                  );
                                }}
                              >
                                상세정보
                              </div>
                            </section>
                          )
                        }
                      </div>
                      {/*task제목*/}
                      <div className={'flex justify-start h-[2.5rem]'}>
                        <span className={'text-[1rem]'}>{task.taskName}</span>
                      </div>
                      {/*그룹정보*/}
                      <div className={'flex justify-start items-center mb-2'}>
                        <span className={'text-gray-dark text-[0.65rem]'}>&nbsp;</span>
                        {/*<span className={'text-gray-dark text-[0.65rem]'}>{task.teamName}</span>*/}
                      </div>
                      {/*menu, 할당자 정보 */}
                      <div
                        className={'flex-row-center justify-between text-[0.65rem] text-gray-dark'}
                      >
                        <span
                          className={
                            'flex items-center px-2 h-[1.5rem] rounded-[0.31rem] bg-orange-light-sideBar '
                          }
                        >
                          {task.menuName}
                        </span>
                        <div className={'flex-row-center justify-between items-center'}>
                          <span className={'px-2 text-[0.65rem] text-gray-dark'}>
                            {task.targetMemberInfoDTO.name}
                          </span>
                          {!task.targetMemberInfoDTO.image ? (
                            <FaUserCircle className={'flex text-[1.7rem] fill-gray-dark'} />
                          ) : (
                            <img
                              src={task.targetMemberInfoDTO.image}
                              alt="userprofile"
                              className={'flex w-[1.7rem] h-[1.7rem]'}
                            />
                          )}
                        </div>
                      </div>
                    </section>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        </section>
      )}
    </Droppable>
  );
}
