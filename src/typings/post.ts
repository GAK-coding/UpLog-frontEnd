import { targetMemberInfo } from '@/typings/member.ts';

export interface Post {
  id: number;
  title: string;
  authorInfoDTO: targetMemberInfo;
  menuId: number;
  menuName: string;
  productName: string;
  projectName: string;
  postType: string | null;
  content: string;
  createTime: string;
  tagList: string[];
  likeCount: number;
  commentCount: number;
}

export interface Posts {
  noticePost: Post;
  posts: Post[];
}

export interface CommentInfo {
  id: number;
  parentId: number | null;
  content: string;
  createTime: string;
  memberId: number;
  name: string;
  nickname: string;
  image: string;
}
