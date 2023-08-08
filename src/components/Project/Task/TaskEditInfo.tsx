import { DatePicker, DatePickerProps, Select } from 'antd';
import { SelectMenu, Task } from '@/typings/project.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import * as dayjs from 'dayjs';
import { menuListData } from '@/recoil/Project/atom.ts';
import { productMemberList } from '@/recoil/Product/atom.ts';
import { useRecoilValue } from 'recoil';

interface Props {
  isEdit: boolean;
  editTask: Task;
  setEditTask: Dispatch<SetStateAction<Task>>;
}
export default function TaskEditInfo({ isEdit, editTask, setEditTask }: Props) {
  const dateData: SelectMenu[] = [
    { value: '날짜', label: '날짜' },
    {
      value: '최신순',
      label: '최신순',
    },
  ];

  const userprofile = '';

  const menuList = useRecoilValue(menuListData);
  const menuNameList: SelectMenu[] = menuList.map((menuItem) => ({
    value: menuItem.id.toString(),
    label: menuItem.name,
  }));

  const member = useRecoilValue(productMemberList);
  const memberList: SelectMenu[] = member.map((memberItem) => ({
    value: memberItem.id.toString(),
    label: `${memberItem.nickName}(${memberItem.name})`,
  }));

  // 시작 날짜 입력 값
  const onChangeStartTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...editTask,
      startTime: dateString,
    };

    setEditTask(updatedTask);
  };

  // 종료 날짜 입력 값
  const onChangeEndTime: DatePickerProps['onChange'] = (date, dateString) => {
    const updatedTask = {
      ...editTask,
      endTime: dateString,
    };

    setEditTask(updatedTask);
  };

  const handleChange = (type: string) => (value: { value: string; label: React.ReactNode }) => {
    // menuId
    if (type === 'menuId') {
      const updatedTask = {
        ...editTask,
        [type]: +value.value,
      };
      setEditTask(updatedTask);
      return;
    }

    // targetMember
    if (type === 'targetMember') {
      const nameValue = value.label as string;
      const splitStrings = nameValue.split('(');

      const nickName = splitStrings[0];
      const name = splitStrings[1].replace(')', '');

      const updatedTask = {
        ...editTask,
        [type]: {
          id: +value.value,
          image: '',
          name: name,
          nickname: nickName,
        },
      };

      setEditTask(updatedTask);
    }
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
        {isEdit}
        {isEdit ? (
          <DatePicker
            defaultValue={dayjs(editTask.startTime, 'YYYY.MM.DD')}
            onChange={onChangeStartTime}
            placement={'bottomLeft'}
            bordered={false}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>{editTask.startTime}</span>
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
            defaultValue={dayjs(editTask.endTime, 'YYYY.MM.DD')}
            onChange={onChangeEndTime}
            placement={'bottomLeft'}
            bordered={false}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>{editTask.endTime}</span>
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
            defaultValue={{ value: '-1', label: '메뉴 선택' }}
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
          <span className={'ml-3 text-gray-dark'}>{editTask.menuName}</span>
        )}
      </div>

      {/*그룹*/}
      <div
        className={'flex items-center justify-start w-[17rem] h-1/5 text-gray-light text-[1rem]'}
      >
        <div className={'flex w-[6rem] items-center justify-end h-auto'}>
          <span>그룹</span>
          <div className={'ml-3 h-4 border-solid border-r border-[0.2px] border-gray-border'} />
        </div>
        {isEdit ? (
          <Select
            labelInValue
            defaultValue={dateData[0]}
            onChange={handleChange('projectTeam')}
            style={{ width: 120 }}
            bordered={false}
            options={dateData}
            dropdownStyle={{
              backgroundColor: 'var(--gray-sideBar)',
              color: 'var(--black)',
              borderColor: 'var(--border-line)',
            }}
          />
        ) : (
          <span className={'ml-3 text-gray-dark'}>{editTask.projectTeamName}</span>
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
        {userprofile === '' ? (
          <FaUserCircle className={'ml-3 text-[2rem] fill-gray-dark'} />
        ) : (
          <img src={userprofile} className={'ml-3 w-[2rem] h-[2rem] rounded-full'} />
        )}

        {isEdit ? (
          <Select
            labelInValue
            defaultValue={{
              value: '-1',
              label: `${editTask.targetMember.nickname}(${editTask.targetMember.name})`,
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
          <span
            className={'ml-2 text-gray-dark'}
          >{`${editTask.targetMember.nickname}(${editTask.targetMember.name})`}</span>
        )}
      </div>
    </section>
  );
}
