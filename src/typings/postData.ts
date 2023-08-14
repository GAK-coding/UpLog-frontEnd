import { targetMemberInfo } from '@/typings/member.ts';

export interface PostData {
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
  tagList?: string[];
  likeCount: number;
  commentCount: number;
}

export interface Posts {
  noticePost?: PostData;
  posts: PostData[];
}

export interface PostBody extends Pick<PostData, 'title' | 'content' | 'menuId' | 'postType'> {
  productId: number;
  projectId: number;
}

export interface FailPost {
  httpStatus: string;
  message: string;
}

export interface MenuPosts {}
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
