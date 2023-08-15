import { atom } from 'recoil';
import { GroupMember, Release } from '@/typings/project.ts';

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

// 프로젝트들
export const eachProductProjects = atom<Release[]>({ key: 'eachProductProjects', default: [] });
