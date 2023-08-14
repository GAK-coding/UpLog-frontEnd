import { targetMemberInfo } from '@/typings/member.ts';
import { MenuInfo } from '@/typings/menu.ts';

export type TaskStatus = 'PROGRESS_BEFORE' | 'PROGRESS_IN' | 'PROGRESS_COMPLETE';

export interface TaskData {
  id: number;
  taskName: string;
  targetMemberInfoDTO: targetMemberInfo;
  menuId: number;
  menuName: string;
  teamId: number;
  teamName: string;
  parentTeamId: number | null;
  taskStatus: TaskStatus;
  taskDetail: string;
  startTime: string;
  endTime: string;
}

export interface StatusTaskData {
  PROGRESS_BEFORE: TaskData[];
  PROGRESS_IN: TaskData[];
  PROGRESS_COMPLETE: TaskData[];
}

export interface TaskBody {
  taskName: string;
  menuId: number;
  teamId: number;
  taskDetail: string;
  targetMemberId: number;
  startTime: string;
  endTime: string;
}

export interface FailTask {
  httpStatus: string;
  message: string;
}

export interface UpdateTaskBody {
  updateTaskName: string | null;
  updateTargetMemberId: number | null;
  updateMenuId: number | null;
  updateTeamId: number | null;
  updateTeamName: string | null;
  updateTaskStatus: TaskStatus | null;
  updateStartTime: string | null;
  updateEndTime: string | null;
}

export interface MenuTasks {
  menuInfo: MenuInfo;
  tasks: TaskData[];
}
