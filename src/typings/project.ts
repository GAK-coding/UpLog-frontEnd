import { targetMemberInfo } from '@/typings/member.ts';

export type TaskStatus = 'PROGRESS_BEFORE' | 'PROGRESS_IN' | 'PROGRESS_COMPLETE';

export interface Task {
  id: number;
  dragId: string;
  taskName: string;
  targetMember: targetMemberInfo;
  menuId: number;
  menuName: string;
  projectId: number;
  projectTeamName: string;
  projectTeamParentId: number | null;
  taskStatus: TaskStatus;
  taskDetail: string;
  startTime: string;
  endTime: string;
}

export interface Tasks {
  [key: string]: Task[];
}

export interface SubGroup {
  [key: string]: string[];
}

export interface MenuInfo {
  id: number;
  name: string;
}

export interface SelectMenu {
  value: string;
  label: string;
}

export interface GroupMember {
  position: 'master' | 'leader' | 'member';
  profile: string | null;
  nickName: string;
  name: string;
  email: string;
  group: string | null;
}

export interface GroupInfo {
  id: number;
  name: string;
}

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
  createTime: Date;
  tagList: string[];
  likeCount: number;
  commentCount: number;
}

export interface Posts {
  [key: string]: Post[] | Post;
}
