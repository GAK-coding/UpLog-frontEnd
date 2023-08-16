import { GroupMember } from '@/typings/project.ts';
import { atom } from 'recoil';
import { StatusTaskData, TaskData, UpdateTaskBody } from '@/typings/task.ts';

export const editTaskInfo = atom<UpdateTaskBody>({
  key: 'editTaskInfo',
  default: {
    updateTaskName: null,
    updateTargetMemberId: null,
    updateMenuId: null,
    updateTeamId: null,
    updateTeamName: null,
    updateTaskStatus: null,
    updateTaskDetail: null,
    updateStartTime: null,
    updateEndTime: null,
  },
});

export const eachTaskInfo = atom<TaskData>({
  key: 'eachTask',
  default: {
    id: 0,
    taskName: '',
    targetMemberInfoDTO: {
      id: 0,
      name: '',
      nickname: '',
      image: '',
    },
    menuId: 0,
    menuName: '',
    teamId: 0,
    teamName: '',
    parentTeamId: null,
    taskStatus: 'PROGRESS_BEFORE',
    taskDetail: '',
    startTime: '',
    endTime: '',
    taskIndex: 0,
  },
});

export const taskAll = atom<TaskData[]>({
  key: 'taskAll',
  default: [],
});

// export const taskAll = atom<TaskData[]>({
//   key: 'taskAll',
//   default: [
//     {
//       id: 0,
//       taskName: 'task1',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 1,
//       menuName: '요구사항',
//       projectTeamId: 1,
//       projectTeamName: '개발팀',
//       projectTeamParentId: null,
//       taskStatus: 'PROGRESS_BEFORE',
//       taskDetail: 'task1 입니다롱',
//       startTime: '2023-08-01',
//       endTime: '2023-08-04',
//     },
//     {
//       id: 1,
//       taskName: 'task2',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 1,
//       menuName: '요구사항',
//       projectTeamId: 1,
//       projectTeamName: '프론트엔드',
//       projectTeamParentId: 1,
//       taskStatus: 'PROGRESS_IN',
//       taskDetail: 'task2 입니다롱',
//       startTime: '2023-08-03',
//       endTime: '2023-08-10',
//     },
//     {
//       id: 1,
//       taskName: 'task2',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 1,
//       menuName: '요구사항',
//       projectTeamId: 1,
//       projectTeamName: '프론트엔드',
//       projectTeamParentId: 1,
//       taskStatus: 'PROGRESS_IN',
//       taskDetail: 'task2 입니다롱',
//       startTime: '2023-08-03',
//       endTime: '2023-08-10',
//     },
//     {
//       id: 1,
//       taskName: 'task2',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 1,
//       menuName: '요구사항',
//       projectTeamId: 1,
//       projectTeamName: '프론트엔드',
//       projectTeamParentId: 1,
//       taskStatus: 'PROGRESS_IN',
//       taskDetail: 'task2 입니다롱',
//       startTime: '2023-08-03',
//       endTime: '2023-08-10',
//     },
//     {
//       id: 1,
//       taskName: 'task2',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 1,
//       menuName: '요구사항',
//       projectTeamId: 1,
//       projectTeamName: '프론트엔드',
//       projectTeamParentId: 1,
//       taskStatus: 'PROGRESS_IN',
//       taskDetail: 'task2 입니다롱',
//       startTime: '2023-08-03',
//       endTime: '2023-08-10',
//     },
//     {
//       id: 1,
//       taskName: 'task2',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 1,
//       menuName: '요구사항',
//       projectTeamId: 1,
//       projectTeamName: '프론트엔드',
//       projectTeamParentId: 1,
//       taskStatus: 'PROGRESS_IN',
//       taskDetail: 'task2 입니다롱',
//       startTime: '2023-08-03',
//       endTime: '2023-08-10',
//     },
//     {
//       id: 3,
//       taskName: 'task3',
//       targetMember: {
//         id: 1,
//         name: '오채영',
//         nickname: 'OCI',
//         image: '',
//       },
//       menuId: 2,
//       menuName: '개발',
//       projectTeamId: 1,
//       projectTeamName: '개발팀',
//       projectTeamParentId: null,
//       taskStatus: 'PROGRESS_COMPLETE',
//       taskDetail: 'task3 입니다롱',
//       startTime: '2023-08-01',
//       endTime: '2023-08-15',
//     },
//   ],
// });

export const taskState = atom<StatusTaskData>({
  key: 'allByStatusTask',
  default: {
    PROGRESS_BEFORE: [],
    PROGRESS_IN: [],
    PROGRESS_COMPLETE: [],
  },
});
// export const taskState = atom<Tasks>({
//   key: 'task',
//   default: {
//     PROGRESS_BEFORE: [
//       {
//         id: 0,
//         dragId: '0',
//         taskName: 'task1',
//         targetMemberInfoDTO: {
//           id: 1,
//           name: '오채영',
//           nickname: 'OCI',
//           image: '',
//         },
//         menuId: 1,
//         menuName: '요구사항',
//         teamId: 1,
//         teamName: '개발팀',
//         parentTeamId: null,
//         taskStatus: 'PROGRESS_BEFORE',
//         taskDetail: 'task1 입니다롱',
//         startTime: '2023-08-01',
//         endTime: '2023-08-04',
//       },
//     ],
//     PROGRESS_IN: [
//       {
//         id: 1,
//         dragId: '1',
//         taskName: 'task2',
//         targetMemberInfoDTO: {
//           id: 1,
//           name: '오채영',
//           nickname: 'OCI',
//           image: '',
//         },
//         menuId: 1,
//         menuName: '요구사항',
//         teamId: 1,
//         teamName: '프론트엔드',
//         parentTeamId: 1,
//         taskStatus: 'PROGRESS_IN',
//         taskDetail: 'task2 입니다롱',
//         startTime: '2023-08-03',
//         endTime: '2023-08-10',
//       },
//     ],
//     PROGRESS_COMPLETE: [
//       {
//         id: 3,
//         dragId: '3',
//         taskName: 'task3',
//         targetMemberInfoDTO: {
//           id: 1,
//           name: '오채영',
//           nickname: 'OCI',
//           image: '',
//         },
//         menuId: 2,
//         menuName: '개발',
//         teamId: 1,
//         teamName: '개발팀',
//         parentTeamId: null,
//         taskStatus: 'PROGRESS_COMPLETE',
//         taskDetail: 'task3 입니다롱',
//         startTime: '2023-08-01',
//         endTime: '2023-08-15',
//       },
//     ],
//   },
// });

// 그룹 멤버 리스트
// export const groupMemberList = atom<GroupMember[][]>({
//   key: 'groupMemberList',
//   default: [
//     [
//       {
//         position: 'master',
//         profile: null,
//         nickName: 'Crong',
//         name: '권오현',
//         email: 'qhslsl@gmail.com',
//         group: 'Frontend',
//       },
//       {
//         position: 'leader',
//         profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
//         nickName: 'OCI',
//         name: '오채영',
//         email: '1234@gmail.com',
//         group: 'Frontend',
//       },
//     ],
//     [
//       {
//         position: 'leader',
//         profile: 'https://tech.cloudmt.co.kr/2023/02/27/juunini-why-argo/images/argo.webp',
//         nickName: 'Argo',
//         name: '박은령',
//         email: 'q123124@gmail.com',
//         group: 'Backend',
//       },
//       {
//         position: 'member',
//         profile:
//           'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
//         nickName: '젠킨스',
//         name: '장준',
//         email: '123124@gmail.com',
//         group: 'Backend',
//       },
//       {
//         position: 'member',
//         profile:
//           'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
//         nickName: '나무늘보',
//         name: '김윤정',
//         email: 'fasfs@gmail.com',
//         group: 'Backend',
//       },
//     ],
//     [
//       {
//         position: 'member',
//         profile: null,
//         nickName: '2426',
//         name: '빈지노',
//         email: '2426@gmail.com',
//         group: null,
//       },
//       {
//         position: 'member',
//         profile:
//           'https://w7.pngwing.com/pngs/276/1019/png-transparent-sid-sloth-scrat-ice-age-the-sloth-buckle-free-thumbnail.png',
//         nickName: '개리',
//         name: '강개리',
//         email: 'rissang@gmail.com',
//         group: null,
//       },
//     ],
//   ],
// });
