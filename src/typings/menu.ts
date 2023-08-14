export interface MenuInfo {
  id: number;
  menuName: string;
  projectId: number;
  version: string;
}

export interface FailMenu {
  httpStatus: string;
  message: string;
}
export interface SelectMenu {
  value: string;
  label: string;
}
