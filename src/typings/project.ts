export type TaskStatus = 'before' | 'going' | 'done';

export interface Task {
  id: number;
  dragId: string;
  name: string;
  status: TaskStatus;
  group_id: number;
  group: string;
  p_id: number | null;
  menu: string;
  targetMember: string;
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
