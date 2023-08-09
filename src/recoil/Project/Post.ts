import { atom } from 'recoil';
import { Posts } from '@/typings/project.ts';

export const postMain = atom({
  key: 'postMain',
  default: true,
});

export const postTagList = atom<string[]>({ key: 'postTagList', default: [] });

export const eachMenuPost = atom<Posts>({
  key: 'eachMenuPost',
  default: {
    noticePost: {
      id: 0,
      title: 'string',
      authorInfoDTO: {
        id: 0,
        name: 'string',
        nickname: 'string',
        image: 'string',
      },
      menuId: 0,
      menuName: 'string',
      productName: 'string',
      projectName: 'string',
      postType: 'DEFAULT',
      content: 'string',
      createTime: 'dateTime',
      tagList: [],
      likeCount: 2,
      commentCount: 5,
    },
    posts: [
      {
        id: 0,
        title: 'string',
        authorInfoDTO: {
          id: 0,
          name: 'string',
          nickname: 'string',
          image: '/images/test_userprofile.png',
        },
        menuId: 0,
        menuName: 'string',
        productName: 'string',
        projectName: 'string',
        postType: null,
        content: '안녕엉ㅇ안년ㅇ항ㄴ연ㅇ앎ㄴㅇㄴㅇ힌ㅇ힌ㅇㄹn',
        createTime: '2023-08-09T01:09:41.985Z',
        tagList: ['1', '2', '3'],
        likeCount: 4,
        commentCount: 10,
      },
      {
        id: 1,
        title: 'string',
        authorInfoDTO: {
          id: 0,
          name: 'string',
          nickname: 'string',
          image: '',
        },
        menuId: 0,
        menuName: 'string',
        productName: 'string',
        projectName: 'string',
        postType: 'DEFAULT',
        content: 'string',
        createTime: '2023-08-09T01:09:41.985Z',
        tagList: ['123123', '1231231231'],
        likeCount: 0,
        commentCount: 0,
      },
    ],
  },
});
