import { targetMemberInfo } from '@/typings/member.ts';

export type PostType = 'DEFAULT' | 'REQUEST_READ' | 'REQUEST_REQUIREMENT' | null;
export interface Post {
  id: number;
  title: string;
  authorInfoDTO: targetMemberInfo;
  menuId: number;
  menuName: string;
  productName: string;
  projectName: string;
  postType: PostType;
  content: string;
  createTime: string;
  tagList?: string[];
  likeCount: number;
  commentCount: number;
}

export interface Posts {
  noticePost?: Post;
  posts: Post[];
}

export interface PostBody extends Pick<Post, 'title' | 'content' | 'menuId' | 'postType'> {
  productId: number;
  projectId: number;
}

export interface FailPost {
  httpStatus: string;
  message: string;
}

export interface UpdatePostBody {
  updatePostTitle: string | null;
  updatePostContent: string | null;
  updatePostType: PostType | null;
  updateMenuId: number | null;
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

export interface NoticeMenu {
  id: number;
  menuName: string;
  projectId: number;
  version: string;
}

export interface PostLike {
  id: number;
  memberNickname: string;
  cnt: number;
}

export interface PostLikeList {
  id: number;
  postTitle: string;
}
