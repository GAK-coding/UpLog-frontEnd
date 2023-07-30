export interface ProjectGroupFilter {
  value: string;
  label: string;
}

export interface Task {
  id: number;
  name: string;
  status: string;
  group: string;
  menu: string;
  targetMember: string;
}
