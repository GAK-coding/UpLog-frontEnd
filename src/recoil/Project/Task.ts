import { GroupMember, MenuInfo, Task, Tasks } from '@/typings/project.ts';
import { atom } from 'recoil';

export const eachTask = atom<Task>({
  key: 'eachTask',
  default: {
    id: -1,
    dragId: '1',
    taskName: '',
    targetMember: {
      id: -1,
      name: '',
      nickname: '',
      image: '',
    },
    menuId: -1,
    menuName: '',
    projectId: -1,
    projectTeamName: '',
    projectTeamParentId: null,
    taskStatus: 'PROGRESS_BEFORE',
    taskDetail: '',
    startTime: '',
    endTime: '',
  },
});

export const taskAll = atom<Task[]>({
  key: 'taskAll',
  default: [
    {
      id: 0,
      dragId: '0',
      taskName: 'task1',
      targetMember: {
        id: 1,
        name: '오채영',
        nickname: 'OCI',
        image: '',
      },
      menuId: 1,
      menuName: '요구사항',
      projectId: 1,
      projectTeamName: '개발팀',
      projectTeamParentId: null,
      taskStatus: 'PROGRESS_BEFORE',
      taskDetail: 'task1 입니다롱',
      startTime: '2023-08-01',
      endTime: '2023-08-04',
    },
    {
      id: 1,
      dragId: '1',
      taskName: 'task2',
      targetMember: {
        id: 1,
        name: '오채영',
        nickname: 'OCI',
        image: '',
      },
      menuId: 1,
      menuName: '요구사항',
      projectId: 1,
      projectTeamName: '프론트엔드',
      projectTeamParentId: 1,
      taskStatus: 'PROGRESS_IN',
      taskDetail: 'task2 입니다롱',
      startTime: '2023-08-03',
      endTime: '2023-08-10',
    },
    {
      id: 3,
      dragId: '3',
      taskName: 'task3',
      targetMember: {
        id: 1,
        name: '오채영',
        nickname: 'OCI',
        image: '',
      },
      menuId: 2,
      menuName: '개발',
      projectId: 1,
      projectTeamName: '개발팀',
      projectTeamParentId: null,
      taskStatus: 'PROGRESS_COMPLETE',
      taskDetail: 'task3 입니다롱',
      startTime: '2023-08-01',
      endTime: '2023-08-15',
    },
  ],
});

export const taskState = atom<Tasks>({
  key: 'task',
  default: {
    PROGRESS_BEFORE: [
      {
        id: 0,
        dragId: '0',
        taskName: 'task1',
        targetMember: {
          id: 1,
          name: '오채영',
          nickname: 'OCI',
          image: '',
        },
        menuId: 1,
        menuName: '요구사항',
        projectId: 1,
        projectTeamName: '개발팀',
        projectTeamParentId: null,
        taskStatus: 'PROGRESS_BEFORE',
        taskDetail: 'task1 입니다롱',
        startTime: '2023-08-01',
        endTime: '2023-08-04',
      },
    ],
    PROGRESS_IN: [
      {
        id: 1,
        dragId: '1',
        taskName: 'task2',
        targetMember: {
          id: 1,
          name: '오채영',
          nickname: 'OCI',
          image: '',
        },
        menuId: 1,
        menuName: '요구사항',
        projectId: 1,
        projectTeamName: '프론트엔드',
        projectTeamParentId: 1,
        taskStatus: 'PROGRESS_IN',
        taskDetail: 'task2 입니다롱',
        startTime: '2023-08-03',
        endTime: '2023-08-10',
      },
    ],
    PROGRESS_COMPLETE: [
      {
        id: 3,
        dragId: '3',
        taskName: 'task3',
        targetMember: {
          id: 1,
          name: '오채영',
          nickname: 'OCI',
          image: '',
        },
        menuId: 2,
        menuName: '개발',
        projectId: 1,
        projectTeamName: '개발팀',
        projectTeamParentId: null,
        taskStatus: 'PROGRESS_COMPLETE',
        taskDetail: 'task3 입니다롱',
        startTime: '2023-08-01',
        endTime: '2023-08-15',
      },
    ],
  },
});

export const menuListData = atom<MenuInfo[]>({
  key: 'menuList',
  default: [
    { id: 1, name: '결과물' },
    { id: 2, name: '요구사항' },
    { id: 3, name: '개발' },
    { id: 4, name: '배포' },
    { id: 5, name: '개발2' },
    { id: 6, name: '배포2' },
  ],
});

// 그룹 멤버 리스트
export const groupMemberList = atom<GroupMember[][]>({
  key: 'groupMemberList',
  default: [
    [
      {
        position: 'master',
        profile: null,
        nickName: 'Crong',
        name: '권오현',
        email: 'qhslsl@gmail.com',
        group: 'Frontend',
      },
      {
        position: 'leader',
        profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
        nickName: 'OCI',
        name: '오채영',
        email: '1234@gmail.com',
        group: 'Frontend',
      },
    ],
    [
      {
        position: 'leader',
        profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
        nickName: 'Argo',
        name: '박은령',
        email: 'q123124@gmail.com',
        group: 'Backend',
      },
      {
        position: 'member',
        profile:
          'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
        nickName: '젠킨스',
        name: '장준',
        email: '123124@gmail.com',
        group: 'Backend',
      },
      {
        position: 'member',
        profile:
          'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
        nickName: '나무늘보',
        name: '김윤정',
        email: 'fasfs@gmail.com',
        group: 'Backend',
      },
    ],
    [
      {
        position: 'member',
        profile: null,
        nickName: '2426',
        name: '빈지노',
        email: '2426@gmail.com',
        group: null,
      },
      {
        position: 'member',
        profile:
          'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
        nickName: '개리',
        name: '강개리',
        email: 'rissang@gmail.com',
        group: null,
      },
    ],
  ],
});
