export interface Task {
  id: number;
  name: string;
  status: string;
  group: string;
  menu: string;
  targetMember: string;
}

export interface SubGroup {
  [key: string]: string[];
}
