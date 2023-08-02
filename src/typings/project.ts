export interface Task {
  id: number;
  dragId: string;
  name: string;
  status: string;
  group_id: number;
  group: string;
  p_id: number | null;
  menu: string;
  targetMember: string;
}

export interface SubGroup {
  [key: string]: string[];
}
