import { DatePicker, DatePickerProps, Select } from 'antd';
import { SubGroup } from '@/typings/project.ts';
import { SelectMenu } from '@/typings/menu.ts';
import { TaskData } from '@/typings/task.ts';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import * as dayjs from 'dayjs';
import { productMemberList } from '@/recoil/Product/atom.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useGetMenuList } from '@/components/Project/hooks/useGetMenuList.ts';
import { editTaskInfo } from '@/recoil/Project/Task.ts';
import { RangePickerProps } from 'antd/es/date-picker';

interface Props {
  isEdit: boolean;
  taskInfo: TaskData;
}
export default function TaskEditInfo({ isEdit, taskInfo }: Props) {
  const projectId = 10;
  const [editTaskData, setEditTask] = useRecoilState(editTaskInfo);
  const pGroup: string[] = ['그룹', '개발팀', '마케팅팀', '홍보팀'];
  const cGroup: SubGroup = {
    그룹: ['하위그룹'],
    개발팀: ['전체', '프론트엔드', '백엔드', '풀스택'],
    마케팅팀: ['전체', 'SNS', '디자인'],
    홍보팀: ['전체', 'SNS', '기사'],
  };
  type ChildGroup = keyof typeof cGroup;

  const [parentGroup, setParentGroup] = useState(cGroup[pGroup[0] as ChildGroup]);
  const [childGroup, setChildGroup] = useState(cGroup[pGroup[0] as ChildGroup][0]);
  const [menuData] = useGetMenuList(projectId);
  const menuList = menuData;

  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.id.toString(),
    label: menuItem.menuName,
  }));

  const member = useRecoilValue(productMemberList);
  const memberList: SelectMenu[] = member.map((memberItem) => ({
    value: memberItem.id.toString(),
    label: `${memberItem.nickName}(${memberItem.name})`,
  }));

  // 시작 날짜 입력 값
  const onChangeStartTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...editTaskData,
      updateStartTime: dateString,
    };

    setEditTask(updatedTask);
  };

  // 종료 날짜 입력 값
  const onChangeEndTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...editTaskData,
      updateEndTime: dateString,
    };

    setEditTask(updatedTask);
  };

  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    // menuId
    if (type === 'menuId') {
      const updatedTask = {
        ...editTaskData,
        updateMenuId: +value.value,
      };
      setEditTask(updatedTask);
      return;
    }

    // targetMember
    if (type === 'targetMember') {
      const updatedTask = {
        ...editTaskData,
        updateTargetMemberId: +value.value,
      };

      setEditTask(updatedTask);
    }
  };

  // 종료날짜 범위 제한
  const disabledDateEnd: RangePickerProps['disabledDate'] = (current) => {
    const updateStartTime =
      editTaskData === null ? taskInfo.startTime : editTaskData.updateStartTime;
    return current && current < dayjs(updateStartTime).startOf('day');
  };

  // TODO : projectTeamId 값 group id 값으로 바꾸기
  // 상위그룹 select 선택 값
  const handleParentGroupChange = (value: string) => {
    // 선택한 상위그룹내용으로 하위 그룹 option으로 변경
    setParentGroup(cGroup[value]);
    setChildGroup(cGroup[value][0]);

    const updatedTask = {
      ...editTaskData,
      updateTeamId: +value,
      updateTeamName: value,
    };

    setEditTask(updatedTask);
  };

  // 하위그룹 select 선택 값
  const onChildGroupChange = (value: string) => {
    setChildGroup(value);

    const updatedTask = {
      ...editTaskData,
      updateTeamId: +value,
      updateTeamName: value,
    };

    setEditTask(updatedTask);
  };

  return (
    <section className={'flex-col justify-start items-start w-[80%] h-[15rem] pl-[3rem]'}>
      {/*시작날짜*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        {/*제목 | */}
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>시작날짜</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>

        {/*시작날짜*/}
        {isEdit ? (
          <DatePicker
            defaultValue={dayjs(taskInfo.startTime, 'YYYY.MM.DD')}
            onChange={onChangeStartTime}
            placement={'bottomLeft'}
            bordered={false}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>{taskInfo.startTime}</span>
        )}
      </div>

      {/*종료날짜*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>종료날짜</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <DatePicker
            defaultValue={dayjs(taskInfo.endTime, 'YYYY.MM.DD')}
            onChange={onChangeEndTime}
            placement={'bottomLeft'}
            bordered={false}
            disabledDate={disabledDateEnd}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>{taskInfo.endTime}</span>
        )}
      </div>
      {/*메뉴*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>메뉴</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <Select
            labelInValue
            defaultValue={{ value: '-1', label: taskInfo.menuName }}
            onChange={handleChange('menuId')}
            style={{ width: 120 }}
            bordered={false}
            options={menuNameList}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>{taskInfo.menuName}</span>
        )}
      </div>

      {/*그룹*/}
      <div
        className={'flex items-center justify-start w-[25rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>그룹</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <div className={'flex justify-between pr-7'}>
            {/*TODO : projectTeamParentId 값 존재에 따라 defaultValue 값 변경하기*/}
            <Select
              defaultValue={pGroup[0]}
              style={{ width: 100 }}
              onChange={handleParentGroupChange}
              bordered={false}
              options={pGroup.map((group) => ({ label: group, value: group }))}
              dropdownStyle={{
                backgroundColor: 'var(--gray-sideBar)',
                color: 'var(--black)',
                borderColor: 'var(--border-line)',
              }}
            />

            <Select
              style={{ width: 100 }}
              value={childGroup}
              onChange={onChildGroupChange}
              options={parentGroup.map((group) => ({ label: group, value: group }))}
              bordered={false}
              dropdownStyle={{
                backgroundColor: 'var(--gray-sideBar)',
                color: 'var(--black)',
                borderColor: 'var(--border-line)',
              }}
            />
          </div>
        ) : (
          <span className={'ml-3 text-gray-dark'}>{taskInfo.teamName}</span>
        )}
      </div>

      {/*할당자*/}
      <div
        className={'flex items-center justify-start w-[20rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>할당자</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {/*{taskInfo.targetMemberInfoDTO.image && taskInfo.targetMemberInfoDTO.image === '' ? (*/}
        {/*  <FaUserCircle className={'ml-3 text-[2rem] fill-gray-dark'} />*/}
        {/*) : (*/}
        {/*  <img*/}
        {/*    src={taskInfo.targetMemberInfoDTO.image}*/}
        {/*    className={'ml-3 w-[2rem] h-[2rem] rounded-full'}*/}
        {/*  />*/}
        {/*)}*/}

        {isEdit ? (
          <Select
            labelInValue
            defaultValue={{
              value: `${taskInfo.targetMemberInfoDTO.id}`,
              label: `${taskInfo.targetMemberInfoDTO.nickname}(${taskInfo.targetMemberInfoDTO.name})`,
            }}
            onChange={handleChange('targetMember')}
            style={{ width: 120 }}
            bordered={false}
            options={memberList}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        ) : (
          <span className={'ml-2 text-gray-dark'}>
            {taskInfo.targetMemberInfoDTO &&
              `${taskInfo.targetMemberInfoDTO.nickname}(${taskInfo.targetMemberInfoDTO.name})`}
          </span>
        )}
      </div>
    </section>
  );
}
