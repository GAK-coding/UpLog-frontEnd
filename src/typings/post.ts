import { targetMemberInfo } from '@/typings/member.ts';
import { TaskPaging } from '@/typings/task.ts';

export type PostType = 'DEFAULT' | 'REQUEST_READ' | 'REQUEST_REQUIREMENT' | null;
export interface Post {
  id: number;
  title: string;
  authorInfoDTO: targetMemberInfo;
  menuId: number;
  menuName: string;
  postType: PostType;
  content: string;
  createTime: string;
  postTags: { id: number; content: string }[];
  likeCount: number;
  commentCount: number;
}

export interface Posts {
  noticePost?: Post;
  posts: Post[];
}

export interface PostBody extends Pick<Post, 'title' | 'content' | 'menuId' | 'postType'> {
  tagContents: string[];
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

export interface PostPaging extends Omit<TaskPaging, 'pagingTaskData'> {
  noticePost?: Post;
  posts: Post[];
}

export interface CommentInfo {
  id: number;
  memberId: number;
  parentId: number | null;
  content: string;
  name: string;
  nickName: string;
  image?: string;
  createTime: string;
}

export interface NoticeMenu {
  id: number;
  menuName: string;
  noticePostId: number;
}

export interface LikeInfo {
  id: number;
  cnt: number;
}

export interface PostLikeList {
  id: number;
  postTitle: string;
}

export interface CommentLikeList {
  id: number;
  content: string;
}

export interface CommentBody {
  parentId: number | null;
  content: string;
}
