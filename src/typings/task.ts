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

export interface TaskData extends Omit<Task, 'dragId'> {}

export interface Tasks {
  [key: string]: Task[];
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
