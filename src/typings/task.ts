import { targetMemberInfo } from '@/typings/member.ts';
import { MenuInfo } from '@/typings/menu.ts';

export type TaskStatus = 'PROGRESS_BEFORE' | 'PROGRESS_IN' | 'PROGRESS_COMPLETE';

export interface Task {
  id: number;
  dragId: string;
  taskName: string;
  targetMember: targetMemberInfo;
  menuId: number;
  menuName: string;
  projectTeamId: number | string;
  projectTeamName: string;
  projectTeamParentId: number | null;
  taskStatus: TaskStatus;
  taskDetail: string;
  startTime: string;
  endTime: string;
}

export interface TaskData extends Omit<Task, 'dragId'> {}

export interface StatusTaskData {
  PROGRESS_BEFORE: TaskData[];
  PROGRESS_IN: TaskData[];
  PROGRESS_COMPLETE: TaskData[];
}

export interface MenuTasks {
  menuInfo: MenuInfo;
  tasks: Task[];
}

export interface Tasks {
  PROGRESS_BEFORE: Task[];
  PROGRESS_IN: Task[];
  PROGRESS_COMPLETE: Task[];
}

export interface TaskBody {
  taskName: string;
  menuId: number;
  projectTeamId: number | string;
  taskDetail: string;
  startTime: string;
  endTime: string;
  targetMemberId: number;
}

export interface FailTask {
  httpStatus: string;
  message: string;
}
